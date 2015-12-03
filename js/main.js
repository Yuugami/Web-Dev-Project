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
		start: function(event, ui)
		{
			$("#cabinet").css("border-color", "yellow");
		},
		stop: function(event, ui)
		{
			$("#cabinet").css("border-color", "black")
		}
	});

	$(".miniblocks").draggable({
		containment: 'body',
		revert: 'invalid',
		helper: 'clone', 
		appendTo: '.corebody',
		start: function (event, ui)
		{
			console.log("Currently dragging miniblock");
		}
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
			}
			
			console.log("Miniblock dropped!");
		}
	});

	/*$(".miniblocks").mousedown(function()
	{
		//toMainScreen();
		console.log("Cabinet closing due to picking up block...");
	});*/

	/*-------------------------------------------------------------------------*/

	//  Tooltip to make sure email addresses match
    add_tooltip("#verifyEmail", "must match Email address above", function () 
    {
        // if the email address, doesn't match verifyEmail address, show tool tip
        return ($("#email").val() != $("#verifyEmail").val());
    });

    // tooltip to make sure the username isn't taken
    add_tooltip("#registerContainer #username", "Username unavailable", function () 
    {
        // TODO: update to compare $("#registerContainer #username").val() to current username list
        return true;
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

function add_tooltip (id, message, onCondition) 
{
    // automatically checked the emails match onblur
    $(id).blur(function () {
        // if our condition is met
        if(onCondition() == true) {
            // add our tool tip
            $(id).attr("title", message)
            .tooltip({
                position: "bottom left",
                trigger: "manual"
            }).tooltip("show");
        } else {
            // if the field is good, make sure our tooltip isn't showing
            $(id).tooltip("hide");
        }
    })

    .focus(function () {
        // get the tool tip out of the way when the user whats to input data
        $(id).tooltip("destroy");
    });
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