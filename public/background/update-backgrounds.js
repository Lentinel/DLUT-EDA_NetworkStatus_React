import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 背景图目录路径
const BACKGROUND_DIR = join(__dirname);

// 支持的图片格式
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'];

// 目标文件路径（相对于当前脚本位置）
const TARGET_FILE = join(__dirname, '../../src/hooks/useBackgroundRotation.jsx');

// 获取背景图目录中的所有图片文件
function getBackgroundImages() {
  const files = readdirSync(BACKGROUND_DIR);
  return files
    .filter(file => {
      const ext = file.toLowerCase().slice(file.lastIndexOf('.'));
      return SUPPORTED_FORMATS.includes(ext) && file !== 'update-backgrounds.js';
    })
    .sort() // 按文件名排序
    .map(file => `/background/${file}`);
}

// 生成 BACKGROUND_IMAGES 数组内容
function generateArrayContent(images) {
  return images.map(img => `  '${img}'`).join(',\n');
}

// 更新 useBackgroundRotation.jsx 文件
function updateHookFile(images) {
  const content = readFileSync(TARGET_FILE, 'utf-8');
  
  const newContent = content.replace(
    /const BACKGROUND_IMAGES = \[[\s\S]*?\];/,
    `const BACKGROUND_IMAGES = [\n${generateArrayContent(images)}\n];`
  );

  writeFileSync(TARGET_FILE, newContent, 'utf-8');
  console.log(`✓ 已更新 useBackgroundRotation.jsx`);
  console.log(`  共找到 ${images.length} 张背景图:`);
  images.forEach(img => console.log(`    - ${img}`));
}

// 主函数
function main() {
  console.log('正在扫描背景图目录...\n');
  
  const images = getBackgroundImages();
  
  if (images.length === 0) {
    console.log('⚠ 未找到背景图文件');
    console.log('  请将图片放入 public/background/ 目录');
    console.log('  支持的格式：JPG, JPEG, PNG, WEBP, GIF, BMP');
    return;
  }
  
  updateHookFile(images);
  console.log('\n✓ 完成！刷新网页即可看到新背景图');
}

main();
