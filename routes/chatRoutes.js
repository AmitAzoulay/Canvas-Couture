const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");
const router = express.Router();

const Product = require('../models/product');
const productService = require("../services/productService");

router.get('/chatbot', (req, res) => {
    res.render('chatbot');
});
router.post('/chatbot', async (req, res) => {
    try {
        const userMessage = req.body.message.toLowerCase();
        const name = req.body.name.toLowerCase()
        const allProducts = await productService.getAllProducts();
        const client = new Anthropic({ apiKey: process.env["ANTHROPIC_API_KEY"] });
        const systemPrompt = `You are a clothing chatbot. The users name is ${name}. Recommend from these products: ${JSON.stringify(allProducts)}.`;
        console.log(systemPrompt);
        const result = await client.messages.create({ max_tokens: 4096, system: systemPrompt, messages: [{ role: "user", content: userMessage }], model: "claude-opus-4-6" });

        res.json({ text: result.content[0].text });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            text: "Server error."
        });
    }
});

module.exports = router;