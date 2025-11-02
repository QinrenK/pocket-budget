/**
 * Database Types
 * These should be generated from Supabase schema using:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
 * 
 * For now, we'll define them manually based on our schema
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          user_id: string;
          display_name: string | null;
          currency: 'CAD' | 'USD' | 'CNY';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          display_name?: string | null;
          currency?: 'CAD' | 'USD' | 'CNY';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          display_name?: string | null;
          currency?: 'CAD' | 'USD' | 'CNY';
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: number;
          user_id: string;
          name: string;
          keywords_en: string[];
          keywords_zh: string[];
          icon: string;
          color: string;
          is_system: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          name: string;
          keywords_en?: string[];
          keywords_zh?: string[];
          icon?: string;
          color?: string;
          is_system?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          name?: string;
          keywords_en?: string[];
          keywords_zh?: string[];
          icon?: string;
          color?: string;
          is_system?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      vendor_rules: {
        Row: {
          id: number;
          user_id: string;
          vendor: string;
          category_id: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          vendor: string;
          category_id?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          vendor?: string;
          category_id?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: number;
          user_id: string;
          ts: string;
          source: 'text' | 'receipt' | null;
          raw_text: string | null;
          amount: number;
          items: Json;
          category_id: number | null;
          vendor: string | null;
          note: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          ts?: string;
          source?: 'text' | 'receipt' | null;
          raw_text?: string | null;
          amount: number;
          items?: Json;
          category_id?: number | null;
          vendor?: string | null;
          note?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          ts?: string;
          source?: 'text' | 'receipt' | null;
          raw_text?: string | null;
          amount?: number;
          items?: Json;
          category_id?: number | null;
          vendor?: string | null;
          note?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      budgets: {
        Row: {
          id: number;
          user_id: string;
          month: string;
          category_id: number | null;
          amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          month: string;
          category_id?: number | null;
          amount: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          month?: string;
          category_id?: number | null;
          amount?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      seed_user_categories: {
        Args: { target_user_id: string };
        Returns: void;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

