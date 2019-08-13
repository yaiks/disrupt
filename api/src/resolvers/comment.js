export default {
	Query: {
		text: async (parent, { productId }, { models }) => {
			return models.Comment.findById({ productId });
		}
	},
	Mutation: {
		createComment: async (parent, { productId, text }, { me, models }) => {
			const newComment = {
				userId: me.id,
				productId,
				text
			};

			return models.Comment.create(newComment);
		}
	}
};
