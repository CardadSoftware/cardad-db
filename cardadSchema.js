import mongoose from "mongoose";
const { Schema } = mongoose;

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
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { type: String, required: true },
    federatedCred: {
        provider: {type: String, required: true},
    },
    createDate: {type: Date, default: Date.now()},
    active: { type: Boolean, default: true},
    online: Boolean
}
);

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

const UserModel = mongoose.model('User', userSchema);

const TechnicianModel = mongoose.model('Technician', technicianSchema);

const VehicleModel = mongoose.model('Vehicle', vehicleSchema);

export {UserModel, TechnicianModel, VehicleModel};