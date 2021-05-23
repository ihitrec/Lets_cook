$(document).ready(function () {

    // Animate nav dropdown and disable rapid clicks.
    $(".close").click(menuToggle);

    function menuToggle() {
        if ($(".close .hr1").hasClass("hide-hr") === false) {
            $(".close").unbind("click");
            $(".close .hr1").addClass("hide-hr");
            $(".close hr").addClass("hr-margin");
            $(".close .hr2").css("transform", "rotate(45deg)");
            $(".close .hr3").css("transform", "rotate(-45deg)");
            setTimeout(function () {
                $(".close").click(menuToggle);
            }, 350)
        } else {
            $(".close").unbind("click");
            $(".close .hr1").removeClass("hide-hr");
            $(".close hr").removeClass("hr-margin");
            $(".close .hr2").css("transform", "rotate(0deg)");
            $(".close .hr3").css("transform", "rotate(0deg)");
            setTimeout(function () {
                $(".close").click(menuToggle);
            }, 350)
        }
    }
});