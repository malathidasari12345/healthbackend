const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
    goalAmount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Campaign', campaignSchema);
