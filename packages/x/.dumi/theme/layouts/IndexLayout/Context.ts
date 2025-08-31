import React from 'react';
export interface AgentContextProps {
  setIsOnAgent: React.Dispatch<React.SetStateAction<boolean>>;
  isOnAgent: boolean;
}
const data: AgentContextProps = {
  setIsOnAgent: () => {},
  isOnAgent: false,
};
export default React.createContext(data);
