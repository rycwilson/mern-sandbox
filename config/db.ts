import { connect } from 'mongoose';

export default async (dbUrl: string) => connect(dbUrl);