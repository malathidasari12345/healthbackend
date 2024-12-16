const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  public_id: { 
    type: String, 
    required: true
 }, 
  secure_url: { 
    type: String, 
    required: true
 }, 
  created_at: { 
    type: Date, 
    default: Date.now
 }, 
});

module.exports = mongoose.model('Image', ImageSchema);
