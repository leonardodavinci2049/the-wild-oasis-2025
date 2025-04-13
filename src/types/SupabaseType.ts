export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface DatabaseType {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: number;
          created_at: string;
          startDate: string;
          endDate: string;
          numNights: number;
          numGuests: number;
          cabinId: number;
          guestId: number;
          totalPrice: number;
          observations: string | null;
          isPaid: boolean;
          hasBreakfast: boolean;
          status: "unconfirmed" | "checked-in" | "checked-out";
        };
        Insert: {
          created_at?: string;
          startDate: string;
          endDate: string;
          numNights: number;
          numGuests: number;
          cabinId: number;
          guestId: number;
          totalPrice: number;
          observations?: string | null;
          isPaid?: boolean;
          hasBreakfast?: boolean;
          status?: "unconfirmed" | "checked-in" | "checked-out";
        };
        Update: {
          created_at?: string;
          startDate?: string;
          endDate?: string;
          numNights?: number;
          numGuests?: number;
          cabinId?: number;
          guestId?: number;
          totalPrice?: number;
          observations?: string | null;
          isPaid?: boolean;
          hasBreakfast?: boolean;
          status?: "unconfirmed" | "checked-in" | "checked-out";
        };
      };
      cabins: {
        Row: {
          id: number;
          created_at: string;
          name: string;
          maxCapacity: number;
          regularPrice: number;
          discount: number;
          description: string | null;
          image: string | null;
        };
        Insert: {
          created_at?: string;
          name: string;
          maxCapacity: number;
          regularPrice: number;
          discount: number;
          description?: string | null;
          image?: string | null;
        };
        Update: {
          created_at?: string;
          name?: string;
          maxCapacity?: number;
          regularPrice?: number;
          discount?: number;
          description?: string | null;
          image?: string | null;
        };
      };
      guests: {
        Row: {
          id: number;
          created_at: string;
          fullName: string;
          email: string;
          nationality: string | null;
          countryFlag: string | null;
          nationalID: string | null;
        };
        Insert: {
          created_at?: string;
          fullName: string;
          email: string;
          nationality?: string | null;
          countryFlag?: string | null;
          nationalID?: string | null;
        };
        Update: {
          created_at?: string;
          fullName?: string;
          email?: string;
          nationality?: string | null;
          countryFlag?: string | null;
          nationalID?: string | null;
        };
      };
      // Adicione outras tabelas conforme necessário
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};
