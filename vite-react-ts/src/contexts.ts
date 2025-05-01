import { createContext } from 'react';

interface DashboardContextValue {
  user: { firstName: string, lastName: string, email: string, role: string, fullName: string, avatar?: string };
  showSidebar: boolean;
  toggleSidebar: () => void;
  toggleModal: (content?: ModalContent) => void;
  logoutUser: () => Promise<void>;
}

export const DashboardContext = createContext<DashboardContextValue | null>(null);