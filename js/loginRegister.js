
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
		// TODO: update to compare $("#registerContainer #username").val() to current username list
		return true;
	});
});