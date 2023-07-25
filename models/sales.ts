import Animal from "./animal";

export default class Sale {
    id: number | null;
    sale_id: number | null;
    sale_type: string | null;
    weight: number | null;
    price_total: number | null;
    price_kg: number | null;
    auction_commission: number | null;
    auction_name: string | null;
    description: string | null;
    sale_date: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    animal_id: number | null;
    animal: Animal | null;

    constructor(
        id: number | null,
        sale_type: string | null,
        weight: number | null,
        price_total: number | null,
        price_kg: number | null,
        auction_commission: number | null,
        auction_name: string | null,
        description: string | null,
        sale_date: string | null,
        created_at: Date | null,
        updated_at: Date | null,
        animal_id: number | null,
        animal: Animal | null
    ) {
        this.id = id;
        this.sale_id = id;
        this.sale_type = sale_type;
        this.weight = weight;
        this.price_total = price_total;
        this.price_kg = price_kg;
        this.auction_commission = auction_commission;
        this.auction_name = auction_name;
        this.description = description;
        this.sale_date = sale_date;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.animal_id = animal_id;
        this.animal = animal;
    }
}