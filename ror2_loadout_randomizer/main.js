import { randomizeSurvivor } from './survivors.js';
import { randomizeArtifacts } from './artifacts.js';

console.log("Here be dragons ...!");

let can_randomize = false;

function randomizeFully() {

    let seed = Math.random();
    randomizeSurvivor(seed);
    randomizeArtifacts(seed);

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
        duration: 550
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
        duration: 550
    });

    // Artifact items
    tl.add({
        targets: ".artifact-box",
        translateX: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(300),
        duration: 550
    });

    // Opacity change 3
    tl.add({
        targets: ".meta-ui.misc",
        easing: "easeInOutQuad",
        opacity: [0, 1],
        scaleX: [0, 1]
    });

}

function fadeOutAndCallback() {

    anime({
        targets: ".meta-ui",
        easing: "easeInOutQuad",
        opacity: [1, 0],
        scaleX: [1, 0],
        duration: 330,
        complete: function(anim) {
            randomizeFully();
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


// Do it once on load
randomizeFully();
fadeIn();