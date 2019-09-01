const navbarAccueil = $("#link-accueil");
const jumbotronAccueil = $("#accueil");
const sectionSociete = $("#societe");
const informations = $("#informations");

$(document).on('scroll', function() {
	let parallax;
	if ($(document).scrollTop() < 91) {
		navbarAccueil.addClass("active");
	}

	parallax = "50% " + (50 - $(document).scrollTop() / 20) + "%";
	jumbotronAccueil.css("background-position", parallax);
	parallax = "50% " + (50 - ($(document).scrollTop() - 50) / 20) + "%";
	sectionSociete.css("background-position", parallax);
});

function writeScrollTop() {
	console.log("ScrollTop : " + $(document).scrollTop());
}

function sendmail() {
	let nom = document.getElementById("nom").value;
	let mail = document.getElementById("email").value;
	let message = document.getElementById("message").value;
	document.getElementById("contact-form").action = "mailto:mbes@faciliteam.fr?subject=Formulaire contact Faciliteam.fr - " + nom + "&body=" + message;
	console.log(message);
}