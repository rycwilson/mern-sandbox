import { useContext } from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar';
import { DashboardContext } from '../pages/DashboardLayout';
import { FaXmark } from 'react-icons/fa6';
import NavLinks from './NavLinks'; // Assuming you have a NavLinks component for navigation links

const SmallSidebar = () => {
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error('SmallSidebar must be used within a DashboardContext.Provider');
  }
  const { showSidebar, toggleSidebar } = dashboardContext;

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? 'show-sidebar' : ''}`}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaXmark />
          </button>
          <header>
            <h2>Small Sidebar</h2>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar