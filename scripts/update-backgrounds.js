import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 背景图目录路径（相对于 scripts 目录）
const BACKGROUND_DIR = join(__dirname, '../public/background');

// 支持的图片格式
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'];

// 目标文件路径（相对于 scripts 目录）
const TARGET_FILE = join(__dirname, '../src/hooks/useBackgroundRotation.jsx');

// 获取背景图目录中的所有图片文件
function getBackgroundImages() {
  let files;
  try {
    files = readdirSync(BACKGROUND_DIR);
  } catch (err) {
    console.error('✗ 无法读取背景图目录');
    console.error(`  请确保目录存在：${BACKGROUND_DIR}`);
    process.exitCode = 1;
    return [];
  }
  
  return files
    .filter(file => {
      const ext = file.toLowerCase().slice(file.lastIndexOf('.'));
      return SUPPORTED_FORMATS.includes(ext) && file !== 'ReadMe.txt';
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
  
  const regex = /const BACKGROUND_IMAGES = \[[\s\S]*?\];/;
  if (!regex.test(content)) {
    console.error('✗ 未能更新 useBackgroundRotation.jsx：未找到 BACKGROUND_IMAGES 定义');
    process.exitCode = 1;
    return;
  }
  
  const newContent = content.replace(
    regex,
    `const BACKGROUND_IMAGES = [\n${generateArrayContent(images)}\n];`
  );

  if (newContent === content) {
    console.log('✓ useBackgroundRotation.jsx 已是最新，无需更新');
    console.log(`  共找到 ${images.length} 张背景图:`);
    images.forEach(img => console.log(`    - ${img}`));
    return;
  }

  writeFileSync(TARGET_FILE, newContent, 'utf-8');
  console.log('✓ 已更新 useBackgroundRotation.jsx');
  console.log(`  共找到 ${images.length} 张背景图:`);
  images.forEach(img => console.log(`    - ${img}`));
}

// 主函数
function main() {
  console.log('正在扫描背景图目录...\n');
  
  const images = getBackgroundImages();
  
  if (images.length === 0) {
    if (process.exitCode !== 1) {
      console.log('⚠ 未找到背景图文件');
      console.log('  请将图片放入 public/background/ 目录');
      console.log('  支持的格式：JPG, JPEG, PNG, WEBP, GIF, BMP');
    }
    return;
  }
  
  updateHookFile(images);
  console.log('\n✓ 完成！刷新网页即可看到新背景图');
}

main();
