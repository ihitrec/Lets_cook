$(document).ready(function () {

    // Animate nav dropdown and disable rapid clicks.
    $(".close").click(menuToggle);

    function menuToggle() {
        $(".close").unbind("click");
        this.classList.toggle("close-class");
        setTimeout(function () {
            $(".close").click(menuToggle);
        }, 350)
    }
});