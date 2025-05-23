export interface GuestType {
  id?: number;
  created_at?: string;
  fullName: string;
  email: string;
  nationalID?: string;
  nationality?: string;
  countryFlag?: string | null;
}
