import mongoose from 'mongoose';
declare const AppSettingSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    collection: string;
}>, {
    name: string;
    apiSettings?: {
        baseUrl?: string | undefined;
    } | undefined;
}>;
declare const AppSettingsModel: mongoose.PassportLocalModel<any>;
export default AppSettingSchema;
export { AppSettingsModel };
