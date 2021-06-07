$(document).ready(function () {


    /* ----- Calculate food-window position from top ----- */
    if (window.innerWidth < 555) {
        let howHigh = $(".search").height() * 0.43 + 137
        $(".food-window").css("top", howHigh);
    }


    /* ----- Spatula icon animation ----- */
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


    /* ----- Animate nav dropdown and disable rapid clicks-----  */
    $(".close").click(menuToggle);

    function menuToggle() {
        $(".close").unbind("click");
        this.classList.toggle("close-class");
        setTimeout(function () {
            $(".close").click(menuToggle);
        }, 350)
    }


    /* ----- Carousel controls ----- */

    // Keep cards centered on small screens
    if (window.innerWidth < 481) {
        $(".car-row").css("width", window.innerWidth * 10);
    }

    let count = 0;
    let firstDiv = $(".car-row > div")[count];
    let count2 = 9;
    let lastCardOrder;

    $(".right").click(moveLeft);
    // Move carousel left, change order of first card to last
    function moveLeft() {
        let leftOffset = $(".car-row").css("width");
        leftOffset = leftOffset.slice(0, -2) / 10;
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
        let leftOffset = $(".car-row").css("width");
        leftOffset = leftOffset.slice(0, -2) / 10;
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

    /* ----- Category expand functionality----- */
    $(".expand").click(expand)

    function expand() {
        $(this).prev().toggleClass("flex-expand");
        $(this).children("img").toggleClass("rotate-expand");
        $(this).children("span").toggleClass("hide-span");
    }


    /* ----- Rating system ----- */

    // Add star img based on rating
    if ($("#rating").html() === "") {
        for (let i = 0; i < 5; i++) {
            emptyStar()
        }
    } else {
        generateImages($("#rating").html())
    }

    // GenerateImages functions
    function emptyStar() {
        $("#rating").append("<img src='../static/img/star-empty.png'></img>");
    }

    function fullStar() {
        $("#rating").append("<img src='../static/img/star-full.png'></img>");
    }

    function notHalfStar(x) {
        let i = 0;
        for (i; i < x; i++) {
            fullStar()
        }
        for (i; i < 5; i++) {
            emptyStar()
        }
    }

    // 
    function generateImages(n) {
        let toNum = parseFloat(n);
        let toNumRound = Math.round(toNum);
        if (toNumRound < toNum) {
            notHalfStar(toNumRound);
        } else if (toNumRound > toNum) {
            let i = 0;
            for (i; i < toNumRound - 1; i++) {
                fullStar();
            }
            $("#rating").append("<img src='../static/img/star-half-full.png'></img>");
            for (i; i < 4; i++) {
                emptyStar();
            }
        } else if (toNumRound === toNum) {
            notHalfStar(toNumRound);
        }
    }


    // Change star img on hover (when editing rating - will be added)
    $("#rating img").mouseenter(function () {
        changedImgs = $(this).prevAll().addBack();
        for (let i = 0; i < changedImgs.length; i++) {
            changedImgs[i].src = "../static/img/star-full.png";
        }
    });
    $("#rating img").mouseleave(function () {
        this.src = "../static/img/star-empty.png";
    });
    $("#rating").mouseleave(function () {
        let allImgs = $("#rating img")
        for (let i = 0; i < allImgs.length; i++) {
            allImgs[i].src = "../static/img/star-empty.png";
        }
    });

});