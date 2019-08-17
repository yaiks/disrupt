export default {
	Query: {
		comments: async (parent, { productId }, { models }) => {
			return await models.Comment.find({ productId });
		}
	},
	Mutation: {
		createComment: async (parent, { productId, text }, { me, models }) => {
			const comment = {
				userId: me._id,
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
	}
};
