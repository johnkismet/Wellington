import mainRace from "./features/codeRace";

require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "!";

client.once("ready", () => {
	console.log("Sir Wellington is at your service ;)");
});
let raceStarted = false;
let raceText = null;
client.on("message", (message) => {
	if (
		message.content.includes("lol") ||
		message.content.includes("lmao" || message.content.includes("haha"))
	) {
		if (Math.floor(Math.random() * 10000) > 8900) {
			message.reply("That isn't funny");
		}
	}
	if (
		raceStarted &&
		!message.author.bot &&
		message.content !== "!race" &&
		message.content !== "!end"
	) {
		if (message.content === raceText) {
			message.reply("Wonderful, you win!");
			raceText = null;
			raceStarted = false;
		} else {
			message.reply(
				`I'm sorry, that doesn't match the text exactly. Please try again.`
			);
		}
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	if (command === "end" && raceStarted) {
		raceStarted = false;
		message.channel.send("Understood. Terminating your race promptly.");
	}
	if (command === "race" && !raceStarted) {
		// message.channel.send("Here's your image", {
		// 	files: ["./assets/race_images/carbon.png"],
		// });
		raceText = mainRace(message);
		raceStarted = true;
	} else if (raceStarted) {
		message.channel.send(
			`You already have an ongoing race. The text is ${raceText}`
		);
	}
});

client.login(process.env.TOKEN);
