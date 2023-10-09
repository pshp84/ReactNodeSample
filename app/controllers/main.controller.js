const Record = require('../models/record.model');
const fs = require('fs');

async function uploadFile(object) {
  return new Promise((resolve, reject) => {
    var obj = object.file;
    var name = Date.now() + obj.name;
    obj.mv(object.path + "/" + name, function (err) {
      if (err) {
        //console.log(err);
      }
      resolve(name);
    });
  });
}

function toBase64(filePath) {
  const img = fs.readFileSync(filePath);
  return img ? 'data:image/png;base64,' + Buffer.from(img).toString('base64') : "";
}

const getRecords = async (req, res) => {
  try {
    const records = JSON.parse(JSON.stringify(await Record.find({})));

    for (let i = 0; i < records.length; i++) {
      records[i].imageBuffer = toBase64(`public/${records[i].image}`);
    }
    return res.status(200).json({
      success: true,
      records: records
    });
  } catch (error) {

  }
};

const saveRecord = async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({
        success: false,
        message: "Text is required"
      });
    }

    const data = req.body;
    console.log(req.files.image);
    // req.files && req.files.image && (data.image = req.fles.image.name);
    if (req.files && req.files.image) {
      const image = await uploadFile({
        file: req.files.image,
        path: "public"
      });
      data.image = image;
    }

    const record = await Record.create(data);

    return res.status(200).json({
      success: true,
      data: record
    });

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRecords,
  saveRecord
};