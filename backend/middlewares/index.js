const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports.isLoggedIn = (req, res, next) => {
	let token = req.header("Authorization");
	
	if (!token) {
		return res.status(401).json({ success: false, message: "No token, authorization denied." });
	}

	token = token.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	}
	catch (error) {
		console.error(error);
		return res.status(401).json({ success: false, message: "Token is not valid." });
	}
}

