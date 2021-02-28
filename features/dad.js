const request = require("request");

export default function dad(message) {
	console.log(`${message.author} wants a dad joke`);
	request(
		"https://icanhazdadjoke.com/slack",
		{ json: true },
		(err, res, body) => {
			if (err) {
				return console.log(err);
			}
			message.channel.send(body.attachments[0].text);
		}
	);
}
