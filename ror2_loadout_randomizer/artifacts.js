
let artifact_list = {
    img_dir: "ror2_loadout_randomizer/images/artifacts/",
    choices: [
        {
            name: "Artifact of Spite",
            icon: "Artifact_of_Spite.webp",
            desc: "Enemies drop multiple exploding bombs on death."
        },
        {
            name: "Artifact of Command",
            icon: "Artifact_of_Command.webp",
            desc: "Choose your items."
        },
        {
            name: "Artifact of Honor",
            icon: "Artifact_of_Honor.webp",
            desc: "Enemies can only spawn as elites."
        },
        {
            name: "Artifact of Enigma",
            icon: "Artifact_of_Enigma.webp",
            desc: "Spawn with a random equipment that changes every time it's activated."
        },
        {
            name: "Artifact of Chaos",
            icon: "Artifact_of_Chaos.webp",
            desc: "Friendly fire is enabled for both survivors and monsters alike."
        },
        {
            name: "Artifact of Glass",
            icon: "Artifact_of_Glass.webp",
            desc: "Allies deal 500% damage, but have 10% health."
        },
        {
            name: "Artifact of Dissonance",
            icon: "Artifact_of_Dissonance.webp",
            desc: "Monsters can appear outside their usual environments."
        },
        {
            name: "Artifact of Evolution",
            icon: "Artifact_of_Evolution.webp",
            desc: "Monsters gain items between stages."
        },
        {
            name: "Artifact of Metamorphosis",
            icon: "Artifact_of_Metamorphosis.webp",
            desc: "Players always spawn as a random survivor."
        },
        {
            name: "Artifact of Sacrifice",
            icon: "Artifact_of_Sacrifice.webp",
            desc: "Monsters drop items on death, but Chests no longer spawn."
        },
        {
            name: "Artifact of Vengeance",
            icon: "Artifact_of_Vengeance.webp",
            desc: "Your relentless doppelganger will invade every 10 minutes."
        },
        {
            name: "Artifact of Kin",
            icon: "Artifact_of_Kin.webp",
            desc: "Monsters will be of only one type per stage."
        },
        {
            name: "Artifact of Swarms",
            icon: "Artifact_of_Swarms.webp",
            desc: "Monster spawns are doubled, but monster maximum health is halved."
        },
        {
            name: "Artifact of Death",
            icon: "Artifact_of_Death.webp",
            desc: "When one player dies, everyone dies."
        },
        {
            name: "Artifact of Frailty",
            icon: "Artifact_of_Frailty.webp",
            desc: "Fall damage is doubled and lethal."
        },
        {
            name: "Artifact of Soul",
            icon: "Artifact_of_Soul.webp",
            desc: "Wisps emerge from defeated monsters."
        },
        {
            name: "Artifact of Rebirth",
            icon: "Artifact_of_Rebirth.png",
            desc: "Descend to Petrichor V with gifts from a previous life."
        }
    ]


}


export function randomizeArtifacts(seed, rangeInput) {

    // Get and clear the divs
    let artifacts_div = document.getElementById("artifacts");
    artifacts_div.innerHTML = "";
    let artifact_info_div = document.getElementById("artifact-info");
    artifact_info_div.innerHTML = "";

    // Create the random function for the current seed
    let seeded_rng = new alea(seed);
    let min = rangeInput[0].value;
    let max = rangeInput[1].value;

    // Randomly select from 2 to 6 artifacts by default
    // If the slider is changed, selects based on that
    // Default is 2-6 artifacts
    let artifact_num = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(rangeInput);
    console.log(artifact_num);
    let artifacts_picked = [];
    while (artifacts_picked.length < artifact_num) {
        let new_artifact = Math.floor(seeded_rng() * artifact_list.choices.length);
        if (!artifacts_picked.includes(new_artifact)) {
            artifacts_picked.push(new_artifact);
        }
    }

    // Generate the grid
    for (let a = 0; a < artifact_list.choices.length; a++) {
        let artifact = artifact_list.choices[a];

        let style_tag = "dark"
        if (artifacts_picked.includes(a)) {
            style_tag = "bright"
            // Add the artifact descriptor
            artifact_info_div.innerHTML += `
                <div class="artifact-box">
                    <div class="text side artifact-name">
                        ` + artifact.name + `:
                    </div>
                    <div class="text side artifact-desc">
                        ` + artifact.desc + `
                    </div>
                </div>
            `
        }

        // Add the artifact element to the div
        artifacts_div.innerHTML += `
            <img
                class="artifact-image ` + style_tag + `"
                src="` + artifact_list.img_dir + artifact.icon + `"
                alt="` + artifact.name + `"
            >
        `
    }

}