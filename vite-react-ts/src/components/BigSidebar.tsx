import { useContext } from 'react';
import Wrapper from '../assets/wrappers/big-sidebar';
import NavLinks from './NavLinks';
import { DashboardContext } from '../contexts';

export default function BigSidebar() {
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error('BigSidebar must be used within a DashboardContext.Provider');
  }
  const { showSidebar, user } = dashboardContext;

  return (
    <Wrapper>
      <div className={`sidebar-container ${!showSidebar ? 'show-sidebar' : ''}`}>
        <div className="content">
          <header>
            <h4>Big Sidebar</h4>
          </header>
          {/* note that the prop will default to a `true` value simply by being present */}
          <NavLinks isBigSidebar/>
        </div>
      </div>
    </Wrapper>
  )
};