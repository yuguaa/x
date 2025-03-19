import { Bubble, Sender, Welcome, useXAgent, useXChat } from '@ant-design/x';
import { Flex, type GetProp, Splitter, theme } from 'antd';
import { createStyles } from 'antd-style';
import * as React from 'react';
import ChatBox from './ChatBox';

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

function App() {
  // =========================== Agent ============================
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess }) => {
      await sleep();

      onSuccess(`Mock success return. You said: ${message}`);
    },
  });

  // ============================ Chat ============================
  const { onRequest, messages } = useXChat({
    agent,
  });

  // =========================== Style ============================
  const { token } = theme.useToken();

  const { styles } = useStyle();

  // ============================ Data ============================
  const onChatSubmit = (text: string) => {
    onRequest(text);
  };

  console.log(messages);

  // =========================== Render ===========================
  return (
    <Splitter style={{ height: '100%', minHeight: 722 }} className={styles.root}>
      <Splitter.Panel>
        <ChatBox
          items={messages.map(({ id, message, status }) => ({
            key: id,
            loading: status === 'loading',
            role: status === 'local' ? 'user' : 'ai',
            content: message,
          }))}
          onSubmit={onChatSubmit}
        />
      </Splitter.Panel>
      <Splitter.Panel defaultSize={500}>
        <Flex
          vertical
          style={{ width: '100%', height: '100%', padding: token.padding }}
          align="stretch"
        >
          2333
        </Flex>
      </Splitter.Panel>
    </Splitter>
  );
}

export default App;
