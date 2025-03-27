import { useXAgent, useXChat, XRequest } from '@ant-design/x';

export interface AgentMessageSingleType {
  role: 'user' | 'ai' | 'chain';
  text: string;
  files?: File[];
}

export type AgentMessageType = AgentMessageSingleType[];

// Used for chaining request
const sharedRequest = XRequest({
  baseURL: '-',
});

export default function useChain() {
  // =========================== Agent ============================
  const [agent] = useXAgent<AgentMessageType>({
    request: async ({ message = [] }, { onSuccess, onUpdate }) => {
      // Note: this is used for development usage.
      // You can realize with your own request logic.
      const sessionUrl = localStorage.getItem('api/session');
      const diagnosticsUrl = localStorage.getItem('api/diagnostics');
      console.log('sessionUrl', sessionUrl);

      if (!sessionUrl || !diagnosticsUrl) {
        return;
      }

      // Start Chain Reaction
      const [msg] = message;

      const fetchResult = await fetch(sessionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: msg.text,
          // llmProvider: 'openai',
          // llmModelName: 'gpt-4o',
          llmProvider: 'alibaba',
          llmModelName: 'qwen-plus',
        }),
      });

      const resultJSON = (await fetchResult.json()) as {
        message: string;
        task_id: string;
      };
      console.log('resultJSON', resultJSON);

      let prevRetStr: string = '';

      // Loop call
      setInterval(async () => {
        sharedRequest.call(
          {},
          {
            baseURL: diagnosticsUrl!,
            method: 'GET',
          },
          {
            onUpdate(chunk) {
              const nextRetStr = JSON.stringify(chunk);
              if (prevRetStr !== nextRetStr) {
                prevRetStr = nextRetStr;
                console.log('Info:', chunk);
              }
              // console.log('onUpdate', chunk);
            },
            onSuccess(chunk) {
              // console.log('onSuccess', chunk);
            },
            onError(error) {
              // console.log('onError', error);
            },
          },
        );
      }, 100);

      // Get status
      // sharedRequest.call(
      //   {
      //     task_id: resultJSON.task_id,
      //   },
      //   {
      //     baseURL: diagnosticsUrl!,
      //     method: 'GET',
      //   },
      //   {
      //     onUpdate(chunk) {
      //       console.log('onUpdate', chunk);
      //     },
      //     onSuccess(chunk) {
      //       console.log('onSuccess', chunk);
      //     },
      //     onError(error) {
      //       console.log('onError', error);
      //     },
      //   },
      // );
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
