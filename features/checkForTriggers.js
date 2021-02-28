import think from "./think";

export default function checkForTriggers(message) {
	let msg = message.content.toLowerCase();

	if (msg.includes("lol") || msg.includes("lmao") || msg.includes("haha")) {
		if (Math.floor(Math.random() * 10000) > 8900) {
			message.reply("It's not that funny");
		}
	}

	if (
		msg.includes("thinking") ||
		msg.includes("thoughts") ||
		msg.includes("mind") ||
		(msg.includes("think") && msg.includes("sir wellington"))
	) {
		think(message);
	}

	if (
		msg.includes("ayylmao") ||
		(msg.includes("ayy") && msg.includes("lmao"))
	) {
		message.reply("ayylmao 👽");
	}
}
