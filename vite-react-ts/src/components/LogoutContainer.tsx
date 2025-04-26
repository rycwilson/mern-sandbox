import { useContext, useEffect } from 'react';
import { FaRegCircleUser, FaCaretDown } from 'react-icons/fa6';
import Wrapper from '../assets/wrappers/logout-container';
import { useState } from 'react';
import { DashboardContext } from '../pages/DashboardLayout';

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.logout-btn') && !target.closest('.dropdown')) {
        setShowLogout(false);
      }
    };

    if (showLogout) {
      document.body.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showLogout])

  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error('LogoutContainer must be used within a DashboardContext.Provider');
  }
  const { user, logoutUser } = dashboardContext;

  const handleClick = () => {
    setShowLogout(!showLogout);
  };

  return (
    <Wrapper>
      <button
        type='button'
        className='btn logout-btn'
        onClick={handleClick}
      >
        {user.avatar ? (
          <img src={user.avatar} alt='avatar' className='img' />
        ) : (
          <FaRegCircleUser />
        )}

        {user.name}
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showLogout ? 'show-dropdown' : ''}`}>
        <button type='button' className='dropdown-btn' onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;