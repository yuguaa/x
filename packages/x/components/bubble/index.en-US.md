---
category: Components
group:
  title: Common
  order: 0
title: Bubble
description: A bubble component for chat.
cover: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*rHIYQIL1X-QAAAAAAAAAAAAADgCCAQ/original
coverDark: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*uaGhTY1-LL0AAAAAAAAAAAAADgCCAQ/original
demo:
  cols: 1
---

## When To Use

Often used when chatting.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx" > basic</code>
<code src="./demo/variant-and-shape.tsx"> variants and shapes</code>
<code src="./demo/sider-and-placement.tsx"> sidebar and location</code>
<code src="./demo/header.tsx"> bubble header</code>
<code src="./demo/footer.tsx"> bubble tail</code>
<code src="./demo/loading.tsx" > loading</code>
<code src="./demo/animation.tsx"> animation</code>
<code src="./demo/stream.tsx"> stream</code>
<code src="./demo/custom-content.tsx" > custom rendered content</code>
<code src="./demo/markdown.tsx"> render the markdown content</code>
<code src="./demo/list.tsx" > a list of bubbles</code>
<code src="./demo/semantic-list-custom.tsx"> semantic customization</code>
<code src="./demo/gpt-vis.tsx"> render charts using GPT-Vis</code>

## API

Common Props Reference: [Common Props](/docs/react/common-props)

### Bubble

<!-- prettier-ignore -->
| Attributes | Description | Type | Default | Version | 
|------|------|------|--------|------| 
| prefixCls | Custom class prefixes | string | - | - | 
| rootStyle | Root Node Style | React.CSSProperties | - | - | 
| styles | Semantic structure style | [Record<SemanticDOM, CSSProperties>](#semantic-dom) | - |  |
| rootClassName | Root node class name | string | - | - | 
| classNames | Semantic structure class | [Record<SemanticDOM, string>](#semantic-dom) | - |  |
| placement | Bubble Location | 'start' \| 'end' | `start` | - | 
| loading | Load Status | boolean | - | - | 
| loadingRender | Custom loading content rendering | () => React.ReactNode | - | - | 
| content | Bubble Contents | [ContentType] (#contenttype) | - | - | 
| contentRender | Custom content rendering | (content: ContentType) => React.ReactNode | - | - | 
| typing | Typing Animation Effects | boolean \| [BubbleAnimationOption] (#bubbleanimationoption) | `false` | - | 
| streaming | Whether it is streaming | boolean | `false` | - | 
| variant | Bubble style variants | 'filled' \| 'outlined' \| 'shadow' \| 'borderless' | `filled` | - | 
| shape | Bubble Shape | 'default' \| 'round' \| 'corner' | `default` | - | 
| footerPlacement | Bottom Slot Position | 'outer-start' \| 'outer-end' \| 'inner-start' \| 'inner-end' | `outer-start` | - | 
| components | Expand Slot Configuration | { header?: [BubbleSlot](#bubbleslot); footer?: BubbleSlot; avatar?: BubbleSlot; extra?: BubbleSlot; } | - | - | 
| onTyping | Animation Execution Callback | (rendererContent: string, currentContent: string) => void | - | - | 
| onTypingComplete | Animation end callback | (content: string) => void | - | - |

### BubbleList Component API

| Attributes | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| prefixCls | Custom class prefixes | string | - | - |
| rootClassName | Root node class name | string | - | - |
| rootStyle | Root Node Style | React.CSSProperties | - | - |
| items | Bubble data list, 'key', 'role' required | (BubbleProps & { key: string \| number, role: string }) [] | - | - |
| autoScroll | Whether to auto-scroll | boolean | `true` | - |
| role | Role default configuration | Partial<Record<'ai' \| 'system' \| 'user', [RoleType](#roletype)>> & Record<string, RoleType> | - | - |

#### ContentType

Default type

```typescript
type ContentType = React.ReactNode | AnyObject | string | number;
```

Custom type usage

```tsx
type CustomContentType {
  ...
}

<Bubble<CustomContentType> {... props} />
```

#### BubbleSlot

```typescript
type BubbleSlot<ContentType> = React.ReactNode | ((content: ContentType) => React.ReactNode);
```

#### BubbleAnimationOption

```typescript
interface BubbleAnimationOption {
  /**
   * @description Animation effect type, typewriter, fade
   */
  effect: 'typing' | 'fade-in';
  /**
   * @description Content step units, array format as random intervals
   */
  step?: number | [number, number];
  /**
   * @description Animation trigger interval
   */
  interval?: number;
  /**
   * @description Whether to restart an animation with the common prefix of the text
   */
  keepPrefix?: boolean;
  /**
   * @description Stepping UI under typewriter effect
   */
  suffix?: React.ReactNode;
}
```

#### RoleType

```typescript
type RoleType = Pick<
  BubbleProps,
  | 'typing'
  | 'variant'
  | 'shape'
  | 'placement'
  | 'rootClassName'
  | 'classNames'
  | 'className'
  | 'rootStyle'
  | 'styles'
  | 'style'
  | 'loading'
  | 'loadingRender'
  | 'contentRender'
  | 'footerPlacement'
  | 'components'
> & { key: string | number; role: string };
```

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Bubble"></ComponentTokenTable>
