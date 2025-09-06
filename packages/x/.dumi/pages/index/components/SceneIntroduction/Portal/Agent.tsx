import type { BubbleListProps } from '@ant-design/x';
import { Bubble } from '@ant-design/x';
import XMarkdown from '@ant-design/x-markdown';
import HighlightCode from '@ant-design/x-markdown/plugins/HighlightCode';
import type { AbstractXRequestClass, XRequestOptions } from '@ant-design/x-sdk';
import { AbstractChatProvider, TransformMessage, useXChat } from '@ant-design/x-sdk';
import { Spin } from 'antd';
import { createStyles } from 'antd-style';
import React, { useEffect, useState } from 'react';
import { TboxClient } from 'tbox-nodejs-sdk';
import Sender from './Sender';

const Code = (props: { className: string; children: string }) => {
  const { className, children } = props;
  const lang = className?.match(/language-(\w+)/)?.[1] || '';
  return <HighlightCode lang={lang}>{children}</HighlightCode>;
};

const tboxClient = new TboxClient({
  httpClientConfig: {
    authorization: 'your-api-key', // Replace with your API key
    isAntdXDemo: true, // Only for Ant Design X demo
  },
});

const useStyle = createStyles(({ token, css }) => {
  return {
    container: css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-block: ${token.marginXL}px;
        height: 100%;
        width:100%;
        box-sizing: border-box;
        align-items: center;
        `,
    messageList: css`
        width:100%;
        height: calc(100% - 160px);
        display: flex;
        flex-direction:column;
        align-items: center;
        .ant-bubble-start{
        margin-inline-start: ${token.marginXL * 2}px;
        }
        .ant-bubble-end{
         margin-inline-end: ${token.marginXL * 2}px;
        }
        `,
    sender: css`
        max-width: 1000px;
        paddingInline: ${token.marginXL}px;
        width:100%;
    `,
    loadingMessage: css``,
  };
});

interface TBoxMessage {
  content: string;
  role: string;
}

interface TBoxInput {
  message: TBoxMessage;
}

interface TBoxOutput {
  text?: string;
}

class TBoxProvider<
  ChatMessage extends TBoxMessage = TBoxMessage,
  Input extends TBoxInput = TBoxInput,
  Output extends TBoxOutput = TBoxOutput,
> extends AbstractChatProvider<ChatMessage, Input, Output> {
  transformParams(requestParams: Partial<Input>, options: XRequestOptions<Input, Output>): Input {
    if (typeof requestParams !== 'object') {
      throw new Error('requestParams must be an object');
    }
    return {
      ...(options?.params || {}),
      ...(requestParams || {}),
    } as Input;
  }
  transformLocalMessage(requestParams: Partial<Input>): ChatMessage {
    return requestParams.message as unknown as ChatMessage;
  }
  transformMessage(info: TransformMessage<ChatMessage, Output>): ChatMessage {
    const { originMessage, chunk } = info || {};
    if (!chunk) {
      return {
        content: originMessage?.content || '',
        role: 'assistant',
      } as ChatMessage;
    }

    const content = originMessage?.content || '';
    return {
      content: content + chunk.text,
      role: 'assistant',
    } as ChatMessage;
  }
}

class TBoxRequest<
  Input extends TBoxInput = TBoxInput,
  Output extends TBoxOutput = TBoxOutput,
> extends AbstractXRequestClass<Input, Output> {
  tboxClient: TboxClient;
  tboxStream: any;

  _isTimeout = false;
  _isStreamTimeout = false;
  _isRequesting = false;

  constructor(baseURL: string, options: XRequestOptions<Input, Output>) {
    super(baseURL, options);
    this.tboxClient = new TboxClient({
      httpClientConfig: {
        authorization: 'your-api-key', // Replace with your API key
        isAntdXDemo: true, // Only for Ant Design X demo
      },
    });
  }
  get asyncHandler(): Promise<any> {
    return Promise.resolve();
  }
  get isTimeout(): boolean {
    return this._isTimeout;
  }
  get isStreamTimeout(): boolean {
    return this._isStreamTimeout;
  }
  get isRequesting(): boolean {
    return this._isRequesting;
  }
  get manual(): boolean {
    return true;
  }
  run(params?: Input | undefined): void {
    const stream = tboxClient.chat({
      appId: 'your-app-id', // Replace with your app ID
      query: params?.message.content || '',
      userId: 'antd-x',
    });
    this.tboxStream = stream;
    const { callbacks } = this.options;

    const dataArr: Output[] = [];

    stream.on('data', (data) => {
      let parsedPayload: Output;
      try {
        const payload = (data as any).data?.payload || '{}';
        parsedPayload = JSON.parse(payload);
      } catch (e) {
        console.error('Failed to parse payload:', e);
        return;
      }

      if (parsedPayload?.text) {
        dataArr.push(parsedPayload);
        callbacks?.onUpdate?.(parsedPayload, new Headers());
      }
    });

    stream.on('error', (error) => {
      callbacks?.onError(error);
    });

    stream.on('end', () => {
      callbacks?.onSuccess(dataArr, new Headers());
    });

    stream.on('abort', () => {
      callbacks?.onSuccess(dataArr, new Headers());
    });
  }
  abort(): void {
    this.tboxStream?.abort?.();
  }
}

interface AgentProps {
  query: string;
}
const Agent: React.FC<AgentProps> = ({ query }) => {
  const { styles, theme } = useStyle();
  // ==================== Runtime ====================
  const providerCaches = new Map<string, TBoxProvider>();
  const providerFactory = (conversationKey: string) => {
    if (!providerCaches.get(conversationKey)) {
      providerCaches.set(
        conversationKey,
        new TBoxProvider({
          request: new TBoxRequest('TBox Client', {}),
        }),
      );
    }
    return providerCaches.get(conversationKey);
  };

  // ==================== Event ====================
  const onSubmit = (val: string) => {
    if (!val) return;

    onRequest({
      message: { role: 'user', content: val },
    });
  };

  useEffect(() => {
    onSubmit(query);
  }, []);

  const role: BubbleListProps['role'] = {
    assistant: {
      placement: 'start',
      loadingRender: () => <Spin size="small" />,
      contentRender: (content: string | undefined) => (
        <XMarkdown
          components={{ code: Code }}
          paragraphTag="div"
          streaming={{ hasNextChunk: isRequesting(), enableAnimation: true }}
        >
          {content}
        </XMarkdown>
      ),
    },
    user: { placement: 'end' },
  };

  const [curConversation, setCurConversation] = useState<string>(`${Date.now()}`);
  const { onRequest, messages, isRequesting, abort } = useXChat({
    provider: providerFactory(curConversation), // every conversation has its own provider
    conversationKey: curConversation,
    requestPlaceholder: () => {
      return {
        content: 'loading',
        role: 'assistant',
      };
    },
    requestFallback: (_, { error }) => {
      if (error.name === 'AbortError') {
        return {
          content: 'Request is aborted',
          role: 'assistant',
        };
      }
      return {
        content: 'Request failed, please try again!',
        role: 'assistant',
      };
    },
  });

  console.log(setCurConversation, isRequesting, abort);
  return (
    <div className={styles.container}>
      <div className={styles.messageList}>
        <Bubble.List
          style={{
            width: '100%',
          }}
          autoScroll
          items={messages?.map((i) => ({
            ...i.message,
            classNames: {
              content: i.status === 'loading' ? styles.loadingMessage : '',
            },
            typing:
              i.status === 'loading'
                ? { effect: 'typing', suffix: <>💗</>, keepPrefix: true }
                : false,
            key: i.id,
          }))}
          role={role}
        />
      </div>
      <div className={styles.sender}>
        <Sender onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Agent;
