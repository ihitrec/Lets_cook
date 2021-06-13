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

    // Disable dropdown close on body click
    $("body").click(function (event) {
        if ($(".spatula").hasClass("rotate-spatula") && !$(event.target).hasClass("dropdown-toggle")) {
            setTimeout(function () {
                $(".dropdown-menu, .dropdown-toggle").toggleClass("show")
            }, 1)
        }
    })

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
    if ($("#rating").hasClass("disable-rating-hover")) {
        $("#rating").html(parseFloat($("#rating").html()).toFixed(2));

        // Add star img based on rating
        if ($("#rating").html() === "") {
            for (let i = 0; i < 5; i++) {
                emptyStar()
            }
        } else {
            generateImages($("#rating").html());
        }

        // Show original rating after stars
        previousHTML = $("#rating").html();
        $("#rating").html(previousHTML.substring(4) + previousHTML.substring(0, 3));

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

        // Check rating and add stars, half star only if rating not round and above .5
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


        // Change star img on hover when editing rating
        $("#rating img").mouseenter(imgEnter);

        function imgEnter() {
            let changedImgs = $(this).prevAll().addBack();
            for (let i = 0; i < changedImgs.length; i++) {
                changedImgs[i].src = "../static/img/star-full.png";
            }
        }

        $("#rating img").mouseleave(imgLeave);

        function imgLeave() {
            this.src = "../static/img/star-empty.png";
        }

        $("#rating").mouseleave(ratingLeave);

        function ratingLeave() {
            let allImgs = $("#rating img")
            for (let i = 0; i < allImgs.length; i++) {
                allImgs[i].src = "../static/img/star-empty.png";
            }
        }


        // Disable hover functionality until edited by user
        let previousState = $("#rating img");

        for (let i = 0; i < 5; i++) {
            previousState.push(previousState[i].src)
        }

        $(".rate").click(enableHov)
        let ratingCount = 2;

        function enableHov() {
            if (ratingCount % 2 === 0) {
                $("#rating").removeClass("disable-rating-hover");
                for (h = 0; h < 5; h++) {
                    previousState[h].src = "../static/img/star-empty.png";
                }
                ratingCount++;
                $(".rate").html("Cancel");
            } else {
                $("#rating").addClass("disable-rating-hover");
                for (let i = 0, j = 5; i < 5; i++, j++) {
                    previousState[i].src = previousState[j]
                }
                ratingCount++;
                $(".rate").html("Add rating");
                $("#disable-sub").addClass("disable-submit");
                $("#rating img").mouseenter(imgEnter);
                $("#rating img").mouseleave(imgLeave);
                $("#rating").mouseleave(ratingLeave);
            }
        }

        // Change star img to full up to selected star
        $("#rating img").click(pickedRating)

        function pickedRating() {
            $(".rec-description *").unbind("mouseenter mouseleave");
            $(".disable-submit").removeClass("disable-submit");
            let changedImgs = $(this).prevAll().addBack();
            for (let i = 0; i < changedImgs.length; i++) {
                changedImgs[i].src = "../static/img/star-full.png";
                if (i === changedImgs.length - 1) {
                    $("input").val(i + 1)
                }
            }
            let sameImgs = $(this).nextAll()
            for (let j = 0; j < sameImgs.length; j++) {
                sameImgs[j].src = "../static/img/star-empty.png";
            }
        }
    }

    /* Ingredients open/close functionality */
    $(".ingredients-img").after($(".ingredient-list"));
    $(".ingredients-img").click(showIngredients);

    function showIngredients() {
        $(".ingredient-list").toggleClass("hidden");
        $(".ingredients-img").toggleClass("hidden");

    }

    $(".ingredient-list").click(hideIngredients)

    function hideIngredients() {
        $(".ingredient-list").toggleClass("hidden");
        $(".ingredients-img").toggleClass("hidden");
    }

    /* Remove flashed msg after set time */
    $('.flashes').delay(2500).fadeOut(1000);


    /* Theme picker */
    if (!localStorage.theme) {
        localStorage.theme = 1
    }

    $(".pattern-backg").addClass(`theme${localStorage.theme}`);

    $(".theme-picker").click(pickTheme);

    function pickTheme() {
        if (localStorage.theme === "3") {
            $(".pattern-backg").removeClass("theme3")
            return localStorage.theme = 1
        }

        $(".pattern-backg").removeClass(`theme${localStorage.theme}`)
        localStorage.theme = parseInt(localStorage.theme) + 1;
        $(".pattern-backg").addClass(`theme${localStorage.theme}`)
    }

    /* Add/remove ingredient fields */

    $("#add-ingredient").click(addIngredient)

    let ingredientCount = 1;
    let addedIngredient;
    let lastIngredient;

    function addIngredient() {
        if (ingredientCount === 1) {
            $("#remove-ingredient").css("display", "initial");
        }
        lastIngredient = $(`#ingredient${ingredientCount}`);
        addedIngredient = `<input type="text" placeholder="${ingredientCount + 1}." class="form-control mt-1" name="ingredient${ingredientCount + 1}" id="ingredient${ingredientCount + 1}" minlength="2" maxlength="40" required>`;
        $(lastIngredient).after(addedIngredient);
        ingredientCount++;
        lastIngredient = $(`#ingredient${ingredientCount}`);
    }

    $("#remove-ingredient").click(removeIngredient)

    function removeIngredient() {
        lastIngredient.remove();
        ingredientCount--;
        lastIngredient = $(`#ingredient${ingredientCount}`);
        if (ingredientCount === 1) {
            $("#remove-ingredient").css("display", "none");
        }
    }

});