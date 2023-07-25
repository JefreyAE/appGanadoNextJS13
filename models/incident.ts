import Animal from "./animal";

export default class Incident {
    id: number | null;
    animal_id: number | null;
    incident_date: string | null;
    incident_type: string | null;
    description: string | null;
    animal: Animal | null
    created_at: Date | null;
    updated_at: Date | null;

    constructor(
        id: number | null,
        animal_id: number | null,
        incident_date: string | null,
        incident_type: string | null,
        description: string | null,
        animal: Animal | null,
        created_at: Date | null,
        updated_at: Date | null
    ) {
        this.id = id;
        this.animal_id = animal_id;
        this.incident_date = incident_date;
        this.incident_type = incident_type;
        this.description = description;
        this.animal = animal;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
