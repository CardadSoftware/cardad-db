import mongoose from 'mongoose';
const { Schema } = mongoose;

const AppSettingSchema = new Schema(
    {
        name: { type: String, required: true },
        apiSettings: 
        {
            baseUrl: String
        }
    }, { collection: 'appSettings' });

const AppSettingsModel = mongoose.model('appSettings', AppSettingSchema);
export default AppSettingSchema;
export { AppSettingsModel };