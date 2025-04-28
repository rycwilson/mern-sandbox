import { useState, createContext } from 'react';
import { useLoaderData } from 'react-router';
import { Outlet } from 'react-router';
import Wrapper from '../assets/wrappers/dashboard';
import { BigSidebar, Navbar, SmallSidebar } from '../components';

interface DashboardContextValue {
  user: { name: string, avatar?: string };
  showSidebar: boolean;
  toggleSidebar: () => void;
  logoutUser: () => Promise<void>;
}

export const DashboardContext = createContext<DashboardContextValue | null>(null);

function DashboardLayout() {

  const user = useLoaderData();
  console.log(user)

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    console.log('toggling sidebar')
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log('logout user')
  }

  return (
    <DashboardContext.Provider value={{ user, showSidebar, toggleSidebar, logoutUser }}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export default DashboardLayout;