export interface CabinFormData {
  id?: number | string | null | undefined
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description?: string | null | undefined
  image?: File | FileList | string | null | undefined
}

