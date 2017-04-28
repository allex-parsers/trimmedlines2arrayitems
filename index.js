function createTrimmedLines2ArrayItemsParser (execlib) {
  'use strict';
  var lib = execlib.lib;

  function TrimmedLines2ArrayItemsParser (prophash) {
    this.encoding = prophash.encoding || 'utf8';
  }
  TrimmedLines2ArrayItemsParser.prototype.destroy = function () {
    this.encoding = null;
  };
  function lineProcessor (tl2a, res, line) {
    line = tl2a.processLine(line.trim());
    if (line && line.length) {
      res.push(line);
    }
    return res;
  }
  TrimmedLines2ArrayItemsParser.prototype.fileToData = function (filedata) {
    return filedata.toString(this.encoding).split('\n').reduce(lineProcessor.bind(null, this), []);
  };
  TrimmedLines2ArrayItemsParser.prototype.processLine = function (line) {
    return line;
  }
  TrimmedLines2ArrayItemsParser.prototype.dataToFile = function (data) {
    if (!lib.isArray(data)) {
      return data;
    }
    return data.join('\n');
  };

  return TrimmedLines2ArrayItemsParser;
}

module.exports = createTrimmedLines2ArrayItemsParser;
