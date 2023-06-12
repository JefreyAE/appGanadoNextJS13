export default class Injectable {
    id: number | null;
    animal_id: number | null;
    injectable_type: string | null;
    application_date: String | null;
    injectable_name: string | null;
    injectable_brand: string | null;
    withdrawal_time: number | null;
    effective_time: number | null;
    description: string | null;
    creation_time: string | null;
    created_at: Date | null;
    updated_at: Date | null;

    constructor(
        id: number | null,
        animal_id: number | null,
        injectable_type: string | null,
        application_date: String | null,
        injectable_name: string | null,
        injectable_brand: string | null,
        withdrawal_time: number | null,
        effective_time: number | null,
        description: string | null,
        creation_time: string | null,
        created_at: Date | null,
        updated_at: Date | null
    ) {
        this.id = id;
        this.animal_id = animal_id;
        this.injectable_type = injectable_type;
        this.application_date = application_date;
        this.injectable_name = injectable_name;
        this.injectable_brand = injectable_brand;
        this.withdrawal_time = withdrawal_time;
        this.effective_time = effective_time;
        this.description = description;
        this.creation_time = creation_time;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
