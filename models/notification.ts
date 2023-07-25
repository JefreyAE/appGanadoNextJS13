import Animal from "./animal";

export default class Notification {
  id: number;
  user_id: number;
  notification_date: string | null;
  notification_type: string | null;
  notification_state: string | null;
  description: string | null;
  code: number | null;
  animal: Animal | null
  created_at: string | null;
  updated_at: string | null;

  constructor(
    id: number,
    user_id: number,
    notification_date: string | null,
    notification_type: string | null,
    notification_state: string | null,
    description: string | null,
    code: number | null,
    animal: Animal | null,
    created_at: string | null,
    updated_at: string | null
  ) {
    this.id = id;
    this.user_id = user_id;
    this.notification_date = notification_date;
    this.notification_type = notification_type;
    this.notification_state = notification_state;
    this.description = description;
    this.code = code;
    this.animal = animal;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

  