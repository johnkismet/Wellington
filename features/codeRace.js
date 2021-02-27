// TODO: Import code race function here
export default function mainRace(message) {
	let code_arr = [
		"Hello there",
		"This is a sentence",
		"Type me",
		"blah blah blur",
		"baba booey",
		"badda bing badda boom",
		"Get laid, get paid, gatorade",
	];
	let chosenText = code_arr[Math.floor(Math.random() * code_arr.length)];
	message.channel.send(`Let's race! Here is the text to type: ${chosenText}`);
	return chosenText;
}
