// Copyright (c) 2018 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

var get = require("../get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(result);
		} catch(e) {
			console.log(result);
			return callback(e.message, null, null);
		}

		//console.log(JSON.stringify(parsedResult, null, "\t"));
		const artist = parsedResult["conduttoriList"];
		const title = parsedResult["label"];
		const cover = "http://www.radio24.ilsole24ore.com" + parsedResult["foto"]["fotohome2T2"]["@value"];

		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}