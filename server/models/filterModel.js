const mongoose = require('mongoose');

const filtersSchema = new mongoose.Schema(
    {
        endYear: { 
            type: Number, 
            default: new Date().getFullYear() 
        },
        topicsFilter: { 
            type: String, 
            default: 'All' 
        },
        sectorFilter: { 
            type: String, 
            default: 'All' 
        },
        regionFilter: { 
            type: String, 
            default: 'All' 
        },
        PESTFilter: { 
            type: String, 
            default: 'All' 
        },
        sourceFilter: 
        { type: String, 
            default: 'All' 
        },
        SWOTFilter: { 
            type: String, 
            default: 'All' 
        },
},
{
    timestamps: true
}
);

const Filters = mongoose.model('Filters', filtersSchema);

module.exports = Filters;
