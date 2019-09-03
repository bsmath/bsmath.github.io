// Navbar onload
$(document).ready(function() {
    if ($(document).scrollTop() > 30) {
        $('#navbar').addClass('navbar-light bg-light border-bottom');
        $('#navbar-brand').addClass('text-primary');
        $('#navbar').removeClass('navbar-dark');
    }

    $('#slam-tooltip').tooltip('toogle');
});
// Navbar scrolling change
$(document).on('scroll', function() {
    if ($(document).scrollTop() > 30) {
        $('#navbar').addClass('navbar-light bg-light border-bottom');
        $('#navbar-brand').addClass('text-primary');
        $('#navbar').removeClass('navbar-dark');
    }
    else {
        $('#navbar').addClass('navbar-dark');
        $('#navbar').removeClass('navbar-light bg-light border-bottom');
        $('#navbar-brand').removeClass('text-primary');
    }
});

// Bouton portfolio
$('#btn-portfolio').on('mouseover', function() {
    $('#btn-portfolio').html('Découvrir <i class="fas fa-chevron-down"></i>');
});
$('#btn-portfolio').on('mouseout', function() {
    $('#btn-portfolio').text('Portfolio')
});