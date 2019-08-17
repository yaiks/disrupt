import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	catchline: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

const Product = mongoose.model("Product", productSchema);

export default Product;
