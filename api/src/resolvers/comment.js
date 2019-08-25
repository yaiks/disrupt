import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "./authorization";

export default {
	Query: {
		comments: async (parent, { productId }, { models }) => {
			return await models.Comment.find({ productId });
		}
	},
	Mutation: {
		createComment: combineResolvers(
			isAuthenticated,
			async (parent, { productId, text }, { me, models }) => {
				const comment = {
					userId: me.id,
					productId,
					text
				};

				const newComment = await models.Comment.create(comment);
				await models.Product.update(
					{ _id: productId },
					{
						$push: { comments: newComment._id }
					}
				);

				return newComment;
			}
		)
	}
};
