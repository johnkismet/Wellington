const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
	text: String,
	type: String,
});
export const Link = mongoose.model("Link", linkSchema);
