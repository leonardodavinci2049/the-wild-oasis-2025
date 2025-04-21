export interface CabinType {
  id?: number | null;
  created_at?: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description?: string | null | undefined
  image?: string | null;
}
