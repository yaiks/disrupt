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
		createProduct: async (parent, { product }, { me, models }) => {
			const newProduct = {
				userId: me._id,
				...product
			};

			return await models.Product.create(newProduct);
		},
		deleteProduct: async (parent, { productId }, { models }) => {
			await models.Product.findOneAndRemove({ _id: productId });
			return true;
		},
		updateProduct: async (parent, { productId, product }, { models }) => {
			return await models.Product.findOneAndUpdate(
				{ _id: productId },
				product,
				{
					new: true
				}
			);
		}
	},

	Product: {
		user: async (parent, args, { models }) => {
			return await models.User.findById({ _id: parent.userId });
		},
		comments: async (parent, args, { models }) => {
			return await models.Product.find(parent._id).populate("comments");
		}
	}
};
