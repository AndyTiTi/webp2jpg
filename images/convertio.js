const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// 要处理的目录路径
const sourceDir = "D:\\迅雷下载\\任务组_20240625_1103\\"; // 这里存放.webp文件
const outputDir = "D:\\迅雷下载\\任务组_20240625_1103\\imgs\\"; // 这里存放转换后的.jpg文件

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 读取目录并转换图片
const convertImages = async () => {
  const files = await fs.promises.readdir(sourceDir);
  const webpFiles = files.filter((file) => path.extname(file) === ".webp");

  for (const file of webpFiles) {
    const inputPath = path.join(sourceDir, file);
    const outputPath = path.join(
      outputDir,
      path.basename(file, ".webp") + ".jpg"
    );

    try {
      // 使用sharp转换图片
      await sharp(inputPath)
        .jpeg({ quality: 90 }) // 可以设置JPEG质量
        .toFile(outputPath, (err, info) => {
          if (err) {
            console.error("转换图片时出错:", err);
          } else {
            console.log(`图片转换成功: ${outputPath}`);
          }
        });
    } catch (err) {
      console.error("处理图片时出错:", err);
    }
  }
};

convertImages().then(() => {
  console.log("所有图片转换完成。");
});
