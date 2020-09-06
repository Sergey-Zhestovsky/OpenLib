const fs = require('fs');
const path = require('path');

module.exports = function (type) {
  const filePath = path.join(__dirname, '../models', type);
  return fs.readFileSync(filePath, 'utf-8');
}