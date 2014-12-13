$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("#clear_sidebar").removeClass();
    $("#clear_sidebar").toggleClass("glyphicon glyphicon-chevron-right");
});

