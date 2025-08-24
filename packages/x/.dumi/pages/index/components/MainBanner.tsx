import { createStyles } from 'antd-style';
import React from 'react';
import useLottie from '../../../hooks/useLottie';
import Container from '../common/Container';
import Portal from './SceneIntroduction/Portal';

const useStyle = createStyles(({ token, css }) => {
  const minBannerWidth = token.mobileMaxWidth - token.padding * 2;

  return {
    banner: css`
      width: 100vw;
      height: calc(100vh - 80px);
      min-height: 600px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        height: calc(100vh - ${token.paddingLG}px);
      }
      &:hover .x-hover{
        rotate: -90deg;
        color: transparent;
        background-repeat:no-repeat;
        background-size:contain;
        background-position:center;
        background-image:url('https://mdn.alipayobjects.com/huamei_lkxviz/afts/img/MGdkQ6iLuXEAAAAAQDAAAAgADtFMAQFr/original')
        }
    `,
    background: css`
      width: 100%;
      height: 100%;
      position: absolute;
      filter: blur(50px);
      background: linear-gradient(135deg, #ffffff26 14%, #ffffff0d 59%);
    `,
    container: css`
      height: 100%;
      max-height: 100%;
      box-sizing:border-box;
      display:flex;
      justify-content:space-between;
      padding-block-start:100px;
    `,
    x: css`
     transition: rotate ${token.motionDurationMid};
     width:85px;
     margin-left: -10px;
     display: inline-flex;
     justify-content:center;     
    `,
    title: css`
      max-width: ${minBannerWidth}px;
      top: 50%;
      inset-inline-start: 0;
      z-index: 1;

      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: ${token.paddingXS}px;
      }
      &:hover .x-hover{
        rotate: -90deg;
        color: transparent;
        background-repeat:no-repeat;
        background-size:contain;
        background-position:center;
        background-image:url('https://mdn.alipayobjects.com/huamei_lkxviz/afts/img/MGdkQ6iLuXEAAAAAQDAAAAgADtFMAQFr/original')
      }

    `,
    lottie: css`
      position: absolute;
      top: 50%;
      inset-inline-end: 0;
      transform: translate(${token.pcContainerMargin}px, -40%);
      z-index: 0;
      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        display: none;
      }
    `,
    lottie_rtl: css`
      transform: translate(${token.pcContainerMargin * -2}px, -40%) !important;
    `,
    name: css`
      font-size: 80px !important;
            white-space: nowrap;
      line-height: 1.3;
      color: ${token.colorText};
      font-weight: bold;

      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        font-size: 54px !important;
      }
    `,
    desc: css`
      font-size: ${token.fontSizeHeading5}px;
      font-weight: 400;
      max-width: 500px;
      color: ${token.colorText};
      opacity: 0.65;
      margin: ${token.marginLG}px 0 ${token.marginLG * 2}px 0;
    `,
    iAlphabet: css`
      position: relative;
      font-size: 60px;
      display: inline-block;
      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        transform: scale(0.7);
        top: 6px;
      }
    `,
    iAlphabetStar: css`
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 22px;
      height: 22px;
      background: no-repeat center url('https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*RMOpRLHgA9wAAAAAAAAAAAAADgCCAQ/original');
      background-size: cover;
      &::before {
        content: '';
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: inherit;
        position: absolute;
        background: radial-gradient(circle, #fe8aff 0%, #fe8aff00 100%);
        filter: blur(12px);
      };
    `,
    content: css`
      display: flex;
      gap: ${token.paddingLG}px;
      flex-wrap: wrap;
    `,
    btn: css`
      height: 56px;
      border: none;
      border-radius: 40px;
      padding: 0 40px;
      display: inline-block;
      font-size: 18px;
      cursor: pointer;
      font-weight: 600;
      box-shadow: ${token.boxShadow};
      position: relative;
      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        padding: 0 ${token.paddingLG}px;
      }
    `,
    startBtn: css`
      background: linear-gradient(90deg, #c7deff 0%, #ffffffd9 76%);
      color: #14204c;
      position: relative;
      ::after {
        content: '';
        position: absolute;
        border-radius: 40px;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
        opacity: 0;
        z-index: -1;
        transition: opacity 0.2s;
      }
      :hover::after {
        opacity: 1;
      }
    `,
    designBtn: css`
      background: #ffffff1a;
      backdrop-filter: blur(40px);
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: inherit;
        position: absolute;
        top: 0;
        bottom: 0;
        inset-inline-start: 0;
        inset-inline-end: 0;
        padding: ${token.lineWidth}px;
        background: linear-gradient(180deg, #ffffff26 0%, #ffffff00 100%);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
      };
  `,
  };
});

const MainBanner: React.FC = () => {
  const { styles } = useStyle();

  const [bgLottieRef, bgAnimation] = useLottie({
    renderer: 'svg',
    loop: false,
    autoplay: false,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
    path: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*3QcuQpaOguQAAAAAAAAAAAAADgCCAQ',
  });

  React.useEffect(() => {
    if (!bgAnimation) return;

    let isReverse = false;

    function playAnimation() {
      if (!bgAnimation) return;

      if (isReverse) {
        bgAnimation.setDirection(-1);
        bgAnimation.goToAndPlay(bgAnimation.totalFrames - 1, true);
      } else {
        bgAnimation.setDirection(1);
        bgAnimation.goToAndPlay(0, true);
      }
      isReverse = !isReverse;
    }

    bgAnimation.addEventListener('data_ready', playAnimation);
    playAnimation();
    return () => {
      bgAnimation.destroy();
    };
  }, [!!bgAnimation]);

  return (
    <section className={styles.banner}>
      <div ref={bgLottieRef} className={styles.background} />
      <Container className={styles.container}>
        <Portal />
      </Container>
    </section>
  );
};

export default MainBanner;
