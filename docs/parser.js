const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

class Parser {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
  }

  parseCSV() {
    try {
      const fileContent = fs.readFileSync(this.filePath, 'utf8');
      return parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });
    } catch (error) {
      throw new Error(`Error parsing CSV file: ${error.message}`);
    }
  }

  parseJSON() {
    try {
      const fileContent = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(fileContent);
    } catch (error) {
      throw new Error(`Error parsing JSON file: ${error.message}`);
    }
  }

  parseFile() {
    const ext = path.extname(this.filePath).toLowerCase();
    switch (ext) {
      case '.csv':
        return this.parseCSV();
      case '.json':
        return this.parseJSON();
      default:
        throw new Error(`Unsupported file format: ${ext}`);
    }
  }
}

module.exports = Parser;