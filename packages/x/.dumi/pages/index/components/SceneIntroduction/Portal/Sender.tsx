import { AntDesignOutlined } from '@ant-design/icons';
import { Sender } from '@ant-design/x';
import tokenData from '@ant-design/x/es/version/token.json';
import { Button, Dropdown, Flex, GetRef, MenuProps } from 'antd';
import { createStyles } from 'antd-style';
import React, { useRef, useState } from 'react';

export const useStyle = createStyles(({ css, token }) => {
  return {
    sender: css`
      background: linear-gradient(135deg, #ffffff26 14%, #ffffff0d 59%);
      position: relative;
      border: none;
      cursor: pointer;
      border-color:rgba(255,255,255,.1)!important;
      transition: all ${token.motionDurationMid} ${token.motionEaseInOut};
      :hover, :active,:focus-within {
        opacity: 0.85;
        border-color:rgba(255,255,255,.5)!important;
        box-shadow: 0 4px 12px 0 #bfcded33!important;
      }
      .ant-sender-input{
        caret-color:#fff!important;
      }
    `,
  };
});

const CustomizationSender: React.FC<{
  onSubmit: (text: string) => void;
}> = (props) => {
  const { styles } = useStyle();
  const senderRef = useRef<GetRef<typeof Sender>>(null);
  const [activeComponentsKey, setActiveComponentsKey] = useState('deep_search');
  const agentItemClick: MenuProps['onClick'] = (item) => {
    setActiveComponentsKey(item.key);
  };
  const componentsItems: MenuProps['items'] = [];
  console.log(tokenData);
  // Object.keys(AgentInfo).map((agent) => {
  //   const { icon, label } = AgentInfo[agent];
  //   return {
  //     key: agent,
  //     icon,
  //     label,
  //   };
  // });

  return (
    <Sender
      ref={senderRef}
      className={styles.sender}
      styles={{
        content: {
          paddingBlockEnd: 0,
        },
        input: {
          fontSize: 15,
        },
      }}
      autoSize={{ minRows: 2, maxRows: 2 }}
      onSubmit={(value) => {
        props.onSubmit(value);
        senderRef.current?.clear?.();
      }}
      suffix={false}
      footer={() => {
        return (
          <Flex justify="space-between" align="center">
            <Dropdown
              menu={{
                selectedKeys: [activeComponentsKey],
                onClick: agentItemClick,
                items: componentsItems,
              }}
            >
              <Button icon={<AntDesignOutlined />}>Components</Button>
            </Dropdown>
            <Button
              type="text"
              style={{ padding: 0 }}
              onClick={() => {}}
              icon={
                <img
                  alt="send"
                  loading="lazy"
                  src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*4e5sTY9lU3sAAAAAAAAAAAAADgCCAQ/original"
                />
              }
            />
          </Flex>
        );
      }}
    />
  );
};

export default CustomizationSender;
