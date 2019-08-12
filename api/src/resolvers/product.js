import uuidv4 from "uuid/v4";

export default {
	Query: {
		product: async (parent, { id }, { models }) => {
			return await models.Product.findById(id);
		},
		products: async (parent, args, { models }) => {
			return await models.Product.find();
		}
	},

	Mutation: {
		createProduct: async (
			parent,
			{ name, catchline, description },
			{ me, models }
		) => {
			const productId = uuidv4();
			const product = {
				_id: productId,
				name,
				catchline,
				description,
				userId: me.id
			};

			// can I update DB 2x in same resolver?
			await models.User.findByIdAndUpdate(me.id, {
				$push: { productIds: productId }
			});

			return await models.Product.create(product);
		},
		deleteProduct: async (parent, { productId }, { models }) => {
			const { [productId]: product, ...otherProducts } = models.products;

			if (!product) return false;

			await models.Product.findOneAndRemove({ _id: productId });
			return true;
		},
		updateProduct: (
			parent,
			{ productId, name, catchline, description },
			{ models }
		) => {
			const { [productId]: product, ...otherProducts } = models.products;

			const newProduct = Object.assign(product, {
				name,
				catchline,
				description
			});

			models.Product.findOneAndUpdate({ _id: productId }, newProduct, {
				new: true
			});
			return newProduct;
		}
	},

	Product: {
		user: async (parent, args, { models }) => {
			return await models.User.findById({ _id: parent.userId });
		},
		comments: async (parent, args, { models }) => {
			return await models.Comment.find({ productId: parent.productId });
		}
	}
};
