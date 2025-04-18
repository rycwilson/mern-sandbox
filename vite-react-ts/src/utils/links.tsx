import { FaRegSquarePlus } from 'react-icons/fa6';
import { FaTableList } from 'react-icons/fa6';
import { FaRegCircleUser } from 'react-icons/fa6';

// note that a path of '/' would navigate to the root of the application
// the '.' path is equivalent to '/dashboard' in this context
const links = [
  { text: 'all widgets', path: '.', icon: <FaTableList /> },
  { text: 'add widget', path: 'add-widget', icon: <FaRegSquarePlus /> },
  { text: 'profile', path: 'profile', icon: <FaRegCircleUser /> },
];

export default links;