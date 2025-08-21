---
category: Components
group:
  title: 表达
  order: 2
title: Attachments
subtitle: 输入附件
description: 用于展示一组附件信息集合。
cover: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*5l2oSKBXatAAAAAAAAAAAAAADgCCAQ/original
coverDark: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*N8QHQJhgfbEAAAAAAAAAAAAADgCCAQ/original
demo:
  cols: 1
---

## 何时使用

Attachments 组件用于需要展示一组附件信息集合的场景。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/with-sender.tsx">输入上传文件</code>
<code src="./demo/drop.tsx">拖拽上传</code>
<code src="./demo/placeholder.tsx">占位信息</code>
<code src="./demo/overflow.tsx">超出样式</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)。

### AttachmentsProps

继承 antd [Upload](https://ant.design/components/upload) 属性。

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 自定义样式类名，[见下](#semantic-dom) | Record<string, string> | - | - |
| disabled | 是否禁用 | boolean | false | - |
| getDropContainer | 设置拖拽时，可以释放文件的区域 | () => HTMLElement | - | - |
| items | 附件列表，同 Upload `fileList` | Attachment[] | - | - |
| overflow | 文件列表超出时样式 | 'wrap' \| 'scrollX' \| 'scrollY' | - | - |
| placeholder | 没有文件时的占位信息 | PlaceholderType \| ((type: 'inline' \| 'drop') => PlaceholderType) | - | - |
| rootClassName | 根节点的样式类名 | string | - | - |
| rootStyle | 根节点的样式对象 | React.CSSProperties | - | - |
| styles | 自定义样式对象，[见下](#semantic-dom) | Record<string, React.CSSProperties> | - | - |
| imageProps | 图片属性，同 antd [Image](https://ant.design/components/image) 属性 | ImageProps | - | - |

```tsx | pure
interface PlaceholderType {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}
```

### AttachmentsRef

| 属性          | 说明             | 类型                 | 版本 |
| ------------- | ---------------- | -------------------- | ---- |
| nativeElement | 获取原生节点     | HTMLElement          | -    |
| upload        | 手工调用上传文件 | (file: File) => void | -    |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component="Attachments"></ComponentTokenTable>
