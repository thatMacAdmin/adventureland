// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

import { Entity } from "typed-adventureland";

const attack_mode = false;

setInterval(() => {
    use_hp_or_mp();
    loot();

    if (!attack_mode || character.rip || is_moving(character)) {
        return;
    }

    let target = get_targeted_monster();
    if (!target) {
        target = get_nearest_monster({ min_xp: 100, max_att: 120 });

        if (target) {
            get_target(target)
            change_target(target);
        } else {
            set_message("No Monsters");
            return;
        }
    }

    if (!is_in_range(target)) {
        // Walk half the distance
        move(
            character.x + (target.x - character.x) / 2,
            character.y + (target.y - character.y) / 2,
        );
    } else if (can_attack(target)) {
        set_message("Attacking");
        attack(target);
    }
}, 1000 / 4); // Loops every 1/4 seconds.

function get_target(my_target: Entity) {
    console.log("targeting")
}