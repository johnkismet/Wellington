require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "!";

client.once("ready", () => {
	console.log("Sir Wellington is at your service ;)");
});

client.on("message", (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === "race") {
		message.channel.send("Here's your image", {
			files: ["./assets/race_images/carbon.png"],
		});
	}
});

client.login(process.env.TOKEN);
