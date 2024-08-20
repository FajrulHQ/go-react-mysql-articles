import { RouterProvider } from 'react-router-dom';
import ArticlePage from './articles';
import routes from '../routes';

function App() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
