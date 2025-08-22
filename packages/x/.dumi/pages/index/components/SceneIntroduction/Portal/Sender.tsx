import { Sender, type SenderProps } from '@ant-design/x';
import { Button } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';

export const useStyle = createStyles(({ css, token }) => {
  return {
    sender: css`
      background: linear-gradient(135deg, #ffffff26 14%, #ffffff0d 59%);
      position: relative;
      border: none;
      cursor: pointer;
      transition: all ${token.motionDurationMid} ${token.motionEaseInOut};
      :hover, :active,:focus-within {
        opacity: 0.85;
        box-shadow: 0 4px 12px 0 #bfcded33!important;
      }
    `,
  };
});

const CustomizationSender: React.FC<SenderProps> = (props) => {
  const { styles } = useStyle();
  return (
    <Sender
      className={styles.sender}
      styles={{
        input: {
          fontSize: 18,
        },
      }}
      autoSize={{ minRows: 3, maxRows: 6 }}
      suffix={() => {
        return (
          <Button
            type="text"
            style={{ padding: 0 }}
            onClick={() => props?.onSubmit?.(props.value!)}
            icon={
              <img
                alt="send"
                loading="lazy"
                src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*4e5sTY9lU3sAAAAAAAAAAAAADgCCAQ/original"
              />
            }
          />
        );
      }}
      {...props}
    />
  );
};

export default CustomizationSender;
