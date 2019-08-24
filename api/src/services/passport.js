import "dotenv/config";
import passport from "passport";
import mongoose from "mongoose";

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = mongoose.model("User");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback"
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				done(null, existingUser);
			} else {
				const user = await User.create({
					googleId: profile.id,
					username: profile.displayName
				});

				done(null, user);
			}
		}
	)
);
