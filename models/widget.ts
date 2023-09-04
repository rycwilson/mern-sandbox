import { Schema, type SchemaDefinition, Types, model } from 'mongoose';

interface IWidget {
  name: string,
  category: string,
  createdBy: Types.ObjectId
}

const widgetAttributes: SchemaDefinition = {
  name: {
    type: String,
    required: [true, 'Widget name is required'],
    maxlength: 50
  },
  category: {
    type: String,
    enum: ['a', 'b', 'c'],
    default: 'a'
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
};
const options = { timestamps: true };
const widgetSchema = new Schema<IWidget>(widgetAttributes, options);

export default model('Widget', widgetSchema);