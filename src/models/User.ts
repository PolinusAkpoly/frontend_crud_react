export interface User {
  first_name: string;
  last_name: string;
  email: string;
  roles?: Array<string>;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}
