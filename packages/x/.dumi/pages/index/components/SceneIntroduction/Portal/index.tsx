import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import useLocale from '../../../../../hooks/useLocale';
import Agent from './Agent';
import Prompt from './Prompt';
import Provider, { LOCALES } from './Provider';
import Sender from './Sender';
import StartPage from './StartPage';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

const mockSuccess = false;

const useStyle = createStyles(({ token, css }) => {
  return {
    container: css`
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      height: 100%;
      width: 100%;
      min-width: 500px;
      padding-inline: ${token.paddingXL * 2}px;
   `,
    bubble_list: css`
      flex: 1;
    `,
    placeholder_bubble: css`
      .ant-welcome {
        padding: 0;
        margin-bottom: ${token.marginSM}px;
      }

      .ant-welcome-title {
        font-size: 16px !important;
        font-weight: 500 !important;
        opacity: 0.9;
      }

      .ant-welcome-description {
        font-size: 12px;
        opacity: 0.65;
      }

      .ant-welcome-icon {
        img {
          transform: scale(1.2);
          margin-inline-end: 10px;
        }
      }

      .ant-bubble-content {
        overflow: hidden;
        background: linear-gradient(135deg, #ffffff26 14%, #ffffff0d 59%) !important;
        width: 100%;
        border-radius: 16px;
        padding: 24px;
      }

      .ant-prompts-content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      .ant-tag {
        background: linear-gradient(45deg, #ffffff33 0%, #ffffff00 100%);
        border: 1px solid #ffffff4d;
        border-radius: 4px;
        margin: 0;
        width: 18px;
        height: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .ant-prompts {
        padding: 0;
      }

      .ant-prompts-desc {
        line-height: 2 !important;
      }

      .ant-prompts-item {
        background: rgba(255, 255, 255, 0.05);
        padding: 16px;
        border: none;
        flex: 1;
        height: 100%;
      }
    `,
  };
});

const PortalScene: React.FC = () => {
  const { styles } = useStyle();
  const [locale] = useLocale(LOCALES);
  const [start, setStart] = useState<boolean>(true);
  const onSubmit = () => {
    setStart(false);
  };
  return (
    <Provider>
      <div className={styles.container}>
        {start ? (
          <>
            <StartPage />
            <Sender onSubmit={onSubmit} />
            <Prompt />
          </>
        ) : (
          <Agent />
        )}
      </div>
    </Provider>
  );
};

export default PortalScene;
