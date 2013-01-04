$(document).ready(function() {
	var pageSize = 20;
	var username = 'newsycombinator';
	var currentPage = 1;
	
	// Appends the new tweet to the UI
	var appendTweet = function(tweet, id) {
		$("<p />").html(tweet).appendTo($("#tweets"));
	};
	
	// Loads the next tweets
	var loadTweets = function() {
		var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name="+username+"&count="+pageSize+"&page="+currentPage+"&callback=?";
				
		$.getJSON(url,function(data) {
			$.each(data, function(i, post) {
				appendTweet(post.text, post.id);
			});
			$("#tweets").append("<p>....................................................</p>");
		});
		
	};
	
	// First time, directly load the tweets
	loadTweets();
	
	// Append a scroll event handler to the container
	$(window).scroll(function() {
		// We check if we're at the bottom of the window
		if($(window).scrollTop() + $(window).height() == $(document).height()) {
			// If we're at the bottom, show the overlay and retrieve the next page
			currentPage++;
			
			if(currentPage > 4) return false;
			
			loadTweets();
		}
	});
	
});
