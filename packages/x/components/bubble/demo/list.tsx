import {
  AntDesignOutlined,
  CheckOutlined,
  CopyOutlined,
  EditOutlined,
  LinkOutlined,
  RedoOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Actions, Bubble } from '@ant-design/x';
import type { BubbleData, BubbleListProps } from '@ant-design/x/es/bubble';
import XMarkdown from '@ant-design/x-markdown';
import type { GetRef } from 'antd';
import { Avatar, Button, Divider, Flex, Typography } from 'antd';
import React, { useCallback, useEffect } from 'react';

const actionItems = [
  {
    key: 'retry',
    icon: <RedoOutlined />,
    label: 'Retry',
  },
  {
    key: 'copy',
    icon: <CopyOutlined />,
    label: 'Copy',
  },
};

const rolesAsFunction = (bubbleData: BubbleProps, index: number) => {
  const RenderIndex: BubbleProps['messageRender'] = (content) => (
    <Flex>
      #{index}: {content}
    </Flex>
  );
  switch (bubbleData.role) {
    case 'ai':
      return {
        placement: 'start' as const,
        avatar: { icon: <UserOutlined />, style: { background: '#fde3cf' } },
        typing: { step: 5, interval: 20 },
        style: {
          maxWidth: 600,
        },
        messageRender: RenderIndex,
      };
    case 'user':
      return {
        placement: 'end' as const,
        avatar: { icon: <UserOutlined />, style: { background: '#87d068' } },
        messageRender: RenderIndex,
      };
    default:
      return { messageRender: RenderIndex };
  }
};

const App = () => {
  const listRef = React.useRef<GetRef<typeof Bubble.List>>(null);

  return (
    <Flex vertical gap="small">
      <Flex gap="small" justify="space-between">
        <Flex gap="small">
          <Button
            type="primary"
            onClick={() => {
              setCount((i) => i + 1);
            }}
          >
            Add Bubble
          </Button>

          <Button
            onClick={() => {
              listRef.current?.scrollTo({ key: items[1].key, block: 'nearest' });
            }}
          >
            Scroll To Second
          </Button>
        </Flex>
      </Flex>

      <Bubble.List
        ref={listRef}
        style={{ maxHeight: 300 }}
        role={memoRole}
        items={items}
        onScroll={(e) => {
          console.log('scroll', (e.target as any).scrollTop);
        }}
      />
    </Flex>
  );
};

export default App;
