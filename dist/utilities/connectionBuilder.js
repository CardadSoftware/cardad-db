import mongoose from 'mongoose';
// Create and export a connection function
const ConnectDB = async (uri, options = {}) => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ...options,
        });
        console.log('Database connected successfully');
    }
    catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
};
export { ConnectDB };
