import mongoose from 'mongoose';

const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; 
  }

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log('Db not connected');
    console.log(error);
    throw error; // Reject by throwing the error
  }
};

export default connectToDB;