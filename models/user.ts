export default class User {
    id: number | null;
    name: string | null;
    surname: string | null;
    role: string | null;
    email: string ;
    password: string;
    contact_email: string | null;
    phone_number: string | null;
    avatar: string | null;
    state: string | null;
  
    constructor(id:number | null, name: string | null, email: string, password: string, contact_email: string | null, phone_number: string | null, avatar: string | null, surname: string | null, role: string | null, state: string | null) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.contact_email = contact_email;
      this.phone_number = phone_number;
      this.avatar = avatar;
      this.surname = surname;
      this.role = role;
      this.state = state;
    }
    
  }
  