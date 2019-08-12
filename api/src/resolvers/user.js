export default {
	Query: {
		me: async (parent, args, { models, me }) => {
			return await models.User.findById(me.id);
		},
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
			return parent.username;
		},
		products: async (parent, args, { models }) => {
			return await models.Product.find({ userId: parent.id });
		}
	}
};
