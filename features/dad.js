export default function dad(message) {
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