import { AntDesignOutlined, EditOutlined } from '@ant-design/icons';
import { Bubble } from '@ant-design/x';
import { Avatar, Space } from 'antd';
import React from 'react';

const App = () => (
  <Bubble
    content="Hello World"
    components={{
      header: <h5>Ant Design X</h5>,
      footer: (
        <Space>
          <EditOutlined />
        </Space>
      ),
      avatar: <Avatar icon={<AntDesignOutlined />} />,
    }}
  />
);

export default App;
