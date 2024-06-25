const fs = require("fs");
const path = require("path");

// 假设你的文本文件路径是 'path/to/your/filelist.txt'
const filelistPath = "./list.txt";
// 图片存放的目录
const imagesDir = "D:\\迅雷下载\\任务组_20240625_1103\\";

// 读取文本文件中的每一行（即每个文件路径）
fs.readFile(filelistPath, "utf8", (err, fileContents) => {
  if (err) {
    console.error("读取文件时出错:", err);
    return;
  }

  // 按行分割内容
  const files = Array.from(new Set(fileContents.split("\r\n")));
  console.log("🚀 ~ fs.readFile ~ files:", files.length);
  // return;
  // 遍历文件列表
  files.forEach((filePath, index) => {
    if (filePath.trim() !== "") {
      // 去除文件名中的路径，只保留文件名
      const originalFileName = path.basename(filePath);
      // 构造新的文件名，index从1开始
      const newFileName = `${index + 1}-${originalFileName}`;
      // 构造完整的新文件路径
      const newFilePath = path.join(imagesDir, newFileName);

      console.log(newFilePath, path.join(imagesDir, originalFileName));
      // return;
      // 重命名文件
      fs.rename(
        path.join(imagesDir, originalFileName),
        newFilePath,
        (renameErr) => {
          if (renameErr) {
            console.error("重命名文件时出错:", renameErr);
          } else {
            console.log(`文件已重命名为: ${newFileName}`);
          }
        }
      );
    }
  });
});
