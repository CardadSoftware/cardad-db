const mongoose = require("mongoose");
const { Schema } = mongoose;

const appSettingSchema = new Schema(
    {
        name: { type: String, required: true },
        apiSettings: 
        {
            baseUrl: String
        }
    }, { collection: 'appSettings' });

const AppSettingsModel = mongoose.model('appSettings', appSettingSchema);
module.exports = AppSettingsModel;