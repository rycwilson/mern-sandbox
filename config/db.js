import mongoose from 'mongoose'

const connectDb = async (dbUrl) => {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  })
}

export default connectDb
