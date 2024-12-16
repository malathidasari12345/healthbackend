const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");

// Campaign Routes
router.post("/", campaignController.addCampaign);
router.get("/", campaignController.getAllCampaigns);
router.get("/:id", campaignController.getCampaignById);
router.put("/:id", campaignController.updateCampaign);
router.delete("/:id", campaignController.deleteCampaign);

module.exports = router;
