const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);

// 图片存放的目录
const imagesDir = "D:\\迅雷下载\\任务组_20240625_1103\\imgs\\";

// 执行
const pdfOutputPath = "D:\\迅雷下载\\任务组_20240625_1103\\imgs\\output.pdf"; // 输出PDF文件的路径

const doc = new PDFDocument({
  size: "A4", // 设置页面大小
  layout: "portrait", // 设置页面方向
  margin: 0, // 设置页面边距为0
});

// 保存PDF文件
const outputStream = fs.createWriteStream(pdfOutputPath);
doc.pipe(outputStream);

// 读取目录下所有.jpg文件
async function getImageFiles(dir) {
  try {
    const files = await readdir(dir);
    const jpgFiles = files.filter((file) => path.extname(file) === ".jpg");
    return jpgFiles.map((file) => path.join(dir, file));
  } catch (err) {
    console.error("读取目录时出错:", err);
    return [];
  }
}

// 创建PDF文档并添加图片
async function createPDF(images, outputFilePath) {
  images.forEach((imgPath, index) => {
    doc.addPage().image(imgPath, 0, 0, {
      width: doc.page.width,
      height: doc.page.height, // 可以根据需要调整高度
      align: "center",
      valign: "cnter",
    });

    console.log(`图片 ${index + 1} 已添加到PDF`);
  });
  doc.end();
  console.log(`PDF文件已保存到 ${outputFilePath}`);
}

getImageFiles(imagesDir).then((images) => {
  console.log("🚀 ~ getImageFiles ~ images:", images);
  createPDF(images, pdfOutputPath);
});
