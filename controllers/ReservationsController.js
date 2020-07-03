// You need to complete this controller with the required 7 actions
const viewPath = ('reservations');
const Reservation = require('../models/reservation');
const User = require('../models/user');

exports.index = async (req, res) => {
    try{
        const reservations = await Reservation
        .find()
        .populate('user')
        .sort({updatedAt: 'desc'});

        res.render(`${viewPath}/index`, {
        pageTitle: 'Reservations',
        reservations: reservations
        }); 
    }catch(error){
        req.flash('danger', `There was an error displaying the reservations: ${error}`)
        res.redirect('/')
    }
};

exports.show = async (req, res) => {
    try {
        // console.log(req.params);
    const reservation = await Reservation.findById(req.params.id)
    .populate('user');
    // req.flash('success', 'test 123');
     res.render(`${viewPath}/show`, {
         pageTitle: 'show the reservation',
         reservation: reservation
     });
    } catch (error) {
        req.flash('danger', `There was an error displaying the reservation: ${error}`)
        res.redirect('/')
    }
    
};

exports.new = (req,res) => {


    res.render(`${viewPath}/new`, {
        pageTitle: "New Reservation",
        roomTypes: ['single bed', 'double bed', 'queen', 'king']
    });
};

exports.create = async (req,res) => {
    try {
        console.log(req.session.passport);
        const { user: email } = req.session.passport;
        const user = await User.findOne({email: email});
        console.log('User', user);
        const reservation = await Reservation.create({user: user._id, ...req.body});

        req.flash('success', 'Reservation created successfully');
        res.redirect(`/reservations/${reservation.id}`);

        // const {user: email} = req.session.passport;
        // const user = await user.findOne({email: email});
        // const reservationID = await Reservation.create({user: user._id, ...req.body});        
        // req.flash('success', 'Reservation created successfully');
        
        // res.redirect(`/reservatioins/${reservationID.id}`);
    } catch (error) {
        req.flash('danger', `There was an error creating the reservation: ${error}`);
        req.session.formData = req.body;
        res.redirect('reservations/new');
    }

};

exports.edit = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        console.log(reservation);
        res.render(`${viewPath}/edit`, {
        pageTitle: 'edit the reservation',
        formData: reservation,
        roomTypes: ['single bed', 'double bed', 'queen', 'king'],
        checkIn : reservation.checkIn,
        checkOut: reservation.checkOut
     });
    } catch (error) {
        req.flash('danger', `There was an error accessing the reservation: ${error}`)
        res.redirect('/')
    }
};

exports.update = async (req, res) => {
    try {
        const { user: email } = req.session.passport;
        const user = await User.findOne({email: email});
    
        let reservation = await Reservation.findById(req.body.id);
        if (!reservation) throw new Error('Reservation could not be found');
    
        const attributes = {user: user._id, ...req.body};
        await Reservation.validate(attributes);
        await Reservation.findByIdAndUpdate(attributes.id, attributes);
    
        req.flash('success', 'The reservation was updated successfully');
        res.redirect(`/reservations/${req.body.id}`);

    //     const {user: email} = req.session.passport;
    //     const user = await user.findOne({email: email});

    //     let reservation = await Reservation.findById(req.body.id);
    //     if (!reservation) throw new Error('Reservation could not be found');
        
    //     const attributes = {user: user._id, ...req.body};

    // await Reservation.validate(req.body);

    // await Reservation.findByIdAndUpdate(req.body.id, req.body)
  
    //   req.flash('success', 'The reservation was updated successfully');
    //   res.redirect(`/reservations/${req.body.id}`);
    } catch (error) {
      req.flash('danger', `There was an error updating this reservation: ${error}`);
      res.redirect(`/reservations/${req.body.id}/edit`);
    }
};


exports.delete = async (req, res) => {
    try {
          console.log(req.body);
          await Reservation.deleteOne({_id: req.body.id});
          req.flash('success', 'The reservation was deleted successfully');
          res.redirect(`/reservations`);
        } catch (error) {
          req.flash('danger', `There was an error deleting this reservation: ${error}`);
          res.redirect(`/reservations`);
        }
};




