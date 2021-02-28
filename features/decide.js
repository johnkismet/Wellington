import { decisions } from "./arrays";

export default function decide(message, args) {
	if (args.length > 1) {
		let index = Math.floor(Math.random() * args.length);
		let decision = args[index];
		message.channel.send(decision);
	} else {
		let index = Math.floor(Math.random() * decisions.length);
		let decision = decisions[index];
		message.channel.send(decision);
	}
}
