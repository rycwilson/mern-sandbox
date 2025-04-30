import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { Outlet } from 'react-router';
import Wrapper from '../assets/wrappers/dashboard';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import { DashboardContext } from '../contexts';
import { toast } from 'react-toastify';

export default function DashboardLayout() {
  const user = useLoaderData();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await fetch('/api/v1/auth/logout');
    toast.success('Logged out successfully');
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