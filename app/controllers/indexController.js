const { nanoid } = require('nanoid');
const { fromPath } = require('pdf2pic');
const sharp = require('sharp');
const tesseract = require('node-tesseract-ocr');
const fs = require('fs').promises;
const fs2 = require('fs');
const { PDFDocument } = require('pdf-lib');

exports.index = async (req, res, next) => {
  try {
    if (req.body.type == 'sp3') {
      const pdfDoc = await PDFDocument.load(await fs.readFile(req.file.path));
      const img = await pdfDoc.embedPng(fs2.readFileSync('./signature.png'));
      const imagePage = pdfDoc.getPage(0);
      imagePage.drawImage(img, {
        x: 100,
        y: 100,
        width: 5 * 50,
        height: 2 * 50,
      });

      const pdfBytes = await pdfDoc.save();
      let filename = `signed-${nanoid()}.pdf`;
      const newFilePath = `./storage/app/${filename}`;
      fs2.writeFileSync(newFilePath, pdfBytes);

      return res.send({ link: filename });
    }

    let outputImage = nanoid();
    let outputCrop = `./storage/app/${nanoid()}.jpeg`;
    const options = {
      saveFilename: outputImage,
      savePath: './storage/app',
      format: 'jpeg',
      quality: 500,
      density: 500,
      width: 1000 * 3,
      height: 700 * 3,
    };
    const storeAsImage = fromPath(req.file.path, options);
    const pageToConvertAsImage = 1;

    await storeAsImage(pageToConvertAsImage);
    let cordinate = {};

    if (req.body.type == 'pr') {
      cordinate = { left: 800, top: 450, width: 360, height: 120 };
    }

    if (req.body.type == 'po') {
      cordinate = { left: 660, top: 450, width: 360, height: 120 };
    }

    if (req.body.type == 'sa') {
      cordinate = { left: 1150, top: 300, width: 600, height: 100 };
    }

    await sharp(`./storage/app/${outputImage}.1.jpeg`)
      .extract(cordinate)
      .toFile(outputCrop);

    let text = await tesseract.recognize(outputCrop);
    // fs.unlink(req.file.path);
    fs.unlink(`./storage/app/${outputImage}.1.jpeg`);
    fs.unlink(outputCrop);

    return res.send({ result: text.replace(/[^0-9]/g, '') });
  } catch (error) {
    console.log(error)
    res.send({
      result: error.message,
    });
  }
};
