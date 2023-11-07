const nextBt = document.querySelector(".nextBt");
const prevBt = document.querySelector(".prevBt");
const slideShow = document.querySelector(".slideShow");
let cnt = 0;

nextBt.addEventListener("click", function () {
    if (cnt == 0) slideShow.style.transform = "translate(-100vw)";
    else if (cnt == 1) slideShow.style.transform = "translate(-200vw)";
    else slideShow.style.transform = "translate(0vw)";
    cnt++;
    if (cnt > 2) cnt = 0;
});

prevBt.addEventListener("click", function () {
    if (cnt == 0) slideShow.style.transform = "translate(-200vw)";
    else if (cnt == 1) slideShow.style.transform = "translate(-100vw)";
    else slideShow.style.transform = "translate(0vw)";
    cnt++;
    if (cnt > 2) cnt = 0;
});
