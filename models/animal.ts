export default class Animal {
    id: number;
    nickname: string | null;
    certification_name: string | null;
    registration_number: string | null;
    code: string | null;
    birth_weight: number | null;
    birth_date: string | null;
    sex: string | null;
    father_id: number | string;
    mother_id: number | string;
    race: string;
    animal_state: string | null;
    father: Animal | null;
    mother: Animal | null;
    herd_id: number | string | null;
  
    constructor(
      id: number,
      nickname: string | null,
      certification_name: string | null,
      registration_number: string | null,
      code: string | null,
      birth_weight: number | null,
      birth_date: string | null,
      sex: string | null,
      father_id: number | string,
      mother_id: number | string,
      race: string,
      animal_state: string | null,
      father: Animal | null,
      mother: Animal | null,
      herd_id: number | string | null
    ) {
      this.id = id;
      this.nickname = nickname;
      this.certification_name = certification_name;
      this.registration_number = registration_number;
      this.code = code;
      this.birth_weight = birth_weight;
      this.birth_date = birth_date;
      this.sex = sex;
      this.father_id = father_id;
      this.mother_id = mother_id;
      this.race = race;
      this.animal_state = animal_state;
      this.father = father;
      this.mother = mother;
      this.herd_id = herd_id;
    }
  }
  