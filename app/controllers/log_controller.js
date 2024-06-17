var fs = require("fs");

exports.logs = async (req, res, next) => {
  try {
    let date_ob = new Date();
    let year = date_ob.getFullYear();
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let day = ("0" + date_ob.getDate()).slice(-2);
    let today = year + "-" + month + "-" + day;
    
    fs.readFile("logs/" + today + ".txt", 'utf8', function (err, data) {
      console.log("logs requested");
      res.send('<pre>' + data + '</pre>');
    });

  } catch (error) {
    next(error);
  }
};
