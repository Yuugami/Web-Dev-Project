
// Javascript for login, and register pages

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
		// check with the database that the user name is unique
		
		$.ajax({
			url: "verifyUniqueUsername.php",
			datatype: "text",
			data: {"username": $("#registerContainer #username").val()},
			async: true,
			success: function (data) {
				if ((data == "0")) {
					console.log("the result was true");
				} else {
					console.log("false");
				}

				//alert((data == "0"));
				return (data == "0");
			})
		});
		

		//$.get("verifyUniqueUsername.php", {"username": $("#registerContainer #username").val()}, function (data) {
		//	alert(data == 1);
		//	return (data == 1);
		//});

		// catchall if something goes wrong with ajax request
		//return true;
	});
});