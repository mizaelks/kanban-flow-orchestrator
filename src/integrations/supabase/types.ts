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
      api_logs: {
        Row: {
          created_at: string | null
          id: string
          ip: string | null
          method: string
          path: string
          token_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip?: string | null
          method: string
          path: string
          token_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip?: string | null
          method?: string
          path?: string
          token_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_logs_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "api_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      api_tokens: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          token: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          token: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          token?: string
        }
        Relationships: []
      }
      funnels: {
        Row: {
          created_at: string | null
          description: string | null
          funnel_type: string
          id: string
          is_shared: boolean | null
          name: string
          order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          funnel_type?: string
          id?: string
          is_shared?: boolean | null
          name: string
          order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          funnel_type?: string
          id?: string
          is_shared?: boolean | null
          name?: string
          order?: number | null
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          archived: boolean
          archived_at: string | null
          client: string | null
          company: string | null
          created_at: string | null
          custom_fields: Json | null
          email: string | null
          funnel_id: string | null
          id: string
          last_stage_change_at: string | null
          loss_reason: string | null
          phone: string | null
          required_tasks_completed: Json | null
          source_opportunity_id: string | null
          stage_id: string | null
          title: string
          user_id: string
          value: number | null
          win_reason: string | null
        }
        Insert: {
          archived?: boolean
          archived_at?: string | null
          client?: string | null
          company?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          funnel_id?: string | null
          id?: string
          last_stage_change_at?: string | null
          loss_reason?: string | null
          phone?: string | null
          required_tasks_completed?: Json | null
          source_opportunity_id?: string | null
          stage_id?: string | null
          title: string
          user_id: string
          value?: number | null
          win_reason?: string | null
        }
        Update: {
          archived?: boolean
          archived_at?: string | null
          client?: string | null
          company?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          funnel_id?: string | null
          id?: string
          last_stage_change_at?: string | null
          loss_reason?: string | null
          phone?: string | null
          required_tasks_completed?: Json | null
          source_opportunity_id?: string | null
          stage_id?: string | null
          title?: string
          user_id?: string
          value?: number | null
          win_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_source_opportunity_id_fkey"
            columns: ["source_opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "stages"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunity_stage_history: {
        Row: {
          from_stage_id: string | null
          id: string
          moved_at: string
          opportunity_id: string
          to_stage_id: string
          user_id: string | null
        }
        Insert: {
          from_stage_id?: string | null
          id?: string
          moved_at?: string
          opportunity_id: string
          to_stage_id: string
          user_id?: string | null
        }
        Update: {
          from_stage_id?: string | null
          id?: string
          moved_at?: string
          opportunity_id?: string
          to_stage_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunity_stage_history_from_stage_id_fkey"
            columns: ["from_stage_id"]
            isOneToOne: false
            referencedRelation: "stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunity_stage_history_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunity_stage_history_to_stage_id_fkey"
            columns: ["to_stage_id"]
            isOneToOne: false
            referencedRelation: "stages"
            referencedColumns: ["id"]
          },
        ]
      }
      product_suggestions: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          price: number | null
          updated_at: string
          usage_count: number
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          price?: number | null
          updated_at?: string
          usage_count?: number
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          price?: number | null
          updated_at?: string
          usage_count?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      required_fields: {
        Row: {
          created_at: string
          id: string
          is_required: boolean
          name: string
          options: string[] | null
          stage_id: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_required?: boolean
          name: string
          options?: string[] | null
          stage_id: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_required?: boolean
          name?: string
          options?: string[] | null
          stage_id?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "required_fields_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "stages"
            referencedColumns: ["id"]
          },
        ]
      }
      required_tasks: {
        Row: {
          created_at: string
          default_duration: number | null
          description: string | null
          id: string
          is_required: boolean
          name: string
          stage_id: string
          template_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_duration?: number | null
          description?: string | null
          id?: string
          is_required?: boolean
          name: string
          stage_id: string
          template_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_duration?: number | null
          description?: string | null
          id?: string
          is_required?: boolean
          name?: string
          stage_id?: string
          template_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "required_tasks_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "stages"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          admin_access: boolean | null
          created_at: string | null
          description: string | null
          id: string
          manager_access: boolean | null
          permission_id: string
          permission_name: string
          updated_at: string | null
          user_access: boolean | null
        }
        Insert: {
          admin_access?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          manager_access?: boolean | null
          permission_id: string
          permission_name: string
          updated_at?: string | null
          user_access?: boolean | null
        }
        Update: {
          admin_access?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          manager_access?: boolean | null
          permission_id?: string
          permission_name?: string
          updated_at?: string | null
          user_access?: boolean | null
        }
        Relationships: []
      }
      scheduled_actions: {
        Row: {
          action_config: Json
          action_type: string
          created_at: string | null
          id: string
          opportunity_id: string | null
          scheduled_datetime: string
          status: string
          template_id: string | null
        }
        Insert: {
          action_config?: Json
          action_type: string
          created_at?: string | null
          id?: string
          opportunity_id?: string | null
          scheduled_datetime: string
          status?: string
          template_id?: string | null
        }
        Update: {
          action_config?: Json
          action_type?: string
          created_at?: string | null
          id?: string
          opportunity_id?: string | null
          scheduled_datetime?: string
          status?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_actions_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_actions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "webhook_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      stages: {
        Row: {
          alert_config: Json | null
          color: string | null
          created_at: string | null
          description: string | null
          funnel_id: string | null
          id: string
          is_loss_stage: boolean | null
          is_win_stage: boolean | null
          loss_reason_required: boolean | null
          loss_reasons: string[] | null
          migrate_config: Json | null
          name: string
          order: number | null
          win_reason_required: boolean | null
          win_reasons: string[] | null
        }
        Insert: {
          alert_config?: Json | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          funnel_id?: string | null
          id?: string
          is_loss_stage?: boolean | null
          is_win_stage?: boolean | null
          loss_reason_required?: boolean | null
          loss_reasons?: string[] | null
          migrate_config?: Json | null
          name: string
          order?: number | null
          win_reason_required?: boolean | null
          win_reasons?: string[] | null
        }
        Update: {
          alert_config?: Json | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          funnel_id?: string | null
          id?: string
          is_loss_stage?: boolean | null
          is_win_stage?: boolean | null
          loss_reason_required?: boolean | null
          loss_reasons?: string[] | null
          migrate_config?: Json | null
          name?: string
          order?: number | null
          win_reason_required?: boolean | null
          win_reasons?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "stages_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_templates: {
        Row: {
          created_at: string
          description: string | null
          event: string
          id: string
          name: string
          payload: string
          target_type: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event: string
          id?: string
          name: string
          payload: string
          target_type: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event?: string
          id?: string
          name?: string
          payload?: string
          target_type?: string
          url?: string
        }
        Relationships: []
      }
      webhooks: {
        Row: {
          created_at: string | null
          event: string
          id: string
          target_id: string
          target_type: string
          url: string
        }
        Insert: {
          created_at?: string | null
          event: string
          id?: string
          target_id: string
          target_type: string
          url: string
        }
        Update: {
          created_at?: string | null
          event?: string
          id?: string
          target_id?: string
          target_type?: string
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_view_opportunity: {
        Args: {
          opportunity_user_id: string
          opportunity_funnel_id: string
          current_user_id: string
        }
        Returns: boolean
      }
      create_webhook_template: {
        Args: {
          p_name: string
          p_description: string
          p_url: string
          p_target_type: string
          p_event: string
          p_payload: string
        }
        Returns: {
          created_at: string
          description: string | null
          event: string
          id: string
          name: string
          payload: string
          target_type: string
          url: string
        }
      }
      delete_webhook_template: {
        Args: { template_id: string }
        Returns: undefined
      }
      get_webhook_template_by_id: {
        Args: { template_id: string }
        Returns: {
          created_at: string
          description: string | null
          event: string
          id: string
          name: string
          payload: string
          target_type: string
          url: string
        }
      }
      get_webhook_templates: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          description: string | null
          event: string
          id: string
          name: string
          payload: string
          target_type: string
          url: string
        }[]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      increment_product_usage: {
        Args: { product_name: string }
        Returns: undefined
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
      is_funnel_shared: {
        Args: { funnel_id: string }
        Returns: boolean
      }
      is_opportunity_owner: {
        Args: { opportunity_id: string }
        Returns: boolean
      }
      update_webhook_template: {
        Args: {
          p_id: string
          p_name?: string
          p_description?: string
          p_url?: string
          p_target_type?: string
          p_event?: string
          p_payload?: string
        }
        Returns: {
          created_at: string
          description: string | null
          event: string
          id: string
          name: string
          payload: string
          target_type: string
          url: string
        }
      }
      user_has_funnel_access: {
        Args: { funnel_id: string; user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "manager" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "manager", "user"],
    },
  },
} as const
