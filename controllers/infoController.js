const infoService = require("../services/infoService")

async function getAllStatistics(req, res) {
    try {
        const statistics = await infoService.getAllStatistics();
        console.log(statistics)
        res.render("../views/info.ejs", { statistics });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    getAllStatistics
}