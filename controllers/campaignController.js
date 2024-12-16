const Campaign = require("../models/campaign");

// Add a new campaign
exports.addCampaign = async (req, res) => {
  try {
    const { title, description, goalAmount, startDate, endDate } = req.body;
    const image = req.file?.path || req.body.image;
    console.log(image);

    const existingCampaign = await Campaign.findOne({ title });

    if (existingCampaign) {
      return res
        .status(400)
        .json({ message: "Campaign with this title already exists" });
    }

    // If no duplicate campaign exists, proceed to create the new campaign
    const campaign = new Campaign({
      title,
      description,
      image,
      goalAmount,
      startDate,
      endDate,
    });
    await campaign.save();

    res.status(201).json({
      message: "Campaign created successfully",
      campaign,
      file: req.file,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating campaign", error });
  }
};

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json({ message: "All campaigns", campaigns });
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns", error });
  }
};

// Get a single campaign by ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });
    res.status(200).json({
      message: `Campaign with ID ${req.params.id}`,
      campaign,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaign", error });
  }
};

// Update a campaign
exports.updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, goalAmount, startDate, endDate, image } =
      req.body;
    console.log(title, description, goalAmount, startDate, endDate, image);

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      { title, description, image, goalAmount, startDate, endDate, image },
      { new: true, runValidators: true }
    );

    if (!updatedCampaign)
      return res.status(404).json({ message: "Campaign not found" });
    res
      .status(200)
      .json({ message: "Campaign updated successfully", updatedCampaign });
    console.log(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: "Error updating campaign", error });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the campaign
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Delete the campaign from the database
    await Campaign.findByIdAndDelete(id);

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.error("Error during deletion:", error.message);
    res.status(500).json({ message: "Error deleting campaign", error });
  }
};
