import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isProductOwner } from "./authorization";

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
		createProduct: combineResolvers(
			isAuthenticated,
			async (parent, { product }, { me, models }) => {
				const newProduct = {
					userId: me.id,
					...product
				};

				return await models.Product.create(newProduct);
			}
		),
		deleteProduct: combineResolvers(
			isAuthenticated,
			isProductOwner,
			async (parent, { productId }, { models }) => {
				await models.Product.findOneAndRemove({ _id: productId });
				return true;
			}
		),
		updateProduct: combineResolvers(
			isAuthenticated,
			isProductOwner,
			async (parent, { productId, product }, { models }) => {
				return await models.Product.findOneAndUpdate(
					{ _id: productId },
					product,
					{
						new: true
					}
				);
			}
		)
	},

	Product: {
		user: async (parent, args, { models }) => {
			return await models.User.findById({ _id: parent.userId });
		},
		comments: async (parent, args, { models }) => {
			return await models.Comment.find({
				_id: { $in: parent.comments }
			});
		}
	}
};
