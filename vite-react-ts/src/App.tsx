import { createBrowserRouter, RouterProvider } from 'react-router';
import { 
  HomeLayout, 
  Landing, 
  Register, 
  Login, 
  DashboardLayout, 
  Widgets,
  AddWidget,
  Profile,
  Errors } from './pages';

import { registerAction, loginAction } from './actions';
import { dashboardLoader } from './loaders';

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
        action: loginAction
      },
      {
        path: 'dashboard',
        Component: DashboardLayout,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            Component: Widgets,
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
