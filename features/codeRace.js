import { code_arr, greetings } from "./arrays";

export default function startRace(message) {
	let chosenText = code_arr[Math.floor(Math.random() * code_arr.length)];
	message.channel.send(
		greetings[Math.floor(Math.random() * greetings.length)],
		{
			files: [chosenText.file],
		}
	);
	return chosenText.text;
}
