const { readPdfText } = require('pdf-text-reader');
var v = require('voca');
exports.index = async (req, res) => {
  try {
    let pages = await readPdfText(req.file.path);
    pages = pages
      .map((page) => {
        let index = page.lines.findIndex((item) =>
          v.includes(item.toLocaleLowerCase(), 'pr number')
        );
        return page.lines[index + 1];
      })
      .map((item) => item.split('/')[0])
      .map((item) => item.split('     '))
      .map((item) => {
        return item
          .map((item) => item.trim())
          .filter((item) => v.isDigit(item));
      })
      .map((item) => item[0]);

    return res.send({
      message: [...new Set(pages)],
    });
  } catch (error) {
    console.log('error');
    return res.send({
      message: error.message,
    });
  }
};
