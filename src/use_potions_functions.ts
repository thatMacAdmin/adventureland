import { Entity, ItemInfo } from "typed-adventureland";

export class use_potion_functions {

    use_potions() {
        if(this.should_use_health_potion()) {
            use_skill('use_hp')
        }

        if(this.should_use_mana_potion()) {
            use_skill('use_mp')
        }
    }

    should_use_health_potion() {

        if (is_on_cooldown('use_hp')) {
            return false;
        }

        if(character.hp < (character.max_hp - 200) * 0.95) {
            game_log('using hp')
            return true;
        }

        return false;
    }

    should_use_mana_potion() {

        if (is_on_cooldown('use_mp')) {
            return false;
        }
        
        if(character.mp < (character.max_mp - 300) * 0.95) {
            game_log('using mp')
            return true;
        }

        return false;
    }
}