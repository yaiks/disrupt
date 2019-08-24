import passport from "passport";
import { generateJWT } from "../services/jwt";

export default app => {
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

	app.get(
		"/auth/google/callback",
		passport.authenticate("google", {
			session: false
		}),
		async (req, res) => {
			const userJWT = {
				id: req.user._id,
				username: req.user.username
			};

			const token = await generateJWT(userJWT);

			res.send({
				username: req.user.username,
				token
			});
		}
	);
};
