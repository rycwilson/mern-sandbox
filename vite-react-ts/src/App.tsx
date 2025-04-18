import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { 
  HomeLayout, 
  Landing, 
  Register, 
  Login, 
  DashboardLayout, 
  AllWidgets,
  AddWidget,
  Profile,
  Errors } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Errors />,
    children: [
      { 
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AllWidgets />,
          },
          {
            path: 'add-widget',
            element: <AddWidget />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <h1>Admin Page</h1>,
          }
        ]
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />
}

export default App;
