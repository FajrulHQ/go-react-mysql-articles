import { createBrowserRouter, Outlet } from "react-router-dom";
import ArticlePage from "../pages/articles";
import ArticlePreview from "../pages/articles/preview";
import ArticlePreviewDetail from "../pages/articles/preview/detail";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <ArticlePage />,
      },
      {
        path: 'preview',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ArticlePreview />,
          },
          {
            path: ':id',
            element: <ArticlePreviewDetail />
          }
        ]
      },

    ]
  }
])

export default routes;