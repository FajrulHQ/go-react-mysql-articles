import { create } from "zustand"
import { ArticleType } from "../pages/articles/type"

interface State {
  selected_tab: ArticleType['status']
  articles: ArticleType[]
  article: ArticleType
  modal?: 'add' | 'edit'
}

interface Action {
  setSelectedTab: (selected_tab: State['selected_tab']) => void
  setArticles: (articles: State['articles']) => void
  setArticle: (articles: State['article']) => void
  onModal: (modal: State['modal']) => void
}

export const useArticleStore = create<State & Action>(set => ({
  selected_tab: "publish",
  articles: [],
  article: {},
  setSelectedTab: (selected_tab) => set(() => ({ selected_tab })),
  setArticles: (articles) => set(() => ({ articles })),
  setArticle: (article) => set(() => ({ article })),
  onModal: (modal) => set(() => ({ modal }))
}))