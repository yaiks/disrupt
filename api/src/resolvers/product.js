import uuidv4 from "uuid/v4";

export default {
	Query: {
		product: (parent, { id }, { models }) => {
			return models.products[id];
		},
		products: (parent, args, { models }) => {
			return Object.values(models.products);
		}
	},

	Mutation: {
		createProduct: (
			parent,
			{ name, catchline, description },
			{ me, models }
		) => {
			const productId = uuidv4();
			const product = {
				productId,
				name,
				catchline,
				description,
				userId: me.id
			};

			models.products[productId] = product;
			models.users[me.id].productIds.push(productId);

			return product;
		},
		deleteProduct: (parent, { productId }, { models }) => {
			const { [productId]: product, ...otherProducts } = models.products;

			if (!product) return false;

			models.products = otherProducts;
			return true;
		},
		updateProduct: (
			parent,
			{ productId, name, catchline, description },
			{ models }
		) => {
			const { [productId]: product, ...otherProducts } = models.products;

			const newProduct = Object.assign(product, {
				name,
				catchline,
				description
			});

			models.products[productId] = newProduct;
			return newProduct;
		}
	},

	Product: {
		user: (parent, args, { models }) => {
			return models.users[parent.userId];
		},
		comments: (parent, args, { models }) => {
			return Object.values(models.comments).filter(
				comment => comment.productId === parent.productId
			);
		}
	}
};
