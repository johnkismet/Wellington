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
	if (raceStarted && !message.author.bot && message.content !== "!race") {
		if (message.content === raceText) {
			message.reply("You win!");
			raceText = null;
			raceStarted = false;
		} else {
			message.reply(`Not right!`);
		}
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === "race" && !raceStarted) {
		// message.channel.send("Here's your image", {
		// 	files: ["./assets/race_images/carbon.png"],
		// });
		raceText = mainRace(message);
		raceStarted = true;
	} else if (raceStarted) {
		message.channel.send(
			`A race has already been started. The text is ${raceText}`
		);
	}
});

client.login(process.env.TOKEN);
