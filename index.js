require("dotenv").config();
// feature/command imports
import bored from "./features/bored";
import startRace from "./features/codeRace";
import dad from "./features/dad";
import help from "./features/help";
import schedule from "./features/schedule";
import decide from "./features/decide";
import checkForTriggers from "./features/checkForTriggers";

// discord.js boilerplate
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";

client.once("ready", () => {
	console.log("Sir Wellington is at your service ;)");
});

let raceStarted = false;
let raceText = null;
client.on("message", (message) => {
	if (message.author.bot) return;
	// outlier checks
	checkForTriggers(message);

	// race checks
	if (
		raceStarted &&
		message.content !== "!race" &&
		message.content !== "!end"
	) {
		if (message.content === raceText) {
			message.reply(`Congratulations, you have won.`);
			raceText = null;
			raceStarted = false;
		} else {
			message.reply(
				`I'm sorry, that doesn't match the text exactly. Please try again.`
			);
		}
	}

	// begin regular commands
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	switch (command) {
		case "commands":
		case "help":
			help(message);
			break;
		case "decide":
			decide(message, args);
			break;
		case "schedule":
			schedule(message);
			break;
		case "dad":
			dad(message);
			break;
		case "bored":
			bored(message);
			break;
	}

	if (command === "end" && raceStarted) {
		raceStarted = false;
		message.channel.send("Understood. Terminating your race promptly.");
	}

	// checks for trying to start a race while there is an ongoing race
	if (command === "race" && !raceStarted) {
		raceText = startRace(message);
		raceStarted = true;
	} else if (raceStarted) {
		message.channel.send(
			`You already have an ongoing race. The text is ${raceText}`
		);
	}
});

client.login(process.env.TOKEN);
