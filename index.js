import bored from "./features/bored";
import startRace from "./features/codeRace";
import dad from "./features/dad";
import help from "./features/help";
import schedule from "./features/schedule";
import think from "./features/think";
import decide from "./features/decide";

require("dotenv").config();
const request = require("request");
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
	if (
		message.content.includes("lol") ||
		message.content.includes("lmao") ||
		message.content.includes("haha")
	) {
		if (Math.floor(Math.random() * 10000) > 8900) {
			message.reply("That isn't funny");
		}
	}

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

	if (
		message.content.toLowerCase().includes("thinking") ||
		message.content.toLowerCase().includes("thoughts") ||
		(message.content.toLowerCase().includes("think") &&
			message.content.toLowerCase().includes("sir wellington"))
	) {
		think(message);
	}

	// begin regular commands
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === "commands" || command === "help") {
		help(message);
	}

	if (command === "decide") {
		decide(message, args);
	}

	if (command === "schedule") {
		schedule(message);
	}

	if (command === "dad") {
		dad(message);
	}

	if (command === "bored") {
		bored(message);
	}

	if (command === "end" && raceStarted) {
		raceStarted = false;
		message.channel.send("Understood. Terminating your race promptly.");
	}
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
