import Animal from "./animal";

export default class Purchase {
    id: number | null;
    purchase_id: number | null;
    purchase_type: string | null;
    weight: number | null;
    price_total: number | null;
    price_kg: number | null;
    auction_commission: number | null;
    auction_name: string | null;
    description: string | null;
    purchase_date: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    animal_id: number | null;
    animal: Animal | null;

    constructor(
        id: number | null,
        purchase_type: string | null,
        weight: number | null,
        price_total: number | null,
        price_kg: number | null,
        auction_commission: number | null,
        auction_name: string | null,
        description: string | null,
        purchase_date: string | null,
        created_at: Date | null,
        updated_at: Date | null,
        animal_id: number | null,
        animal: Animal | null
    ) {
        this.id = id;
        this.purchase_id = id;
        this.purchase_type = purchase_type;
        this.weight = weight;
        this.price_total = price_total;
        this.price_kg = price_kg;
        this.auction_commission = auction_commission;
        this.auction_name = auction_name;
        this.description = description;
        this.purchase_date = purchase_date;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.animal_id = animal_id;
        this.animal = animal
    }
}
