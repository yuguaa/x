import { Bubble, Sender, Welcome, useXAgent, useXChat } from '@ant-design/x';
import { Flex, type GetProp, Splitter, Typography, theme } from 'antd';
import { createStyles } from 'antd-style';
import * as React from 'react';
import ChatBox from './ChatBox';
import Preview from './Preview';

const useStyle = createStyles(({ css }) => {
  return {
    root: css`
      &,
      * {
        box-sizing: border-box;
      }
    `,
  };
});

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

interface AgentMessageSingleType {
  role: 'user' | 'ai' | 'chain';
  text: string;
}

type AgentMessageType = AgentMessageSingleType[];

function App() {
  // =========================== Agent ============================
  const [agent] = useXAgent<AgentMessageType>({
    request: async ({ message = [] }, { onSuccess, onUpdate }) => {
      const { text } = message[0];

      const rawTips = {
        role: 'ai',
        text: `Mock success. Starting mock plain of the request: ${text}`,
      } as const;

      onUpdate([rawTips]);

      await sleep();

      const mockChain = [
        {
          title: 'Search for the internet',
          description: 'Use `Browser` to search for the internet.',
        },
        {
          title: 'Create a new document',
          description: 'Create note book with `Notepad`.',
        },
        {
          title: 'Record the screen data',
          description: 'Use `Screen Recorder` to record the screen data.',
        },
        {
          title: 'Generate the report',
          description: 'Use `Excel` to generate the report.',
        },
        ...Array.from({ length: 5 }).map((_, index) => ({
          title: `Other Mock Step ${index + 1}`,
          description: `Description of mock step ${index + 1}`,
        })),
      ];

      for (let i = 0; i < mockChain.length; i++) {
        const currentList = mockChain.slice(0, i + 1);
        onUpdate([rawTips, { role: 'chain', text: JSON.stringify(currentList) }]);
        await sleep();
      }

      onSuccess([rawTips, { role: 'chain', text: JSON.stringify(mockChain) }]);
    },
  });

  // ============================ Chat ============================
  const { onRequest, messages } = useXChat<AgentMessageType>({
    agent,
  });

  // =========================== Style ============================
  const { token } = theme.useToken();

  const { styles } = useStyle();

  // ============================ Data ============================
  const onChatSubmit = (text: string) => {
    onRequest([{ text, role: 'user' }]);
  };

  const [items, lastChainTask] = React.useMemo(() => {
    const nextItems: GetProp<typeof Bubble.List, 'items'> = [];
    let lastChainTask: {
      title: string;
      description: string;
    };

    for (const { id, message } of messages) {
      message.forEach((msg, index) => {
        const item = {
          key: `${id}_${index}`,
          role: msg.role,
          content: msg.text,
        };

        if (item.role === 'chain') {
          const data = JSON.parse(item.content);
          lastChainTask = data[data.length - 1];
        }

        nextItems.push(item);
      });
    }

    return [nextItems, lastChainTask] as const;
  }, [messages]);

  // =========================== Render ===========================
  return (
    <Splitter style={{ height: 722 }} className={styles.root}>
      <Splitter.Panel>
        <ChatBox messages={items} onSubmit={onChatSubmit} />
      </Splitter.Panel>
      <Splitter.Panel defaultSize={500}>
        <Flex
          vertical
          style={{ width: '100%', height: '100%', padding: token.padding }}
          align="stretch"
        >
          <Preview task={lastChainTask} />
        </Flex>
      </Splitter.Panel>
    </Splitter>
  );
}

export default App;
