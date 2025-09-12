import classnames from 'classnames';
import React, { useMemo } from 'react';
import useXProviderContext from '../hooks/use-x-provider-context';
import { Parser, Renderer } from './core';
import { useAnimation, useStreaming } from './hooks';
import { XMarkdownProps } from './interface';
import './index.less';

const XMarkdown: React.FC<XMarkdownProps> = (props) => {
  const {
    streaming,
    config,
    components,
    paragraphTag,
    content,
    children,
    rootClassName,
    prefixCls: customizePrefixCls,
    className,
    style,
    openLinksInNewTab,
  } = props;

  // ============================ style ============================
  const { direction: contextDirection, getPrefixCls } = useXProviderContext();

  const prefixCls = getPrefixCls('x-markdown', customizePrefixCls);

  const mergedCls = useMemo(
    () => classnames(prefixCls, 'x-markdown', rootClassName, className),
    [prefixCls, rootClassName, className],
  );

  const mergedStyle: React.CSSProperties = useMemo(
    () => ({
      direction: contextDirection === 'rtl' ? 'rtl' : 'ltr',
      ...style,
    }),
    [contextDirection, style],
  );

  // ============================ Streaming ============================
  const displayContent = useStreaming(content || children || '', streaming);

  // ============================ animation ============================
  const animationComponents = useAnimation(streaming);

  // ============================ Memoized Parser & Renderer ============================
  const parser = useMemo(
    () =>
      new Parser({
        markedConfig: config,
        paragraphTag,
        openLinksInNewTab,
      }),
    [config, paragraphTag, openLinksInNewTab],
  );

  const renderComponents = useMemo(
    () => ({ ...animationComponents, ...(components || {}) }),
    [animationComponents, components],
  );

  const renderer = useMemo(
    () =>
      new Renderer({
        components: renderComponents,
      }),
    [renderComponents],
  );

  // ============================ Render ============================
  const htmlString = useMemo(
    () => (displayContent ? parser.parse(displayContent) : ''),
    [displayContent, parser],
  );

  const renderedContent = useMemo(() => renderer.render(htmlString), [htmlString, renderer]);

  if (!displayContent) return null;

  return (
    <div className={mergedCls} style={mergedStyle}>
      {renderedContent}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  XMarkdown.displayName = 'XMarkdown';
}

export default React.memo(XMarkdown);
