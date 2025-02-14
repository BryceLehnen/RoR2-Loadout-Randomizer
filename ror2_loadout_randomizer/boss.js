
let boss_list = {
    img_dir: "ror2_loadout_randomizer/images/bosses/",
    choices: [
        {
            name: "Mithrix",
            color: "#6e86a7",
            icon: "Mithrix.webp",
        },
        {
            name: "False Son",
            color: "#557fcc",
            icon: "False_Son_Boss.webp",
        }
    ]
}

export function randomizeBoss(seed) {

    // Get and clear the divs
    let boss_div = document.getElementById("boss");
    boss_div.innerHTML = "";

    // Create the random function for the current seed
    let seeded_rng = new alea(seed);

    // Pick a random boss
    let random_index = Math.floor(seeded_rng() * boss_list.choices.length);
    // Testing for new bosses
    //random_index = 1 // False Son
    let boss = boss_list.choices[random_index];

    // Add the boss element to the div
    boss_div.innerHTML += `
        <div class="inside-meta">
            <img
                class="square-image big"
                src="` + boss_list.img_dir + boss.icon + `"
                alt="` + boss.name + `"
            >
            <div class="text survivor side bold">
                    Boss: \n
                </div>
                <div class="text survivor side bold" style="color: ` + boss.color + `">
                    ` + boss.name + `
                </div>
        </div>`;
}