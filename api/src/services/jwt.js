import "dotenv/config";
import jwt from "jsonwebtoken";

export async function generateJWT(userJWT) {
	// const today = new Date();
	// const expirationDate = new Date();
	// expirationDate.setDate(today.getDate() + 60);
	return await jwt.sign(userJWT, process.env.SECRET, {
		expiresIn: 86400 * 30
	});
}

// Create function to decode the JWT and pass to the resolvers, validate in each request.
