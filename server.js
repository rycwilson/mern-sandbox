"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
require("express-async-errors");
// database
var db_js_1 = require("./config/db.js");
// security packages
var helmet_1 = require("helmet");
var cors_1 = require("cors");
var xss_clean_1 = require("xss-clean");
var express_rate_limit_1 = require("express-rate-limit");
// routes
var auth_js_1 = require("./routes/auth.js");
var widgets_js_1 = require("./routes/widgets.js");
// middleware
var auth_js_2 = require("./middleware/auth.js");
var not_found_js_1 = require("./middleware/not-found.js");
var error_handler_js_1 = require("./middleware/error-handler.js");
var appName = 'node-api';
var app = (0, express_1.default)();
dotenv_1.default.config();
app
    .get('/', function (req, res) { return res.send('node api'); }) // just a sanity check
    .set('trust proxy', 1) // (for heroku deploy) https://www.npmjs.com/package/express-rate-limit#user-content-troubleshooting-proxy-issues
    .use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP to 100 requests per windowMs
}))
    .use(express_1.default.json()) // for accessing post data in the body
    .use((0, helmet_1.default)())
    .use((0, cors_1.default)())
    .use((0, xss_clean_1.default)())
    .use('/api/v1/auth', auth_js_1.default)
    .use('/api/v1/widgets', auth_js_2.default, widgets_js_1.default)
    .use(not_found_js_1.default)
    .use(error_handler_js_1.default);
(0, db_js_1.default)("".concat(process.env.MONGO_URI, "/").concat(appName))
    .then(start)
    .catch(function (err) { return console.log("Error connecting to database: ".concat(err.message)); });
function start() {
    var port = process.env.PORT || 8000;
    app.listen(port, function () { return console.log("".concat(appName, " server is listening on port ").concat(port, "...")); });
}
