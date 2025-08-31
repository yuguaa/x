import React from 'react';
import Context, { type AgentContextProps } from './Context';

const Provider: React.FC<{
  children: React.ReactNode;
  agentInfo: AgentContextProps;
}> = (props) => {
  return (
    <Context.Provider
      value={{
        ...props.agentInfo,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
