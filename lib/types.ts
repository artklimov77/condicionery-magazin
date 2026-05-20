export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  sort_order: number
}

export interface Product {
  id: string
  name: string
  slug: string
  brand: string
  category_id?: string
  category?: Category
  model_number?: string
  power_kw: number
  area_min?: number
  area_max: number
  energy_class: string
  noise_indoor_db?: number
  noise_outdoor_db?: number
  inverter: boolean
  wifi: boolean
  heating: boolean
  air_purifier: boolean
  smart_home: boolean
  price_unit: number
  price_install: number
  promo_price?: number
  available: boolean
  lead_days: number
  images: string[]
  description?: string
  specs: Record<string, string>
  is_featured: boolean
  is_new: boolean
  is_promo: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  source: 'catalog' | 'product' | 'quiz' | 'contacts'
  product_id?: string
  product_name?: string
  quiz_data?: QuizData
  customer_name: string
  customer_phone: string
  customer_email?: string
  comment?: string
  status: 'new' | 'in_progress' | 'done' | 'cancelled'
  created_at: string
}

export interface QuizData {
  room_type: string
  area_range: string
  budget_range: string
  priorities: string[]
}

export interface OrderFormData {
  customer_name: string
  customer_phone: string
  customer_email?: string
  comment?: string
}

export interface CatalogFilters {
  brand?: string
  category_id?: string
  area_max?: number
  price_min?: number
  price_max?: number
  inverter?: boolean
  wifi?: boolean
  heating?: boolean
}
