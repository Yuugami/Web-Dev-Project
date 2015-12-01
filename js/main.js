

// Use Google Feed API for RSS Feeds
google.load("feeds", "1");
google.setOnLoadCallback(initializeFeedAPI);

$(document).ready(function()
{

	$(".fa.fa-bars").hover(function()
	{
		$(this).toggleClass("menuHover");
	});

	$(".fa.fa-bars").click(function()
	{
		$(".menuPanel").slideToggle();
		
		toggleVision("darken");
	});

	$(".cabinethover").hover(function()
	{
		$(".fa.fa-arrow-left").show();
		$(".fa.fa-arrow-left").animate({right:'+=10px'},500);

		for(var i=0; i < 10; i++)
		{
			setTimeout(function()
			{
				$(".fa.fa-arrow-left").animate({right: '0px'},500);
			},500);

			setTimeout(function()
			{
				$(".fa.fa-arrow-left").animate({right: '10px'},500);
			},500);
		}
	},
	function()
	{
		$(".fa.fa-arrow-left").hide();
	});

	$(".cabinethover").click(function()
	{
		toggleVision("cabinet");
		toggleVision("darken");
		$(".fa.fa-arrow-left").css("right", "700px");
	});
});

function toggleVision(obj)
{
	var id = "#" + obj;
	if(document.getElementById(obj).style.display == "block")
		$(id).css("display", "none");
	else
		$(id).css("display", "block");
}


// Google RSS Feed API callback function
// TODO: protect against xss
// TODO: properly format RSS output
// TODO: get feed list from database
// TODO: style output
// TODO: change number of elements that we load

// loads the user's RSS feeds, sorts by date, and appends the output to #extrafeed
function initializeFeedAPI() {
	var feedList = ["http://www.cbc.ca/cmlink/rss-topstories", 
	                "http://goridgebacks.com/rss.aspx"];

	for(var i = 0; i < feedList.length; i++) {
		var feed = new google.feeds.Feed(feedList[0]);
		feed.load(function(result) {
			if(!result.error) {
				for(var j = 0; j < result.feed.entries.length; j++) {
					var entry = result.feed.entries[j];
					$("#extrafeed").append($("<div><p>" + entry.title + "</p></div>")) 
				}
			}
		});
	}
}


/* !function(d,s,id)
{
	var js,fjs=d.getElementsByTagName(s)[0],
	p=/^http:/.test(d.location)?'http':'https';

	if(!d.getElementById(id))
		{
			js=d.createElement(s);
			js.id=id;
			js.src=p+"://platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js,fjs);
		}
}(document,"script","twitter-wjs"); */