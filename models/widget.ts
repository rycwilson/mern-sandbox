import { Schema, type SchemaDefinition, Types, model } from 'mongoose';
import { WIDGET_CATEGORY } from '../utils/constants.ts';
import { param, body } from 'express-validator';

interface WidgetInterface {
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

const widgetSchema = new Schema<WidgetInterface>(widgetAttributes, { timestamps: true });

// any schema configurations can be added here, must come before creating the model

const Widget = model<WidgetInterface>('Widget', widgetSchema);

export const createWidgetValidation = ([
  body('name')
    .notEmpty()
    .withMessage('Widget name is required')
    .isLength({ max: 50 })
    .withMessage('Widget name must be at most 50 characters long'),
  body('category')
    .optional()
    .isIn(['A', 'B', 'C'])
    .withMessage('Category must be one of A, B, or C')
]);

export const accessWidgetValidation = ([
  param('id')
    .custom(async (value, { req }) => {
      const widget = await Widget.findById(value);
      // const widgetExists = await mongoose.models.Widget.exists({ _id: value });
      if (!widget) {
        throw new Error(`No widget with id: ${value}`);
      }
      const isAdmin = req.user.role === 'admin';
      const isOwner = req.user.id === widget.createdBy.toString();
      if (!isAdmin && !isOwner) {
        throw new Error('Not authorized');
      }
      return true;
    })
]);

export const updateWidgetValidation = ([
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Widget name is required')
    .isLength({ max: 50 })
    .withMessage('Widget name must be at most 50 characters long'),
  body('category')
    .optional()
    .isIn(['A', 'B', 'C'])
    .withMessage('Category must be one of A, B, or C')
]);

export default Widget;