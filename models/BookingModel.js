const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        imageUrl:{
            type: String,
            required: true
        }
    }
)
const BookingModel = mongoose.model("booking", BookingSchema);

module.exports = BookingSchema;