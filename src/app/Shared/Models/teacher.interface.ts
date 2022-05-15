export interface Teacher {
  name: string;
  surname: string;
  countryId: number;
  countryName?: string;
  urlSite?: string;
  urlSocial?: string;
  photo?: string;
  id: number;
  description?: string;
  formData: FormData;
}
