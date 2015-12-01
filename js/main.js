
// adds a tooltip for the registration menus
function add_tooltip (id, message, onCondition) {
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

$(document).ready(function()
{
	//  tooltip to make sure email addresses match
	add_tooltip("#verifyEmail", "must match Email address above", function () {
		// if the email address, doesn't match verifyEmail address, show tool tip
		return ($("#email").val() != $("#verifyEmail").val());
	});

	// tooltip to make sure the username isn't taken
	add_tooltip("#registerContainer #username", "Username unavailable", function () {
		// TODO: update to compare $("#registerContainer #username").val() to current username list
		return true;
	});

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
			toggleVision("cabinet");
			toggleVision("darken");
			$(".cabinethover").show();
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