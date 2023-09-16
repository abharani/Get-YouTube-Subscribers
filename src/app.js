/**
 * @openapi
 * tags:
 *   name: Subscribers
 *   description: API endpoints for managing subscribers
 */

/**
 * @openapi
 * /subscribers:
 *   get:
 *     summary: Get all subscribers
 *     description: Use this endpoint to get all the subscribers.
 *     responses:
 *       200:
 *         description: Successfully retrieved subscribers
 * 
 * /subscribers/names:
 *   get:
 *     summary: Get subscriber names
 *     description: Use this endpoint to get the names of all subscribers.
 *     responses:
 *       200:
 *         description: Successfully retrieved subscriber names
 * 
 * /subscribers/{id}:
 *   get:
 *     summary: Get a subscriber by ID
 *     description: Use this endpoint to get a subscriber by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscriber ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the subscriber
 *       404:
 *         description: Invalid ID provided
 * 
 */
const express = require("express");
const SubscriberModel = require("./models/subscribers");
const catchAsync = require("./middleware/catchAsync");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require('./swagger.js');
const app = express();

// Serve Swagger UI documentation at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Route to serve the index.html file
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Route to fetch all subscribers
app.get("/subscribers", catchAsync(async (req, res) => {
    const subscribers = await SubscriberModel.find({});
    res.send(subscribers);
}));

// Route to fetch only subscriber names and channels
app.get("/subscribers/names", catchAsync(async (req, res) => {
    const subscribername = await SubscriberModel.find({}).select("-subscribedDate -_id -__v");
    res.send(subscribername);
}));

// Route to fetch a specific subscriber by ID
app.get("/subscribers/:id", catchAsync(async (req, res) => {
    const subscriber = await SubscriberModel.findById(req.params.id);
    if (!subscriber) {
        console.log("Invalid ID, please correct it");
        res.send("Error 400: Invalid ID");
        return;
    }
    res.send(subscriber);
}));

// Default route to handle undefined routes
app.get("*", (req, res) => {
    res.status(404).send("Write correct route");
});

module.exports = app;