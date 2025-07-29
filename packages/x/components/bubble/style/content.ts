import type { GenerateStyle } from '../../theme/cssinjs-utils';
import type { BubbleToken } from './bubble';

export const genVariantStyle: GenerateStyle<BubbleToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      [`${componentCls}-content`]: {
        // Filled:
        '&-filled': {
          backgroundColor: token.colorFillContent,
        },

        // Outlined:
        '&-outlined': {
          border: `1px solid ${token.colorBorderSecondary}`,
        },

        // Shadow:
        '&-shadow': {
          boxShadow: token.boxShadowTertiary,
        },

        '&-borderless': {
          backgroundColor: 'transparent',
          padding: 0,
          minHeight: 0,
        },
      },
    },
  };
};

export const genShapeStyle: GenerateStyle<BubbleToken> = (token) => {
  const { componentCls, fontSize, lineHeight, paddingSM, padding, calc } = token;

  const halfRadius = calc(fontSize).mul(lineHeight).div(2).add(paddingSM).equal();

  const contentCls = `${componentCls}-content`;

  return {
    [componentCls]: {
      [contentCls]: {
        '&-default': {
          // 12px
          borderRadius: calc(token.borderRadius).mul(2).equal(),
        },

        '&-round': {
          borderRadius: {
            _skip_check_: true,
            value: halfRadius,
          },
          paddingInline: calc(padding).mul(1.25).equal(),
        },

        '&-corner': {
          borderRadius: calc(token.borderRadius).mul(2).equal(),
        },
      },

      [`&-start ${componentCls}-content-corner`]: {
        borderStartStartRadius: token.borderRadiusXS,
      },

      [`&-end ${componentCls}-content-corner`]: {
        borderStartEndRadius: token.borderRadiusXS,
      },
    },
  };
};
