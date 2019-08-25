import { ForbiddenError } from "apollo-server-express";
import { skip } from "graphql-resolvers";

export const isAuthenticated = (parent, args, { me }) =>
	me ? skip : new ForbiddenError("Not authenticated as user");

export const isProductOwner = async (parent, { productId }, { models, me }) => {
	const product = await models.Product.findById(productId);

	if (!product.userId.equals(me.id)) {
		throw new ForbiddenError("Only the product owner can make this action");
	}

	return skip;
};
