export default class Animal {
    id: number;
    nickname: string;
    certification_name: string;
    registration_number: string;
    code: string;
    birth_weight: number;
    birth_date: string;
    sex: string;
    father_id: number;
    mother_id: number;
    race: string;
    animal_state: string | null;
    father: Animal | null;
    mother: Animal | null;
  
    constructor(
      id: number,
      nickname: string,
      certification_name: string,
      registration_number: string,
      code: string,
      birth_weight: number,
      birth_date: string,
      sex: string,
      father_id: number,
      mother_id: number,
      race: string,
      animal_state: string | null,
      father: Animal | null,
      mother: Animal | null,
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
    }
  }
  