export interface ArticleType {
  id?: number
  title?: string
  content?: string
  category?: string
  status?: 'publish' | 'draft' | 'trash'
  created_at?: string
  edited_at?: string
}