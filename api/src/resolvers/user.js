export default {
	Query: {
		user: (parent, { id }, { models }) => {
			return models.users[id];
		},
		users: (parent, args, { models }) => {
			return Object.values(models.users);
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
