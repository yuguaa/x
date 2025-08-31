import { createStyles } from 'antd-style';
import React, { useContext, useState } from 'react';
import Context from '../../../../../theme/layouts/IndexLayout/Context';
import Agent from './Agent';
import Prompt from './Prompt';
import Provider from './Provider';
import Sender from './Sender';
import StartPage from './StartPage';

const useStyle = createStyles(({ token, css }) => {
  return {
    container: css`
      display: flex;
      justify-content: space-around;
      box-sizing: border-box;
       align-items:center;
      flex-direction: column;
      height: 100%;
      width: 100%;
      min-width: 500px;
   `,
    startPage: css`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items:center;
    max-width: 1000px;
    padding-inline: ${token.paddingXL * 2}px;
   `,
  };
});

const PortalScene: React.FC = () => {
  const { styles } = useStyle();
  const { setIsOnAgent, isOnAgent } = useContext(Context);

  const [query, setQuery] = useState('');
  const onSubmit = (value: string) => {
    setQuery(value);
    setIsOnAgent(true);
  };
  return (
    <Provider>
      <div className={styles.container}>
        {!isOnAgent ? (
          <div className={styles.startPage}>
            <StartPage />
            <Sender onSubmit={onSubmit} />
            <Prompt />
          </div>
        ) : (
          <Agent query={query} />
        )}
      </div>
    </Provider>
  );
};

export default PortalScene;
