const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    unique: true
  },
  description: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  image: {
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true },
  },
  date: { 
    type: Date, 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
