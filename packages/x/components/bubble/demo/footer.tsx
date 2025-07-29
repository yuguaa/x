import { EditOutlined, RedoOutlined, ScissorOutlined, UserOutlined } from '@ant-design/icons';
import { Bubble } from '@ant-design/x';
import { Avatar, Flex, Space } from 'antd';
import React from 'react';

const App = () => (
  <Flex vertical gap="small">
    <Flex gap="small" wrap>
      <div style={{ width: '100%' }}>
        <Bubble
          content="外气泡尾外气泡尾"
          components={{
            header: 'footer',
            avatar: <Avatar icon={<UserOutlined />} />,
            footer: (
              <Space>
                <EditOutlined />
                <ScissorOutlined />
                <RedoOutlined />
              </Space>
            ),
          }}
        />
      </div>
    </Flex>
    <Flex gap="small" wrap>
      <div style={{ width: '100%' }}>
        <Bubble
          content="内气泡尾内气泡尾"
          placement="end"
          footerPlacement="inner-end"
          components={{
            header: 'footer',
            avatar: <Avatar icon={<UserOutlined />} />,
            footer: (
              <Space>
                <EditOutlined />
                <ScissorOutlined />
                <RedoOutlined />
              </Space>
            ),
          }}
        />
      </div>
    </Flex>
    <Flex gap="small" wrap>
      <div style={{ width: '100%' }}>
        <Bubble
          content="外气泡尾外气泡尾-右对齐"
          footerPlacement="outer-end"
          components={{
            header: 'footer',
            avatar: <Avatar icon={<UserOutlined />} />,
            footer: (
              <Space>
                <EditOutlined />
                <ScissorOutlined />
                <RedoOutlined />
              </Space>
            ),
          }}
        />
      </div>
    </Flex>
    <Flex gap="small" wrap>
      <div style={{ width: '100%' }}>
        <Bubble
          content="内气泡尾内气泡尾-左对齐"
          placement="end"
          footerPlacement="inner-start"
          components={{
            header: 'footer',
            avatar: <Avatar icon={<UserOutlined />} />,
            footer: (
              <Space>
                <EditOutlined />
                <ScissorOutlined />
                <RedoOutlined />
              </Space>
            ),
          }}
        />
      </div>
    </Flex>
  </Flex>
);

export default App;
