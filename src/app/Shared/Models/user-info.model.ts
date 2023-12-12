export interface UserInfo {
  id: number;
  name: string;
  surname: string;
  telephone: string;
  email: string;
  role: string;
  password: string;
  doubleFactor: boolean;
  description: string;
  photo?: string;
  countryId: number;

  userPhoto?: FormData;
}
