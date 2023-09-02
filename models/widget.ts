import mongoose from 'mongoose'

const widgetAttributes = {
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
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
}
const options = { timestamps: true };
const widgetSchema = new mongoose.Schema(widgetAttributes, options)

export default mongoose.model('Widget', widgetSchema)