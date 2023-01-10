// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

import { buy_potion_functions } from "./buy_potion_functions";
import { Entity, ItemInfo } from "typed-adventureland";

//
// FARMING SETUP
//
const ATTACK_MODE = false;
const MONSTER_TO_FARM = 'goo';

//
// POTIONS SETUP
//
const DESIRED_HPOT0 = 100;
const DESIRED_MPOT0 = 100;
const MINIMUM_HPOTS = 10;
const MINIMUM_MPOTS = 10;

//
// SELL SETUP
//

let potions = new buy_potion_functions();

setInterval(async () => {
    //
    // IF WE ARE DEAD REZ OURSELF
    //
    if (character.rip) {
        // HANDLE REZ
    }

    //
    // IF MOVING OR SMART MOVING JUST RETURN
    //
    if(character.moving || smart.moving) {
        return;
    }

    //
    // CHECK ON AND BUY POTIONS IF NEEDED
    //
    if (potions.check_need_potions(MINIMUM_HPOTS, MINIMUM_MPOTS)) {
        
        game_log('We need to buy potions.')
        await potions.travel_to_potions();
        await potions.buy_potions(DESIRED_HPOT0, DESIRED_MPOT0);
    }

    use_hp_or_mp();
    loot();

}, 1000 / 4); // Loops every 1/4 seconds.