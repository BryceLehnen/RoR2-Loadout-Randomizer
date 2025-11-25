import { acrid } from "./survivors/acrid.js";
import { artificer } from "./survivors/artificer.js";
import { bandit } from "./survivors/bandit.js";
import { captain } from "./survivors/captain.js";
import { commando } from "./survivors/commando.js";
import { engineer } from "./survivors/engineer.js";
import { huntress } from "./survivors/huntress.js";
import { loader } from "./survivors/loader.js";
import { mercenary } from "./survivors/mercenary.js";
import { mul_t } from "./survivors/mul_t.js";
import { railgunner } from "./survivors/railgunner.js";
import { rex } from "./survivors/rex.js";
import { void_fiend } from "./survivors/void_fiend.js";
import { seeker } from "./survivors/seeker.js";
import { false_son } from "./survivors/false_son.js";
import { chef } from "./survivors/chef.js";
import { operator } from "./survivors/operator.js";
import { drifter } from "./survivors/drifter.js";

let survivor_list = [
    acrid,
    artificer,
    bandit,
    captain,
    commando,
    engineer,
    huntress,
    loader,
    mul_t,
    mercenary,
    rex,
    railgunner,
    void_fiend,
    seeker,
    false_son,
    chef,
    operator,
    drifter
];

export function randomizeSurvivor(seed) {

    // Get and clear the divs
    let skills_div = document.getElementById("skills");
    skills_div.innerHTML = "";
    let survivor_div = document.getElementById("survivor");
    survivor_div.innerHTML = "";

    // Create the random function for the current seed
    let seeded_rng = new alea(seed);

    // Pick a random survivor
    let random_index = Math.floor(seeded_rng() * survivor_list.length);
    // Testing for new survivors
    //random_index = 17 // Drifter
    let survivor = survivor_list[random_index];

    // Add the survivor element to the div
    survivor_div.innerHTML += `
        <div class="inside-meta">
            <img
                class="square-image big"
                src="` + survivor.img_dir + survivor.portrait + `"
                alt="` + survivor.name + `"
            >
            <div>
                <div class="text survivor side bold">
                    Survivor:
                </div>
                <div class="text survivor side bold" style="color: ` + survivor.color + `">
                    ` + survivor.name + `
                </div>
            </div>
        </div>`;

    // Pick random skills
    for (let s = 0; s < survivor.skills.length; s++) {
        let skill = survivor.skills[s]

        // Pick a random choice from skill choices
        let random_index = Math.floor(seeded_rng() * skill.choices.length);
        let choice = survivor.skills[s].choices[random_index];

        // Add the skill element to the div
        skills_div.innerHTML += `
            <div class="inside-meta skillitem">
                <img
                    class="square-image"
                    src="` + survivor.img_dir + choice.icon + `"
                    alt="` + choice.name + `"
                >
                <div>
                    <div class="text skill side">
                        ` + skill.type + `:
                    </div>
                    <div class="text skill side" style="color: ` + survivor.color + `">
                        ` + choice.name + `
                    </div>
                </div>
            </div>`;

    }

}




