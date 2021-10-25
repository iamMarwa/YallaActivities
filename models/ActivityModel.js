const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        location:{
            type: String,
            required: true
        },
        date:{
            type: String,
            required: true
        },
        category:{
            type: String,
            enum: ['Hiking', 'Camping', 'Yoga', 'Surfing'],
            required: true
        },
        price:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        imageUrl:{
            type: String,
            required: true
        }
    }
)
const ActivityModel = mongoose.model("activities", ActivitySchema);

module.exports = ActivityModel;