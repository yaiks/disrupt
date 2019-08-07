import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product"
	}
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
