const cron = require("node-cron");
const Activity = require("../models/activityModel");

cron.schedule("*/5 * * * *", async () => {
  console.log("Running CRM email batch...");

  try {
    const usersActivities = await Activity.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            email: "$email",
            productId: "$productId",
          },
          totalScore: { $sum: "$score" },
          lastActivity: { $max: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: {
            userId: "$_id.userId",
            email: "$_id.email",
          },
          products: {
            $push: {
              product: "$product",
              totalScore: "$totalScore",
            },
          },
        },
      },
    ]);
    usersActivities.forEach((user) => {
      console.log(`Would send recommendations to: ${user._id.email}`);
      console.log("Top products:", user.products.slice(0, 5));
    });

    // Cleanup processed activities
    await Activity.deleteMany({
      createdAt: { $lt: new Date(Date.now() - 5 * 60 * 1000) },
    });
  } catch (error) {
    console.error("CRM cron job error:", error);
  }
});
