import { useState, useEffect } from 'react';

// 背景图文件列表，你可以在此添加或删除图片
const BACKGROUND_IMAGES = [
  '/background/DJI_0911.jpg',
  '/background/IMG_20250506_004910.jpg',
  '/background/Image_1715244864182.jpg',
  '/background/Image_1715244884834.jpg',
  '/background/Image_1761029938994.jpg',
  '/background/Image_216600159819371.jpg',
  '/background/PARK0202.jpg',
  '/background/PARK0204.jpg',
  '/background/background1.jpg',
  '/background/c4f97cb16d4125ac4f117e662159f2d6.jpg'
];

export function useBackgroundRotation() {
  const [currentBackground, setCurrentBackground] = useState(BACKGROUND_IMAGES[0]);

  useEffect(() => {
    // 预加载所有背景图
    BACKGROUND_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // 随机选择一张背景图（单次访问固定）
    const randomIndex = Math.floor(Math.random() * BACKGROUND_IMAGES.length);
    setCurrentBackground(BACKGROUND_IMAGES[randomIndex]);
  }, []);

  return currentBackground;
}
