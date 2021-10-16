const { PDFNet } = require('@pdftron/pdfnet-node');

exports.index = async (req, res, next) => {
  try {
    await PDFNet.initialize(
      'demo:1634379058697:78a1fe8f0300000000861dbdb2cd9281480c0902d97794810747724cbd'
    );
    await PDFNet.runWithCleanup(async () => {
      const pdfdoc = await PDFNet.PDFDoc.createFromFilePath(req.file.path);
      await pdfdoc.initSecurityHandler();
      const page = await pdfdoc.getPage(1);
      const txt = await PDFNet.TextExtractor.create();

      let rect = null;
      let textResult = '';
      if (req.body.type == 'pr') {
        rect = new PDFNet.Rect(250, 449, 397, 450);
        txt.begin(page, rect);
        textResult = await txt.getAsText();
        if (textResult) {
          textResult = textResult.split('/')[0];
        }
      }
      if (req.body.type == 'sa') {
        rect = new PDFNet.Rect(400, 490, 912, 500);
        txt.begin(page, rect);
        textResult = await txt.getAsText();
        if (textResult) {
          textResult = textResult.split('/')[0];
        }
      }
      if (req.body.type == 'po') {
        rect = new PDFNet.Rect(200, 441, 350, 442);
        txt.begin(page, rect);
        textResult = await txt.getAsText();
        if (textResult) {
          textResult = textResult.split('/')[0];
        }
      }

      res.send({
        result: textResult,
      });
    });
  } catch (error) {
    res.send({
      result: 'error',
    });
  }
};
