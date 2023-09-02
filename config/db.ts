import { connect } from 'mongoose';

const connectDb = async (dbUrl: string) => connect(dbUrl);

export default connectDb;
