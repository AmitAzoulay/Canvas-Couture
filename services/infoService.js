const Products = require("../models/product")
const User = require("../models/user")
const Order = require("../models/orders")


async function getAllStatistics(category) {
    try {
        // Query 1: Top 5 Expensive Orders
        const topExpensiveOrders = await Order.aggregate([
            { $match: { ordered: true } },  // Filter to only include orders where ordered is true
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$_id",
                    totalOrderCost: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
                    orderDate: { $first: "$orderDate" },
                }
            },
            { $sort: { totalOrderCost: -1 } },
            { $limit: 5 }
        ]);

        // Query 2: Sales by Category
        const salesByCategory = await Order.aggregate([
            { $match: { ordered: true } },  // Filter to only include orders where ordered is true
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" },
            {
                $group: {
                    _id: "$productDetails.category",
                    totalSales: { $sum: "$items.quantity" }
                }
            },
            { $sort: { totalSales: -1 } }
        ]);

        return {
            topExpensiveOrders,
            salesByCategory
        };
    } catch (error) {
        console.error('Error fetching statistics:', error);
        throw new Error('Error fetching combined statistics');
    }
}


module.exports = {
    getAllStatistics,
};