import think from "./think";

export default function checkForTriggers(message) {
	let msg = message.content.toLowerCase();

	if (msg.includes("lol") || msg.includes("lmao") || msg.includes("haha")) {
		if (Math.floor(Math.random() * 10000) > 8900) {
			console.log(`${message.author} triggered something`);
			message.reply("It's not that funny");
		}
	}

	if (
		msg.includes("thinking") ||
		msg.includes("thoughts") ||
		msg.includes("mind") ||
		(msg.includes("think") && msg.includes("sir wellington"))
	) {
		console.log(
			`${message.author} wants to know what Sir Wellington's thinking`
		);
		think(message);
	}

	if (
		msg.includes("ayylmao") ||
		(msg.includes("ayy") && msg.includes("lmao"))
	) {
		console.log(`${message.author} said ayy lmao`);
		message.reply("ayylmao 👽");
	}
}
