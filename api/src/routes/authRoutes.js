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
			console.log("created token", token);
			res.cookie("jwt", token, { httpOnly: true });
			res.redirect(process.env.ORIGIN);
			// res.redirect(`http://localhost:3000?token=${token}`);
		}
	);
};
