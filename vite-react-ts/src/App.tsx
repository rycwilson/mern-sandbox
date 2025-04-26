import { createBrowserRouter, RouterProvider } from 'react-router';
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

import { action as registerAction } from './pages/Register.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomeLayout,
    // element: <HomeLayout />,   => use if you need to pass props to the component
    errorElement: <Errors />,
    children: [
      { 
        index: true,
        Component: Landing,
      },
      {
        path: 'register',
        Component: Register,
        action: registerAction
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'dashboard',
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: AllWidgets,
          },
          {
            path: 'add-widget',
            Component: AddWidget,
          },
          {
            path: 'profile',
            Component: Profile,
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
