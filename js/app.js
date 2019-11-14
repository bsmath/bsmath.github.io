function randomWithRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Navbar onload
$(document).ready(function () {
    if ($(document).scrollTop() > 30) {
        $('#navbar').addClass('navbar-light bg-light border-bottom');
        $('#navbar-brand').addClass('text-primary');
        $('#navbar').removeClass('navbar-dark');
    }

    // Modifier quand il y aura plusieurs pophover
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    let randomDeg = 0;
    $(".img-realisation").each(function () {
        $(this).on("mouseover", function () {
            $(this).css("transform", "rotate(0deg)");
        });
        $(this).on("mouseout", function () {
            $(this).css("transform", "rotate(" + Math.round(randomWithRange(-5, 5)) + "deg)");
        });
    });
});
// Navbar scrolling change
$(document).on('scroll', function () {
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

    $('#banniere').css('background-position-y', `${50 - ($(document).scrollTop() / 20)}%`);
});

// Bouton portfolio
$('#btn-portfolio').on('mouseover', function () {
    $('#btn-portfolio').html('Découvrir <i class="fas fa-chevron-down"></i>');
});
$('#btn-portfolio').on('mouseout', function () {
    $('#btn-portfolio').text('Portfolio')
});