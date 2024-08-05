const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
    username: String,
    items: [
        {
            name: String,
            size: Number,
            quantity: Number
        }
    ],
    dateTime: String,
    location: String,
    bill: Number
});

// Pre-save hook to format the date
OrderSchema.pre('save', function (next) {
    this.dateTime = moment().format('DD/MM/YYYY h:mm a');
    next();
});

const Order = mongoose.model('orders', OrderSchema);

module.exports = Order;