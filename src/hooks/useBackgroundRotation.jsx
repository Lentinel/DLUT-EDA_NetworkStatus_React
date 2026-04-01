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

// 惰性初始化函数，避免首次渲染闪烁
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
  // 使用惰性初始化，避免首次渲染固定图片再切换
  // 仅解构 state 值，setter 在当前需求下不需要使用
  const [currentBackground] = useState(getRandomBackground);

  useEffect(() => {
    if (!currentBackground) return;
    // 仅预加载当前选中的背景图，避免一次性加载全部图片
    const img = new Image();
    img.src = currentBackground;
  }, [currentBackground]);

  return currentBackground;
}
