const ejs = require('ejs');

function successPage(req, res) {
    const { controller } = req.body;
    const html = ejs.render(controller);
    res.send(html);
}

module.exports = {
    successPage
}