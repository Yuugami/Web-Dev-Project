function startGoogleFeeds() {
	// Use Google Feed API for RSS Feeds
	google.load("feeds", "1");
	google.setOnLoadCallback(initializeFeedAPI);
}

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
		$(".fa.fa-arrow-left").hide();
		$(".cabinethover").hide();
	});

	$("#darken").click(function()
	{
		if(document.getElementById("cabinet").style.display == "block")
		{
			toMainScreen();
		}
	});

	/*--------Dragging social blocks and dropping it on the main page----------*/
	$(".miniblocks").mouseenter(function ()
	{
		$(this).css("border-color", "yellow");
	});

	$(".miniblocks").mouseleave(function ()
	{
		$(this).css("border-color", "black");
	})

	$(".miniblocks").draggable({
		containment: 'body',
		revert: 'valid',
		appendTo: '.corebody',
		start: function (event, ui)
		{
			$("#cabinet").css("border-color", "yellow");
			console.log("Currently dragging miniblock...");
		},
		stop: function(event, ui)
		{
			$("#cabinet").css("border-color", "black")
		}
	});

	$("#cabinet").droppable({
		accept: '.miniblocks'
	});

	$("#darken").droppable({
		accept: '.miniblocks',
		drop: function(event, ui)
		{
			var num = prompt("Section 1, 2 or 3?");
			toMainScreen();
			if(num == 1 || num == 2 || num == 3)
			{
				// ID that is being replaced
				var id = document.getElementsByClassName("blocks")[num-1].id;
				// ID we are replacing with
				var draggedid = ui.draggable.context.id;

				$(".blocks#" + id).after(sectionReplace(ui.draggable));
				$(".blocks#" + id).remove();

				$(".miniblocks#" + draggedid).html("<p>" + id.charAt(0).toUpperCase() + id.slice(1) + "</p>");
				$(".miniblocks#" + draggedid).attr("id", id);
				console.log("Miniblock dropped!");
			}
			else
			{
				console.log("Reverted miniblock. No changes made.");
			}
		}
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

function toMainScreen()
{
	toggleVision("cabinet");
	toggleVision("darken");
	$(".cabinethover").show();
}

function sectionReplace(obj)
{
	//console.log(obj);
	var htmlcontent = "<div ";
	var className = "class=\"blocks\" ";
	var id = "id=\"" + obj.context.id + "\">";
	var content = obj.context.innerHTML + "</div>";
	htmlcontent += className + id + content;
	//console.log(htmlcontent);
	return htmlcontent;
}

// Google RSS Feed API callback function
// TODO: protect against xss
// TODO: properly format RSS output
// TODO: get feed list from database
// TODO: style output
// TODO: change number of elements that we load

// loads the user's RSS feeds, sorts by date, and appends the output to #extrafeed
function initializeFeedAPI() {
	var feedList = [];

	// get the current user's feed list from the data base
	$.ajax({
		url: "getFeedList.php",
		datatype: "json",
		data: {"username": "user001"}, // currently hardcoded to load test user
		async: false,
		success: function (data) {
			var obj = jQuery.parseJSON(data);
			for (var i = 0; i < obj.length; i++) {
				feedList.push(obj[i]['rssURL']);
			}
		}
	});

	// go through the list adding the content
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