// ==============================
// Get a Last.fm feed
// Parse it
// Display to the view with album art, artist name and song title. 
// 
// Author: Jeremy Mouton
// Authored: April 2013

$( function() {
	getSongs();
});	

function getSongs() {
	var last_fm_username = 'halibuthero',
		lastfm_feed = 'http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=' + last_fm_username + '&api_key=5b801a66d1a34e73b6e563afc27ef06b&limit=2&format=json&callback=?';

	$.getJSON(lastfm_feed, function(data) {
		var lastfm   = data.recenttracks.track[0];
		var date     = '';

		// Date formating
		// Returns "now playing" or time ago.
		(typeof lastfm.date != 'undefined') ? date = 'played ' + moment.unix(lastfm.date.uts).fromNow() : date = 'now playing...';

		// Set the album cover 
		var album_cover = lastfm.image[3]['#text'];
		if(album_cover === "") {
			album_cover = 'http://placehold.it/300x300&text=no+cover+found';
		}

		// Send it to the view
		$('#latest_track').html('<img src="' + album_cover + '" alt=""><a target="_blank" href="' + lastfm.url + '">' + lastfm.name + '<br /><span class="artist">' + lastfm.artist['#text'] + '</span> <span class="timeago">' + date + '</span></a>');
	});

	setTimeout(getSongs, 30000);
}
