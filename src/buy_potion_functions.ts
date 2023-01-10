import { Entity, ItemInfo } from "typed-adventureland";

export class buy_potion_functions {

    check_need_potions(minimum_hpots: number, minimum_mpots: number) {
        let num_hpot = this.get_number_potion("hpot0");
        let num_mpot = this.get_number_potion("mpot0");
        
        if (num_hpot < minimum_hpots) {
            return true
        }
    
        if (num_mpot < minimum_mpots) {
            return true
        }
    
        return false
    }
    
    // Asynchronus function to smart move to potions NPC
    async travel_to_potions() {
        set_message("moving to potions npc", "#4CE0CC");
        let result = await smart_move({to:"potions"});
        return result;
    }
    
    // Asunchronus function to buy potions 
    async buy_potions(desired_hpots: number, desired_mpots: number) {
        let purchased_hpots: boolean = false;
        let purchased_mpots: boolean = false;

        let num_hpot = this.get_number_potion("hpot0");
        let num_mpot = this.get_number_potion("mpot0");

        const hpots_to_buy: number = (desired_hpots - num_hpot);
        const mpots_to_buy: number = (desired_mpots - num_mpot);
    
        if (hpots_to_buy > 0) {
            purchased_hpots = await buy("hpot0", hpots_to_buy);
        }
    
        if (mpots_to_buy > 0) {
            purchased_mpots = await buy("mpot0", mpots_to_buy);
        }
    
        let purchased_potions: boolean = (purchased_hpots || purchased_mpots)
        
        return purchased_potions
    }
    
    get_number_potion(item_name: string) {
        // Filter the array and return all hpot0 stacks
        let hpots = character.items.filter(function(elem: ItemInfo) {
            return elem != null && elem.name == item_name;
    
            // Use map to return an inner value in our case hpots have a quantity number
            }).map(function (item: ItemInfo) {
                return item.q;
              });
    
        // reduce to sum the array or return 0
        return hpots.reduce((a, b) => (a || 0) + (b || 0), 0) ?? 0;
    }
}