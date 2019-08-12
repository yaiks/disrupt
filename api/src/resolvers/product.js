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
		createProduct: async (parent, { input }, { me, models }) => {
			const productId = uuidv4();
			const product = {
				id: productId,
				userId: me.id,
				...input
			};

			// can I update DB 2x in same resolver?
			await models.User.findByIdAndUpdate(me.id, {
				$push: { productIds: productId }
			});

			return await models.Product.create(product);
		},
		deleteProduct: async (parent, { productId }, { models }) => {
			await models.Product.findOneAndRemove({ _id: productId });
			return true;
		},
		updateProduct: async (parent, { productId, input }, { models }) => {
			return await models.Product.findOneAndUpdate({ _id: productId }, input, {
				new: true
			});
		}
	},

	Product: {
		user: async (parent, args, { models }) => {
			return await models.User.findById({ _id: parent.userId });
		},
		comments: async (parent, args, { models }) => {
			return await models.Comment.find({ productId: parent._id });
		}
	}
};
