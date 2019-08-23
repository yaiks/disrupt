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
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					done(null, existingUser);
				} else {
					new User({
						googleId: profile.id,
						username: profile.displayName
					})
						.save()
						.then(user => done(null, user));
				}
			});
			// User.findOrCreate({ googleId: profile.id }, function(err, user) {
			// 	return cb(err, user);
			// });
		}
	)
);
