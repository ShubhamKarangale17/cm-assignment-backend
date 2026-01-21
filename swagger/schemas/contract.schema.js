const { formFieldSchema } = require('./blueprint.schema');

const contractSchema = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      description: 'Unique identifier'
    },
    blueprintId: {
      type: 'string',
      description: 'Reference to blueprint ID'
    },
    name: {
      type: 'string',
      description: 'Contract name'
    },
    description: {
      type: 'string',
      description: 'Contract description'
    },
    status: {
      type: 'string',
      enum: ['created', 'approved', 'sent', 'signed', 'locked', 'revoked'],
      description: 'Contract status'
    },
    fields: {
      type: 'array',
      items: formFieldSchema,
      description: 'Array of form fields with values'
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Creation timestamp'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Last update timestamp'
    }
  }
};

const contractCreateSchema = {
  type: 'object',
  required: ['blueprintId', 'name', 'fields'],
  properties: {
    blueprintId: {
      type: 'string',
      description: 'Reference to blueprint ID'
    },
    name: {
      type: 'string',
      description: 'Contract name'
    },
    description: {
      type: 'string',
      description: 'Contract description'
    },
    status: {
      type: 'string',
      enum: ['created', 'approved', 'sent', 'signed', 'locked', 'revoked'],
      default: 'created',
      description: 'Contract status'
    },
    fields: {
      type: 'array',
      items: formFieldSchema,
      description: 'Array of form fields with values'
    }
  }
};

const contractUpdateSchema = {
  type: 'object',
  properties: {
    blueprintId: {
      type: 'string',
      description: 'Reference to blueprint ID'
    },
    name: {
      type: 'string',
      description: 'Contract name'
    },
    description: {
      type: 'string',
      description: 'Contract description'
    },
    status: {
      type: 'string',
      enum: ['created', 'approved', 'sent', 'signed', 'locked', 'revoked'],
      description: 'Contract status'
    },
    fields: {
      type: 'array',
      items: formFieldSchema,
      description: 'Array of form fields with values'
    }
  }
};

module.exports = {
  contractSchema,
  contractCreateSchema,
  contractUpdateSchema
};
