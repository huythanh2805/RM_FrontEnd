
import Dashboard from '@/pages/dashboard/Dashboard';
import About from '@/pages/home/About';
import Home from '@/pages/home/Home';
import { createBrowserRouter} from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    // loader: rootLoader,
    children: [
      {
        path: "about",
        element: <About/>,
        // loader: teamLoader,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    // loader: teamLoader,
  },
]);

export default router