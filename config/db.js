import mongoose from 'mongoose'

const connectDb = async (dbUrl) => {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

export default connectDb
