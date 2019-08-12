import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	productIds: {
		type: Array,
		ref: "Product"
	}
});

userSchema.statics.findByLogin = async function(login) {
	let user = await this.findOne({
		username: login
	});

	return user;
};

userSchema.pre("remove", function(next) {
	this.model("Product").deleteMany({ userId: this._id }, next);
});

const User = mongoose.model("User", userSchema);

export default User;
