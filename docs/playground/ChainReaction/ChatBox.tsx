import { UserOutlined } from '@ant-design/icons';
import { Bubble, Sender, Welcome } from '@ant-design/x';
import { Flex, type GetProp, theme } from 'antd';
import * as React from 'react';

const AI_ICON =
  'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp';

const roles: GetProp<typeof Bubble.List, 'roles'> = {
  ai: {
    placement: 'start',
    avatar: { src: AI_ICON },
    typing: { step: 5, interval: 20 },
    style: {
      maxWidth: 600,
    },
  },
  user: {
    placement: 'end',
    avatar: { icon: <UserOutlined />, style: { background: '#87d068' } },
  },
};

export interface ChatBoxProps {
  items: GetProp<typeof Bubble.List, 'items'>;
  onSubmit: (value: string) => void;
}

export default function ChatBox(props: ChatBoxProps) {
  const { items, onSubmit } = props;

  // =========================== Styles ===========================
  const { token } = theme.useToken();

  // =========================== Sender ===========================
  const [text, setText] = React.useState('');

  // =========================== Render ===========================
  return (
    <Flex
      vertical
      style={{ width: '100%', height: '100%', padding: token.padding }}
      align="stretch"
      gap={token.padding}
    >
      {!items.length ? (
        <div style={{ flex: 'auto' }}>
          <Welcome
            style={{
              backgroundImage: 'linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)',
              borderStartStartRadius: 4,
            }}
            icon={AI_ICON}
            title="Nice to meet you!"
            description="I'm your AI assistant. How can I help you today?"
          />
        </div>
      ) : (
        <Bubble.List style={{ flex: 'auto' }} items={items} roles={roles} />
      )}

      <Sender
        value={text}
        onChange={setText}
        onSubmit={(value) => {
          setText('');
          onSubmit(value);
        }}
      />
    </Flex>
  );
}
