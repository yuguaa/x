import { useXAgent, useXChat } from '@ant-design/x';

export interface AgentMessageSingleType {
  role: 'user' | 'ai' | 'chain';
  text: string;
}

export type AgentMessageType = AgentMessageSingleType[];

export default function useChain() {
  // =========================== Agent ============================
  const [agent] = useXAgent<AgentMessageType>({
    request: async ({ message = [] }, { onSuccess, onUpdate }) => {
      // Note: this is used for development usage.
      // You can realize with your own request logic.
      const sessionUrl = localStorage.getItem('api/session');
      console.log('sessionUrl', sessionUrl);
    },
  });

  // ============================ Chat ============================
  const chat = useXChat<AgentMessageType>({
    agent,
  });

  return {
    ...chat,
    loading: agent.isRequesting(),
  };
}
