const mongoose = require("mongoose");

import { addLink, deleteLink, getPlaylist } from "./playlist";

let connectedToDB = false;

export default function handle_playlist(message, command, args) {
	if (!connectedToDB) {
		mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const db = mongoose.connection;
		db.on("error", console.error.bind(console, "connection error:"));
		db.once("open", function () {
			// we're connected!
			console.log("Connected to MongoDB");
		});
		connectedToDB = true;
	}
	switch (command) {
		case "add":
			addLink(message, command, args);
			break;
		case "delete":
			deleteLink(message, command, args);
			break;
		case "playlist":
			getPlaylist(message, command, args);
			break;
	}
}
