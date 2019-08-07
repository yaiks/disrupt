export default {
	Query: {
		user: async (parent, { id }, { models }) => {
			// when implement passport, use findOne({ googleId or something else: id })
			return await models.User.findById(id);
		},
		users: async (parent, args, { models }) => {
			return await models.User.find();
		}
	},
	User: {
		username: parent => {
			return `${parent.name} ${parent.lastName}`;
		},
		products: (parent, args, { models }) => {
			return Object.values(models.products).filter(
				product => product.userId === parent.id
			);
		}
	}
};
