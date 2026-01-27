import Campaign from "../models/Campaign.js";
import CampaignMessage from "../models/CampaignMessage.js";

// GET CAMPAIGN ANALYTICS
export const getCampaignAnalytics = async (req, res) => {
  const { campaignId } = req.params;

  const campaign = await Campaign.findOne({
    _id: campaignId,
    createdBy: req.user._id,
  });

  if (!campaign) {
    return res
      .status(404)
      .json({ message: "Campaign not found" });
  }

  const stats = await CampaignMessage.aggregate([
    { $match: { campaign: campaign._id } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const summary = {
    total: 0,
    sent: 0,
    delivered: 0,
    read: 0,
    failed: 0,
  };

  stats.forEach((s) => {
    summary[s._id] = s.count;
    summary.total += s.count;
  });

  res.json(summary);
};
