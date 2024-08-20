import { createBrowserRouter, Outlet } from "react-router-dom";
import ArticlePage from "../pages/articles";
import ArticlePreview from "../pages/articles/preview";

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
        element: <ArticlePreview />,
      },

    ]
  }
])

export default routes;