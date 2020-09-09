const fs = require('fs');
const path = require('path');

module.exports = function (...pathArg) {
  const filePath = path.join(...pathArg);
  return fs.readFileSync(filePath, 'utf-8');
}