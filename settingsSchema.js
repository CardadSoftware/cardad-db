const mongoose = require("mongoose");
const { Schema } = mongoose;

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1:27017';

const db = mongoose;

db.connect(mongoDB, { dbName:"cardad", useNewUrlParser: true, useUnifiedTopology: true, user: "cardadAPI", pass: "rP&7ZxRz63uEsPe1cq426R9"},(err) => {if(err){console.log("Enable to connect to DB: " + err.message + " stack: " + err.stack);} else{console.log("Connected to DB");}});

const appSettingSchema = new Schema(
    {
        name: { type: String, required: true },
        apiSettings: 
        {
            baseUrl: String
        }
    }, { collection: 'appSettings' });

const AppSettingsModel = db.model('appSettings', appSettingSchema);
module.exports = AppSettingsModel;