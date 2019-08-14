export default {
	Query: {
		comments: async (parent, args, { models }) => {
			return await models.Comment.find();
		}
	},
	Mutation: {
		createComment: async (parent, { productId, text }, { me, models }) => {
			const newComment = {
				userId: me.id,
				productId,
				text
			};

			return await models.Comment.create(newComment);
		}
	},
	Comment: {
		text: async (parent, args, { models }) => {
			return parent.text;
		}
	}
};
