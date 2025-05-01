import { useContext } from 'react';
import NewWidget from '../components/NewWidget';
import { DashboardContext } from '../contexts';

export default function Widgets() {
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error('Widgets must be used within a DashboardContext.Provider');
  }
  const { toggleModal } = dashboardContext;
  
  return (
    <>
      <h4>Widgets</h4>
      <br />
      <button className="btn" onClick={() => toggleModal({ title: 'New Widget', body: <NewWidget /> })}>New Widget</button>
    </>
  )
}
