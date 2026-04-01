import { useState, useEffect } from 'react';

// 背景图文件列表，你可以在此添加或删除图片
const BACKGROUND_IMAGES = [
  '/background/DJI_0911.jpg',
  '/background/IMG_20250506_004910.jpg',
  '/background/Image_1715244864182.jpg',
  '/background/Image_1715244884834.jpg',
  '/background/Image_1761029938994.jpg',
  '/background/Image_216600159819371.jpg',
  '/background/PARK0204.jpg',
  '/background/background1.jpg',
  '/background/c4f97cb16d4125ac4f117e662159f2d6.jpg'
];

// 随机选择一张背景图
function getRandomBackground() {
  if (BACKGROUND_IMAGES.length === 0) {
    return '';
  }
  const randomIndex = Math.floor(Math.random() * BACKGROUND_IMAGES.length);
  return BACKGROUND_IMAGES[randomIndex];
}

/**
 * 随机背景图 Hook
 * 注意：名称中的 Rotation 指页面刷新时切换背景图，而非定时轮换
 */
export function useBackgroundRotation() {
  // 初始为空字符串，待图片加载/解码完成后再应用背景，减少首屏闪烁
  const [currentBackground, setCurrentBackground] = useState('');

  useEffect(() => {
    const src = getRandomBackground();
    if (!src) return;

    let cancelled = false;
    const img = new Image();

    const applyBackground = () => {
      if (cancelled) return;
      setCurrentBackground(src);
    };

    // 优先使用 decode 在设置 src 后解码图片；不支持时回退到 onload/onerror
    if (img.decode) {
      img.src = src;
      img
        .decode()
        .then(applyBackground)
        .catch(applyBackground);
    } else {
      // 检查图片是否已缓存完成
      img.onload = applyBackground;
      img.onerror = applyBackground;
      img.src = src;
      // 如果图片已缓存，手动触发回调
      if (img.complete) {
        applyBackground();
      }
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return currentBackground;
}
