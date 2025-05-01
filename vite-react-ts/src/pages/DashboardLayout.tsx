import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { Outlet } from 'react-router';
import Wrapper from '../assets/wrappers/dashboard';
import { BigSidebar, Navbar, SmallSidebar, Modal } from '../components';
import { DashboardContext } from '../contexts';
import { toast } from 'react-toastify';

export default function DashboardLayout() {
  const user = useLoaderData();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; content: ModalContent }>({ open: false, content: null });

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleModal = (content: ModalContent = null) => {
    console.log('toggling modal', content);
    setModal({ open: !modal.open, content });
  }

  const logoutUser = async () => {
    navigate('/');
    await fetch('/api/v1/auth/logout');
    toast.success('Logged out successfully');
  }

  const handleModalClosed = () => {
    console.log('modal did close')
  };

  return (
    <DashboardContext.Provider value={{ user, showSidebar, toggleSidebar, toggleModal, logoutUser }}>
      <Modal isOpen={modal.open} content={modal.content} onClose={handleModalClosed}></Modal>
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