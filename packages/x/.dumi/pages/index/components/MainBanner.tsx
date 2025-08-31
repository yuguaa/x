import { createStyles } from 'antd-style';
import React from 'react';
import useLottie from '../../../hooks/useLottie';
import Portal from './SceneIntroduction/Portal';

const useStyle = createStyles(({ token, css }) => {
  return {
    banner: css`
      width: 100vw;
      height: calc(100vh - 120px);
      min-height: 750px;
      margin-block-start: 64px;
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
      <Portal />
    </section>
  );
};

export default MainBanner;
