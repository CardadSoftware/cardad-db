const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require('node:crypto');
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
        sparse: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    createDate: {type: Date, default: Date.now()},
    active: { type: Boolean, default: true},
    online: Boolean,
    salt: String,
    hash: String
}
);

const clientSchema = new Schema(
    {
        name: String,
        clientId: String,
        clientSecret: {
            salt: String,
            hash: String
        },
        tenantId: String
    });
clientSchema.methods.generateClientSecret = () => {
    var clientSecretString = crypto.randomBytes(16)
    .toString('base64')
    .slice(0, 16);
    this.clientSecret.salt = crypto.randomBytes(16).toString('hex');
    this.clientSecret.hash = crypto.pbkdf2Sync(clientSecretString, this.clientSecret.salt, 1000, 64).toString('hex');
};

const accessTokenSchema = new Schema(
    {
        accessToken: { type: String, required: true },
        refreshToken: String,
        client: {type: clientSchema, required: true},
        user: {type: userSchema, required: true}
    });

userSchema.plugin(passportLocalMongoose);

const shopSchema = new Schema({
    name: String,
    address: {
        streetAddress: String,
        city: String,
        zip: String,
        state: String
    },
    owner: String,

});

const vehicleSchema = new Schema({
    name: { type: String, required: true },
    model: String,
    make: String,
    year: String,
    vin: String,
    licNumber: String,
    mileage: Number
    });
const specialties = ['None','Engine','Transmission','Auto Body', 'Paint', 'Upholstery'];
const Specialty = new Schema({
    value: {type: String, enum: specialties}
});

const technicianSchema = new Schema({
    ...userSchema.obj,
    specialties: {type: [Specialty], default: [{value: 'None'}]},
    bookable: Boolean,
    rating: {type: Number, enum: [1,2,3,4,5]},
    certifications: [String],
    company: String
});

const carMakeSchema = new Schema(
    {
        makeId: { type: Number, required: true},
        makeName: { type: String, required: true } ,
        vehicleTypeId: { type: Number, required: true },
        vehicleTypeName: { type: String, required: true},
        models: {type: [{ type: Schema.Types.ObjectId, ref: 'CarModel'}]}
    }
);

const carModelSchema = new Schema(
    {
        makeId: {type: Number, required: true},
        modelId: {type: Number, required: true},
        modelName: {type: String, required: true}
    }
);

const invoiceSchema = new Schema(
    {
        invoiceName: String,
        description: String,
        referenceNumber: String,
        totalCharge: Number,
        charges: [
            {
               type: Schema.Types.ObjectId, ref: 'Charge' 
            }],
    }
);

const chargeSchema = new Schema({
    description: { type: String, required: true },
    quantity: {type: Number, default: 1},
    rateType: {type: String, enum:['hour','piece','job']},
    rate: { type: Number, required: true, default: 0},
    discount: Number,
    createDate: {type: Date, default: Date.now()}
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

const payToSchema = new Schema(
    {
        name: String,
        shops: [{ type: Schema.Types.ObjectId, ref:'Shop'}],
        paymentTerms: String
    });

const jobSchema = new Schema({
    jobName: String,
    invoices: [
        {type: Schema.Types.ObjectId, ref:'Invoice'}
    ],
    customer: {type: Schema.Types.ObjectId, ref: 'User', required: true},

});
// add virtual prop for total charges
chargeSchema.virtual('totalCharge').get(function()
{
    return (this.quantity || 1) * this.rate;
});

const InvoiceModel = db.model('Invoice', invoiceSchema);

const PayToModel = db.model('PayTo', payToSchema);

const ChargeModel = db.model('Charge', chargeSchema);

const ShopModel = db.model('Shop', shopSchema);

const JobModel = db.model('Job', jobSchema);

const UserModel = db.model('User', userSchema);

const TechnicianModel = db.model('Technician', technicianSchema);

const VehicleModel = db.model('Vehicle', vehicleSchema);

const CarMakeModel = db.model('CarMake', carMakeSchema);

const CarModelModel = db.model('CarModel', carModelSchema);

const ClientModel = db.model('Client', clientSchema);

const AccessTokenModel = db.model('AccessToken', accessTokenSchema);

exports.InvoiceModel = InvoiceModel;
exports.PayToModel = PayToModel;
exports.VehicleModel = VehicleModel;
exports.UserModel = UserModel;
exports.TechnicianModel = TechnicianModel;
exports.JobModel = JobModel;
exports.ShopModel = ShopModel;
exports.ChargeModel = ChargeModel;
exports.CarMakeModel = CarMakeModel;
exports.CarModelModel = CarModelModel;
exports.ClientModel = ClientModel;
exports.AccessTokenModel = AccessTokenModel;
exports.db = db;
