import { useContext } from 'react';
import Wrapper from '../assets/wrappers/navbar';
import { FaAlignJustify } from 'react-icons/fa6';
import { DashboardContext } from '../pages/DashboardLayout';
import LogoutContainer from './LogoutContainer'; // Assuming you have a LogoutContainer component

const Navbar = () => {
  const dashboardContext = useContext(DashboardContext);

  if (!dashboardContext) {
    throw new Error('Navbar must be used within a DashboardContext.Provider');
  }

  const { toggleSidebar } = dashboardContext;

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignJustify />
        </button>
        <div>
          <h4>MyApp</h4>
        </div>
        <div className="btn-container"> 
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar;