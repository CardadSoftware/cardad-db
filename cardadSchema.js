const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1:27017';

const db = mongoose;

db.connect(mongoDB, { dbName:"cardad", useNewUrlParser: true, useUnifiedTopology: true, user: "cardadAPI", pass: "rP&7ZxRz63uEsPe1cq426R9"},(err) => {if(err){console.log("Enable to connect to DB: " + err.message + " stack: " + err.stack);} else{console.log("Connected to DB");}});


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    firstName: String,
    lastName: String,
    contacts: [{
        contactType: String,
        phoneNumber: String,
        phoneExtension: String,
        primary: Boolean
    }],
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: false,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { type: String},
    federatedCred: {
        provider: {type: String},
    },
    createDate: {type: Date, default: Date.now()},
    active: { type: Boolean, default: true},
    online: Boolean
}
);

userSchema.plugin(passportLocalMongoose);

const vehicleSchema = new Schema({
    name: { type: String, required: true },
    model: String,
    make: String,
    year: String,
    vin: String,
    licNumber: String,
    mileage: Number
    });

const Specialty = new Schema({
    value: {type: String, enum: ['None','Engine','Transmission','Auto Body', 'Paint', 'Upholstery']}
});

const technicianSchema = new Schema({
    ...userSchema.obj,
    specialties: {type: [Specialty], default: [{value: 'None'}]},
    bookable: Boolean,
    rating: {type: Number, enum: [1,2,3,4,5]},
    certifications: [String],
    company: String
});

const UserModel = db.model('User', userSchema);

const TechnicianModel = db.model('Technician', technicianSchema);

const VehicleModel = db.model('Vehicle', vehicleSchema);

exports.VehicleModel = VehicleModel;
exports.UserModel = UserModel;
exports.TechnicianModel = TechnicianModel;
exports.db = db;
