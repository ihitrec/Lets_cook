$(document).ready(function () {

    /* Calculate food-window position from top */
    if (window.innerWidth < 555) {
        let howHigh = $(".search").height() * 0.43 + 137
        $(".food-window").css("top", howHigh);
    }

    /* Animate nav dropdown and disable rapid clicks */
    $(".close").click(menuToggle);

    function menuToggle() {
        $(".close").unbind("click");
        this.classList.toggle("close-class");
        setTimeout(function () {
            $(".close").click(menuToggle);
        }, 350)
    }

    /* Carousel controls */
    $(".right").click(moveLeft);

    let count = 0;
    let firstDiv = $(".car-row > div")[count];
    let count2 = 9;
    let lastCardOrder;
    let currentLeft;

    // Move carousel left, change order of first card to last
    function moveLeft() {
        $(".right").unbind("click");
        currentLeft = $(".car-row").css("left");
        currentLeft = currentLeft.substring(0, currentLeft.length - 2);
        $(".car-row").animate({
            left: currentLeft - 400 + "px"
        }, 1000);
        if (count === 10) {
            count = 0;
        }
        firstDiv = $(".car-row > div")[count];
        count++;
        lastCardOrder = parseInt($(".car-row > div")[count2].style.order);
        setTimeout(function () {
            firstDiv.style.order = lastCardOrder + 1;
            $(".car-row").css("left", "0");
            $(".right").click(moveLeft);
        }, 1200)
        if (count2 === 9) {
            count2 = 0;
        } else {
            count2++;
        }
    }
});