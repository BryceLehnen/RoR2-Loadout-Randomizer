import { randomizeSurvivor } from './survivors.js';
import { randomizeArtifacts } from './artifacts.js';
import { randomizeBoss } from './boss.js';

console.log("Here be dragons ...!");

let can_randomize = false;

function randomizeFully() {

    let seed = Math.random();
    randomizeSurvivor(seed);
    randomizeArtifacts(seed, rangeInput);
    randomizeBoss(seed);

}

function randomizeSlider() {

    let seed = Math.random();
    randomizeSurvivor(seed);
    randomizeArtifacts(seed, rangeInput);
    randomizeBoss(seed);

}

function fadeIn() {

    var tl = anime.timeline({
        easing: "easeInOutCubic",
        duration: 300,
        complete: function(anim) {
            can_randomize = true;
        }
    });

    // Opacity change 1
    tl.add({
        targets: ".meta-ui.survivor",
        easing: "easeInOutQuad",
        opacity: [0, 1],
        scaleX: [0, 1]
    });

    // Skill items
    tl.add({
        targets: ".skillitem",
        translateX: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(300),
        duration: 300
    });

    // Opacity change 2
    tl.add({
        targets: ".meta-ui.artifacts",
        easing: "easeInOutQuad",
        opacity: [0, 1],
        scaleX: [0, 1]
    });

    // Artifact items
    tl.add({
        targets: ".artifact-image",
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(200, {grid: [4, 4], from: "center"}),
        duration: 300
    });

    // Artifact items
    tl.add({
        targets: ".artifact-box",
        translateX: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(300),
        duration: 300
    });

    // Opacity change 3
    tl.add({
        targets: ".meta-ui.boss",
        easing: "easeInOutQuad",
        opacity: [0, 1],
        scaleX: [0, 1]
    });

    // Opacity change 4
    tl.add({
        targets: ".meta-ui.misc",
        easing: "easeInOutQuad",
        opacity: [0, 1],
        scaleX: [0, 1]
    });

}

// Randomizes based on the slider
function fadeOutAndCallback() {

    anime({
        targets: ".meta-ui",
        easing: "easeInOutQuad",
        opacity: [1, 0],
        scaleX: [1, 0],
        duration: 300,
        complete: function(anim) {
            randomizeSlider();
            window.scrollTo(0, 0);
            fadeIn();
        }
    });

}

window.addEventListener("keydown", function (e) {
    // If we press spacebar
    if (e.key == " ") {
        if (can_randomize == true) {
            // Reroll
            fadeOutAndCallback();
            can_randomize = false;
        }
        // Don't scroll on space
        e.preventDefault();
    }
});

document.getElementById("reroll-button").onclick = function() {
    if (can_randomize == true) {
        // Reroll
        fadeOutAndCallback();
        can_randomize = false;
    }
}

// Slider functionality
let minRangeValueGap = 1;
const range = document.getElementById("range-track");
const minval = document.querySelector(".minvalue");
const maxval = document.querySelector(".maxvalue");
const rangeInput = document.querySelectorAll("input");
 
let minRange, maxRange, minPercentage, maxPercentage;

const minRangeFill = () => {
    range.style.left = (rangeInput[0].value / rangeInput[0].max) * 100 + "%";
};
const maxRangeFill = () => {
    range.style.right =
      100 - (rangeInput[1].value / rangeInput[1].max) * 100 + "%";
};
const MinVlaueBubbleStyle = () => {
    minPercentage = (minRange / rangeInput[0].max) * 100;
    minval.style.left = minPercentage + "%";
    minval.style.transform = `translate(-${minPercentage / 2}%, -100%)`;
};
const MaxVlaueBubbleStyle = () => {
    maxPercentage = 100 - (maxRange / rangeInput[1].max) * 100;
    maxval.style.right = maxPercentage + "%";
    maxval.style.transform = `translate(${maxPercentage / 2}%, 100%)`;
};
   
const setMinValueOutput = () => {
    minRange = parseInt(rangeInput[0].value);
    minval.innerHTML = rangeInput[0].value;
};
const setMaxValueOutput = () => {
    maxRange = parseInt(rangeInput[1].value);
    maxval.innerHTML = rangeInput[1].value;
};

setMinValueOutput()
setMaxValueOutput()
minRangeFill()
maxRangeFill()
MinVlaueBubbleStyle()
MaxVlaueBubbleStyle()

rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
        setMinValueOutput();
        setMaxValueOutput();

        minRangeFill();
        maxRangeFill();

        MinVlaueBubbleStyle();
        MaxVlaueBubbleStyle();

        if (maxRange - minRange < minRangeValueGap) {
            if (e.target.className === "min") {
                rangeInput[0].value = maxRange - minRangeValueGap;
                setMinValueOutput();
                minRangeFill();
                MinVlaueBubbleStyle();
                e.target.style.zIndex = "2"
            }
            else {
                rangeInput[1].value = minRange + minRangeValueGap;
                e.target.style.zIndex = "2"
                setMaxValueOutput();
                maxRangeFill();
                MaxVlaueBubbleStyle();
            }
        } 
    });
});

// Do it once on load
randomizeFully();
fadeIn();