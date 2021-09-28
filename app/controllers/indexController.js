const tesseract = require('node-tesseract-ocr');
const fs = require('fs');
exports.index = async (req, res) => {
  try {

    const img = fs.readFileSync(req.file.path);

    const config = {
      lang: 'eng',
      oem: 1,
      psm: 3,
    };

    let text = await tesseract.recognize(img, config);
    console.log('done');
    return res.send({
      message: text,
    });
  } catch (error) {
    console.log('error');
    return res.send({
      message: error.message,
    });
  }
};
