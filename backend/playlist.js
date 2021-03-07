const Discord = require("discord.js");

import { Link } from "./models/Link";

export function addLink(message, command, args) {
	// add link model to database if it doesn't match any others
	// console.log(args);
	if (args.length < 2) {
		message.channel.send("Wrong syntax. Usage: !add {song/playlist} {link}");
		return;
	}
	Link.findOne({ text: args[1] }).exec(function (err, link) {
		if (link) {
			message.channel.send("You already added that link, asshole");
			return;
		} else {
			const newLink = new Link({
				text: args[1].toLowerCase(),
				type: args[0].toLowerCase(),
			});

			newLink.save((err) => {
				if (err) {
					console.log(err);
				}
				message.channel.send(`I have added the ${args[0].toLowerCase()}`);
			});
		}
	});
}

export function deleteLink(message, command, args) {
	// remove matching link document from collection

	Link.findOneAndDelete({ text: args[0] }, function (err, link) {
		if (link) {
			message.channel.send("I have removed that link.");
		} else {
			message.channel.send("I am unable to find that link the the playlist");
		}
	});
}

export function getPlaylist(message, command, amount) {
	// if amount is 0 then get entire playlist and return it
	// if there are 2 args then n amount of links from song/playlist

	Link.find({}, (err, playlist) => {
		let songs = [];
		let playlists = [];

		for (let link of playlist) {
			console.log("link");
			if (link.text) {
				if (link.type == "playlist") {
					playlists.push(link.text);
				}
				if (link.type == "song") {
					songs.push(link.text);
				}
			}
		}

		if (amount.length == 0) {
			const newEmbed = new Discord.MessageEmbed()
				.setColor("#ffffff")
				.setTitle("Playlist")
				.setDescription("Communism Playlist")
				.addFields(
					{ name: "Songs", value: songs },
					{ name: "Playlists", value: playlists }
				);

			message.channel.send(newEmbed);
		} else if (amount.length == 2) {
			let customPlaylist = [];
			let amountToFind;
			let typeArr;
			if (amount[1].toLowerCase().includes("song")) {
				typeArr = songs;
			} else if (amount[1].toLowerCase().includes("playlist")) {
				typeArr = playlists;
			} else {
				message.channel.send("Unrecognized command");
			}

			if (amount[0] > typeArr.length) {
				amountToFind = typeArr.length;
			} else {
				amountToFind = amount[0];
			}

			for (let i = 0; i < amountToFind; i++) {
				let linkIndex = Math.floor(Math.random() * typeArr.length);
				let randomLink = typeArr[linkIndex];
				typeArr.splice(linkIndex, 1);
				customPlaylist.push(randomLink).text;
			}

			const newEmbed = new Discord.MessageEmbed()
				.setColor("#ffffff")
				.setTitle("Your playlist")
				.addFields({ name: "Link(s)", value: customPlaylist });

			message.channel.send(newEmbed);
		} else {
			message.channel.send("Usage: !playlist {amount of links} {type of link}");
		}
	});
}
