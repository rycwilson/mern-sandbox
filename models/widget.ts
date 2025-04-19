import { Schema, type SchemaDefinition, Types, model } from 'mongoose';
import { WIDGET_CATEGORY } from '../utils/constants.ts';

interface Widget {
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
    enum: Object.values(WIDGET_CATEGORY),
    default: WIDGET_CATEGORY.A,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
};

const options = { timestamps: true };

const widgetSchema = new Schema<Widget>(widgetAttributes, options);

export default model('Widget', widgetSchema);