import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	googleId: String
});

userSchema.statics.findByLogin = async function(login) {
	let user = await this.findOne({
		username: login
	});

	return user;
};

userSchema.statics.findOrCreateGoogleUser = async function(profile) {
	const user = await this.findOne({ googleId: profile.id });

	if (!user) {
		const newUser = await User.create({
			googleId: profile.id,
			username: profile.displayName
		});

		return newUser;
	}

	return user;
};

userSchema.pre("remove", function(next) {
	this.model("Product").deleteMany({ userId: this._id }, next);
});

const User = mongoose.model("User", userSchema);

export default User;
