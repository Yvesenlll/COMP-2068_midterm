// You need to define the schema for a reservation
// The fields you require are:


const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    // associated user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // numOfOccupants (number of occupants)
    numOfOccupants: {
        type: Number,
        required: true
    },
    // roomType (options are 'single bed', 'double bed', 'queen', 'king')
    roomType: {
        type: String,
        enum: ['single bed', 'double bed', 'queen', 'king'],
        default: 'single'
    },
    // checkIn (just date, not time)
    // checkOut (just date, not time)
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    }
},{
    timestamps: true
});

//Query helper
ReservationSchema.query.single = function(){
    return this.where({
        status: 'single bed'
    })
};
ReservationSchema.query.double = function(){
    return this.where({
        status: 'double bed'
    })
};
ReservationSchema.query.queen = function(){
    return this.where({
        status: 'queen'
    })
};
ReservationSchema.query.king = function(){
    return this.where({
        status: 'king'
    })
};



module.exports = mongoose.model('Reservation', ReservationSchema);