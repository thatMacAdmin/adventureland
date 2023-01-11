//
// IMPORTS
//
import { buy_potion_functions } from "./buy_potion_functions";
import { use_potion_functions } from "./use_potions_functions";
import { farm_monster_functions } from "./monster_farm_functions";
import { Entity, ItemInfo, MonsterEntity } from "typed-adventureland";

//
// SETUP CLASS OBJECTS FOR IMPORTS
//
let buy_potions = new buy_potion_functions();
let use_potions = new use_potion_functions();
let farm_monsters = new farm_monster_functions();

//
// FARMING SETUP
//
const ATTACK_MODE = false;
const MONSTER_TO_FARM = 'bee';

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
    // LOOT
    //
    loot();

    //
    // USE A POTION IF NEEDED
    //
    use_potions.use_potions();

    //
    // CHECK ON AND BUY POTIONS IF NEEDED
    //
    if (buy_potions.check_need_potions(MINIMUM_HPOTS, MINIMUM_MPOTS)) {
        
        game_log('We need to buy potions.')
        await buy_potions.travel_to_potions();
        await buy_potions.buy_potions(DESIRED_HPOT0, DESIRED_MPOT0);
    }

    let my_target = get_targeted_monster();

    if(!my_target) {
        my_target = get_nearest_monster({
            type: MONSTER_TO_FARM,
            path_check: true,
            no_target: true
        });
        
        if (my_target) {
            change_target(my_target);
        }
    }

    if(!my_target) {
        game_log('smart moving')
        farm_monsters.move_to_mob_area(MONSTER_TO_FARM);
    }

    if(my_target) {
        
        set_message('attacking')

        if(can_attack(my_target)) {
            attack(my_target);
            return;
        } 

        farm_monsters.move_closer_to_target(my_target);
    }

}, 1000 / 4); // Loops every 1/4 seconds.