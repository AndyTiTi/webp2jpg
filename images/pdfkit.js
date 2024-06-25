const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);

// 图片存放的目录
const imagesDir = "D:\\迅雷下载\\任务组_20240625_1103\\";

// 读取目录下所有.webp文件
async function getImageFiles(dir) {
  try {
    const files = await readdir(dir);
    const webpFiles = files.filter((file) => path.extname(file) === ".webp");
    return webpFiles.map((file) => path.join(dir, file));
  } catch (err) {
    console.error("读取目录时出错:", err);
    return [];
  }
}

// 创建PDF文档并添加图片
async function createPDF(images, outputFilePath) {
  const doc = new PDFDocument();

  // 遍历图片文件列表，为每个图片创建PDF页面
  for (let i = 0; i < images.length; i++) {
    const imgPath = images[i];
    console.log("🚀 ~ createPDF ~ imgPath:", imgPath);
    doc.addPage().image(imgPath, {
      width: doc.page.width,
      height: doc.page.height / 2, // 可以根据需要调整高度
    });
    console.log(`图片 ${path.basename(imgPath)} 已添加到PDF第 ${i + 1} 页`);
  }

  // 保存PDF文件
  const outputStream = fs.createWriteStream(outputFilePath);
  doc.pipe(outputStream);
  doc.end();
  console.log(`PDF文件已保存到 ${outputFilePath}`);
}

// 执行
const pdfOutputPath = "D:\\迅雷下载\\任务组_20240625_1103\\output.pdf"; // 输出PDF文件的路径

getImageFiles(imagesDir).then((images) => {
  console.log("🚀 ~ getImageFiles ~ images:", images);
  createPDF(images, pdfOutputPath);
});
