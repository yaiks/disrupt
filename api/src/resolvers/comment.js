export default {
	Query: {
		text: async (parent, { productId }, { models }) => {
			return models.Comment.findById({ productId });
		}
	}
};
