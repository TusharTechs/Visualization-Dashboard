const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
    {
        intensity: { 
            type: Number, 
            required: true 
        },
        likelihood: { 
            type: Number, 
            required: true 
        },
        relevance: 
        { 
            type: Number, 
            required: true 
        },
        year: 
        { 
            type: Number, 
            required: true 
        },
        country: 
        { 
            type: String, 
            required: true 
        },
        topics: 
        { 
            type: [String], 
            required: true 
        },
        region: 
        { 
            type: String, 
            required: true 
        },
        city: 
        { 
            type: String, 
            required: true 
        },
},
{
    timestamps: true
}
);

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;