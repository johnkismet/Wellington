1. User types !race
2. Grab an item from code_array, send that item as a message
3. Continue listening to the following messages. The first one that matches the text exactly wins the race.
4. Ask to play again or quit

function chooseText() {
const text_arr = [
{
file: './path/name/here',
text: 'this is the same text in the file'
}
]

    // return random object from text_arr

}
function mainRace() {
let race_text = chooseText()
// send race_text.file to channel
// listen to every message afterwards
// if message === race_text.text then end game and say '{user} wins. play again?'
// timeout after 3 minutes of no correct answers, no one wins

}
