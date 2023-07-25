
export default class Herd {
    id: number | null;
    name: string | null;
    description: string | null;
    
    constructor(
        id: number | null,
        name: string | null,
        description: string | null
    ){
        this.id = id;
        this.name = name;
        this.description = description;
    }
}