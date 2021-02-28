const request = require("request");

export default function bored(message) {
	console.log(`${message.author} is bored`);

	request(
		"http://www.boredapi.com/api/activity/",
		{ json: true },
		(err, res, body) => {
			if (err) {
				return console.log(err);
			}
			message.channel.send(`${body.activity}! ${body.link}`);
		}
	);
}
