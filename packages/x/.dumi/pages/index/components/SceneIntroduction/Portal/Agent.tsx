import { createStyles } from 'antd-style';
import React from 'react';
import Sender from './Sender';

const useStyle = createStyles(({ token, css }) => {
  return {
    container: css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        `,
    messageList: css`
        flex:1
        `,
  };
});

const Agent: React.FC = () => {
  const { styles } = useStyle();
  return (
    <div className={styles.container}>
      <div className={styles.messageList}>消息</div>
      <Sender />
    </div>
  );
};

export default Agent;
