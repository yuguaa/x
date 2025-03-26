import { CloudUploadOutlined, LinkOutlined, UserOutlined } from '@ant-design/icons';
import {
  Attachments,
  AttachmentsProps,
  Bubble,
  Sender,
  ThoughtChain,
  Welcome,
} from '@ant-design/x';
import { Badge, Button, Flex, type GetProp, GetRef, theme } from 'antd';
import * as React from 'react';

const AI_ICON =
  'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp';

const roles: GetProp<typeof Bubble.List, 'roles'> = {
  user: {
    placement: 'end',
    avatar: { icon: <UserOutlined />, style: { background: '#87d068' } },
    variant: 'outlined',
  },
  ai: {
    placement: 'start',
    avatar: { src: AI_ICON },
    typing: { step: 5, interval: 20 },
  },
  chain: {
    placement: 'start',
    variant: 'borderless',
    messageRender: (text: string) => {
      const data = JSON.parse(text);
      return <ThoughtChain items={data} />;
    },
  },
};

export interface ChatBoxProps {
  messages: GetProp<typeof Bubble.List, 'items'>;
  onSubmit: (value: string, files: File[]) => void;
}

export default function ChatBox(props: ChatBoxProps) {
  const { messages, onSubmit } = props;

  // =========================== Styles ===========================
  const { token } = theme.useToken();

  // ============================ File ============================
  const senderRef = React.useRef<GetRef<typeof Sender>>(null);

  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = React.useState<GetProp<AttachmentsProps, 'items'>>([]);

  // =========================== Sender ===========================
  const [text, setText] = React.useState('');

  // =========================== Render ===========================
  // >>>>> Header
  const senderHeader = (
    <Sender.Header
      title="Attachments"
      open={open}
      onOpenChange={setOpen}
      styles={{
        content: {
          padding: 0,
        },
      }}
    >
      <Attachments
        // Mock not real upload file
        beforeUpload={() => false}
        items={files}
        onChange={({ fileList }) => setFiles(fileList)}
        placeholder={(type) =>
          type === 'drop'
            ? {
                title: 'Drop file here',
              }
            : {
                icon: <CloudUploadOutlined />,
                title: 'Upload files',
                description: 'Click or drag files to this area to upload',
              }
        }
        getDropContainer={() => senderRef.current?.nativeElement}
      />
    </Sender.Header>
  );

  // >>>>> Content
  return (
    <Flex
      vertical
      style={{ width: '100%', height: '100%', padding: token.padding }}
      align="stretch"
      gap={token.padding}
    >
      {!messages.length ? (
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
        <Bubble.List style={{ flex: 'auto', overflowY: 'auto' }} items={messages} roles={roles} />
      )}

      <Sender
        header={senderHeader}
        prefix={
          <Badge dot={files.length > 0 && !open}>
            <Button onClick={() => setOpen(!open)} icon={<LinkOutlined />} />
          </Badge>
        }
        value={text}
        onChange={setText}
        onSubmit={(value) => {
          onSubmit(
            value,
            files.map((item) => item.originFileObj!),
          );
          setText('');
          setFiles([]);
        }}
      />
    </Flex>
  );
}
