const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  scanId: String,
  eggType: String,
  automaticTermination: Boolean,
  duration: String,
  device: String,
  scheduledExecution: Boolean,
  scheduledDate: String,
  scheduledTime: String,
});

const Scan = mongoose.model('Scan', scanSchema);

module.exports = Scan;
