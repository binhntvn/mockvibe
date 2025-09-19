export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      order_items: {
        Row: {
          id: number
          order_id: number | null
          price: number
          product_id: number | null
          quantity: number
        }
        Insert: {
          id?: number
          order_id?: number | null
          price: number
          product_id?: number | null
          quantity: number
        }
        Update: {
          id?: number
          order_id?: number | null
          price?: number
          product_id?: number | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: number
          shipping_address: Json | null
          status: string
          total_amount: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          shipping_address?: Json | null
          status?: string
          total_amount: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          shipping_address?: Json | null
          status?: string
          total_amount?: number
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          name: string
          price: number
          stock_quantity: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name: string
          price: number
          stock_quantity?: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name?: string
          price?: number
          stock_quantity?: number
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string | null
          id: number
          product_id: number | null
          rating: number
          review_text: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          product_id?: number | null
          rating: number
          review_text?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          product_id?: number | null
          rating?: number
          review_text?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
