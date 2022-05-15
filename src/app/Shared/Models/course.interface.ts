export interface Course {
  id: number;
  name: string;
  teacherId: number;
  teacherName?: string;
  countryName?: String;
  technologyName?: String;
  technologyDetailsName?:String;
  url: string;
  technologyId: number;
  technologyDetailsId: number;
  description: string;
  searchKeywords: string;
  photo: string;
  teacherDescription?: string;
  formData: FormData;
}
