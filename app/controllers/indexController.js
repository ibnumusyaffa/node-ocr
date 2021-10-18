const { nanoid } = require('nanoid');
const { fromPath } = require('pdf2pic');
const sharp = require('sharp');
const tesseract = require('node-tesseract-ocr');
const fs = require('fs').promises;

//PO     .extract({ left: 660, top: 450, width: 360, height: 120 })
//PR .extract({ left: 800, top: 450, width: 360, height: 120 })


exports.index = async (req, res, next) => {
  try {
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

    await sharp(`./storage/app/${outputImage}.1.jpeg`)
      .extract({ left: 800, top: 450, width: 360, height: 120 })
      .toFile(outputCrop);

    let text = await tesseract.recognize(outputCrop);
    fs.unlink(req.file.path);
    // fs.unlink(`./storage/app/${outputImage}.1.jpeg`);
    fs.unlink(outputCrop);
    return res.send({ message: text.replace(/[^0-9]/g, '') });
  } catch (error) {
    res.send({
      result: error,
    });
  }
};
