$(document).ready(function () {

    /* Calculate food-window position from top */
    if (window.innerWidth < 555) {
        let howHigh = $(".search").height() * 0.43 + 137
        $(".food-window").css("top", howHigh);
    }

    /* Spatula icon animation */
    $(".dropdown-toggle").click(rotateSpatula);

    let rotated = false;
    let spatulaImg = document.getElementsByClassName("spatula")[0];

    function rotateSpatula() {
        $(".dropdown-toggle").addClass("disable-click");
        if (!rotated) {
            spatulaImg.classList.toggle("rotate-spatula");
            rotated = true;
        } else {
            spatulaImg.classList.toggle("rotate-spatula");
            spatulaImg.classList.toggle("original-position");
        }
        setTimeout(function () {
            $(".dropdown-toggle").removeClass("disable-click");
        }, 400)
    }

    /* Animate nav dropdown and disable rapid clicks */
    $(".close").click(menuToggle);

    function menuToggle() {
        $(".close").unbind("click");
        this.classList.toggle("close-class");
        setTimeout(function () {
            $(".close").click(menuToggle); //Check how long bootstrap animation lasts
        }, 350)
    }

    /* Carousel controls */

    // Keep cards centered on small screens
    if (window.innerWidth < 481) {
        $(".car-row").css("width", window.innerWidth * 10);
    }

    let count = 0;
    let firstDiv = $(".car-row > div")[count];
    let count2 = 9;
    let lastCardOrder;
    let leftOffset = $(".car-row").css("width")
    leftOffset = leftOffset.slice(0, -2) / 10

    $(".right").click(moveLeft);
    // Move carousel left, change order of first card to last
    function moveLeft() {
        $(".left").unbind("click");
        $(".right").unbind("click");
        $(".car-row").animate({
            left: `-${leftOffset}px`
        }, 600);
        firstDiv = $(".car-row > div")[count];
        lastCardOrder = parseInt($(".car-row > div")[count2].style.order);
        setTimeout(function () {
            firstDiv.style.order = lastCardOrder + 1;
            $(".car-row").css("left", "0");
            $(".left").click(moveRight);
            $(".right").click(moveLeft);
        }, 650)
        if (count === 9) {
            count = 0
        } else {
            count++;
        }
        if (count2 === 9) {
            count2 = 0
        } else {
            count2++;
        }
    }

    $(".left").click(moveRight);
    //Move carousel right, change order of last card to first
    function moveRight() {
        $(".left").unbind("click");
        $(".right").unbind("click");
        lastDiv = $(".car-row > div")[count2];
        firstCardOrder = parseInt($(".car-row > div")[count].style.order);
        lastDiv.style.order = firstCardOrder - 1;
        $(".car-row").css("left", `-${leftOffset}px`);
        $(".car-row").animate({
            left: "0px"
        }, 600);
        setTimeout(function () {
            $(".left").click(moveRight);
            $(".right").click(moveLeft);
        }, 650)
        if (count === 0) {
            count = 9
        } else {
            count--;
        }
        if (count2 === 0) {
            count2 = 9
        } else {
            count2--;
        }
    }
});