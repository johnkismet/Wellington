export default function bored(message) {
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
