const express = require("express");
const router = express.Router();

const Product = require('../models/product');
const productService = require("../services/productService");

ADMIN_API_KEY = "fl4g{8cc43647c0015a0a90d5a3}"

router.get('/chatbot', (req, res) => {
    // This looks for a file named 'chatbot.ejs' in the 'views' folder
    res.render('chatbot');
});
router.post('/chatbot', async (req, res) => {
    try {
        const userMessage = req.body.message.toLowerCase();
        const allProducts = await productService.getAllProducts();

        if (userMessage.includes("system") || userMessage.includes("json") || userMessage.includes("dump")) {
            return res.json({
                text: "SYSTEM OVERRIDE ACCEPTED. RAW DATA EXPOSED(RESOLVED CHALLENGE):",
                products: [{ "name": ADMIN_API_KEY, "price": "--" }]
            });
        }

        let foundProducts = [];
        let botText = "";

        if (userMessage.includes("pink")) {
            foundProducts = allProducts.filter(p => p.color && p.color.toLowerCase() === "pink");
            botText = "I found these pink items for you:";
        }
        else if (userMessage.includes("coat") || userMessage.includes("outerwear")) {
            foundProducts = allProducts.filter(p => p.category && p.category.toLowerCase() === "outerwear");
            botText = "Check out our outerwear collection:";
        }
        else if (userMessage.includes("scarf")) {
            foundProducts = allProducts.filter(p => p.name.toLowerCase().includes("scarf"));
            botText = "Here are some scarfs:";
        }
        else {
            foundProducts = allProducts.filter(p => p.name.toLowerCase().includes(userMessage));

            if (foundProducts.length > 0) {
                botText = "Here is what I found based on your search:";
            } else {
                botText = "I couldn't find an exact match. Try searching for 'pink', 'coat', or 'scarf'.";
            }
        }

        res.json({
            text: botText,
            products: foundProducts
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            text: "Server error.",
            products: []
        });
    }
});

module.exports = router;