import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import { DashboardContext } from '../pages/DashboardLayout';

const NavLinks = ({ isBigSidebar = false }: { isBigSidebar?: boolean }) => {
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error('NavLinks must be used within a DashboardContext.Provider');
  }
  const { toggleSidebar, user } = dashboardContext;

  const handleNavLinkClick = () => {
    if (!isBigSidebar) {
      toggleSidebar();
    }
  };

  return (
    <div className="nav-links">
      {links.map(link => {
        const { text, path, icon } = link;
        return (
          <NavLink to={path} key={text} className="nav-link" onClick={handleNavLinkClick} end>
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}  
    </div>
  )
}

export default NavLinks;