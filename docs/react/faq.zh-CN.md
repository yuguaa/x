---
group:
  title: 其他
  order: 4
order: 2
title: FAQ
---

以下整理了一些 Ant Design X 社区常见的问题和官方答复，在提问之前建议找找有没有类似的问题。此外亦可参考过往的 [issues](https://github.com/ant-design/x/issues)。

## 如何使用 markdown 渲染？

Ant Design X 支持 markdown 渲染，你可以通过配合 `markdown-it` 库来实现自定义的 markdown 内容渲染。

在 Bubble 组件中，可以通过 `messageRender` 属性来自定义渲染方法：

```tsx
import { Bubble } from '@ant-design/x';
import { Typography } from 'antd';
import markdownit from 'markdown-it';

const md = markdownit({ html: true, breaks: true });

const renderMarkdown = (content) => {
  return (
    <Typography>
      <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
    </Typography>
  );
};

const App = () => (
  <Bubble
    content="**粗体文本** 和 [链接](https://x.ant.design)"
    messageRender={renderMarkdown}
  />
);
```

更多详细示例请参考 [Bubble Markdown 示例](/components/bubble-cn#components-bubble-demo-markdown)。

## 是否有 Vue 版本？

目前 Ant Design X 只提供 React 版本。Ant Design X 是专为 React 框架设计的 AI 交互组件库，暂时没有 Vue 版本的计划。

如果你使用 Vue 技术栈，建议关注我们的 GitHub 仓库获取最新动态，或者参与到开源贡献中来帮助我们支持更多框架。

## 如何渲染 `<think>` 标签？

`<think>` 标签通常用于 AI 思维链的场景。Ant Design X 提供了 `ThoughtChain` 组件来专门处理和可视化 AI 的思维过程。

你可以使用 ThoughtChain 组件来展示 AI 的思考步骤：

```tsx
import { ThoughtChain } from '@ant-design/x';

const App = () => (
  <ThoughtChain
    items={[
      {
        key: '1',
        title: '理解问题',
        content: '分析用户的需求和问题背景',
        status: 'success',
      },
      {
        key: '2', 
        title: '思考方案',
        content: '考虑多种可能的解决方案',
        status: 'pending',
      }
    ]}
  />
);
```

更多详细用法请参考 [ThoughtChain 组件文档](/components/thought-chain-cn)。

## 如何适配移动端？

Ant Design X 基于 Ant Design 的设计体系，具备一定的响应式能力。对于移动端适配，建议采用以下方式：

1. **使用响应式布局**：结合 Ant Design 的栅格系统（Grid）和断点系统
2. **调整组件尺寸**：使用组件的 `size` 属性，在移动端使用 `small` 尺寸
3. **优化交互体验**：
   - 调整 Bubble 组件的气泡大小和间距
   - 使用适合触摸的 Sender 输入框设计
   - 考虑使用 `Conversations` 组件的折叠功能

```tsx
import { Bubble, Sender } from '@ant-design/x';
import { ConfigProvider } from 'antd';

const App = () => (
  <ConfigProvider
    theme={{
      components: {
        // 可以在这里自定义移动端样式
      }
    }}
  >
    <Bubble.List 
      items={messages}
      size="small" // 移动端使用小尺寸
    />
    <Sender 
      placeholder="请输入..."
      size="small"
    />
  </ConfigProvider>
);
```

目前 Ant Design X 主要面向桌面端的 AI 交互场景，如果你有移动端的特殊需求，建议通过自定义样式或结合移动端 UI 框架来实现更好的体验。
