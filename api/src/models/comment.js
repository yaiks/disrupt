import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
	text: {
		type: String
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product"
	}
});

export default commentSchema;
