export default function help(message) {
	message.channel.send(
		`
        **!schedule** - Lists our streaming schedule
**!decide [arg1] [arg2] [enter as many (or little) as you want]** - Let Sir Wellington decide something for you
**!race** - Begins a code race
**!end** - Ends a code race
**!dad** - Sends a dad joke
**!bored** - Sir Wellington will suggest an activity
        `
	);
}
