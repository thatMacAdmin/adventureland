import { Entity, ItemInfo, MonsterEntity } from "typed-adventureland";

export class farm_monster_functions {

    move_closer_to_target(my_target: MonsterEntity) {
        set_message('closing distance')
        if (distance(character, my_target) >= character.range) {
            move(
                character.real_x+(my_target.real_x-character.real_x)/20,
                character.real_y+(my_target.real_y-character.real_y)/20
            );
        }
    }

    async move_to_mob_area(mob: SmartMoveToDestination) {
        set_message('smart moving')
        let result = await smart_move(mob)
        return result
    }

}