import { connect, ConnectOptions } from 'mongoose'

const connectDb = async (dbUrl: string) => {
  connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  } as ConnectOptions)
}

export default connectDb
