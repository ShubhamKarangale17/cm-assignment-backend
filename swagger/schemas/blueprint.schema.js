const formFieldSchema = {
  type: 'object',
  properties: {
    label: {
      type: 'string',
      description: 'Label for the field'
    },
    type: {
      type: 'string',
      enum: ['text', 'date', 'checkbox', 'signature', 'fixed'],
      description: 'Type of the form field'
    },
    position: {
      type: 'object',
      properties: {
        x: { type: 'number', description: 'X coordinate' },
        y: { type: 'number', description: 'Y coordinate' },
        w: { type: 'number', description: 'Width' },
        h: { type: 'number', description: 'Height' }
      },
      required: ['x', 'y', 'w', 'h']
    },
    value: {
      description: 'Value of the field',
      nullable: true
    }
  },
  required: ['type', 'position']
};

const blueprintSchema = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      description: 'Unique identifier'
    },
    name: {
      type: 'string',
      description: 'Blueprint name'
    },
    description: {
      type: 'string',
      description: 'Blueprint description'
    },
    totalFields: {
      type: 'number',
      description: 'Total number of fields'
    },
    fields: {
      type: 'array',
      items: formFieldSchema,
      description: 'Array of form fields'
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

const blueprintCreateSchema = {
  type: 'object',
  required: ['name', 'totalFields', 'fields'],
  properties: {
    name: {
      type: 'string',
      description: 'Blueprint name'
    },
    description: {
      type: 'string',
      description: 'Blueprint description'
    },
    totalFields: {
      type: 'number',
      description: 'Total number of fields'
    },
    fields: {
      type: 'array',
      items: formFieldSchema,
      description: 'Array of form fields'
    }
  }
};

const blueprintUpdateSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Blueprint name'
    },
    description: {
      type: 'string',
      description: 'Blueprint description'
    },
    totalFields: {
      type: 'number',
      description: 'Total number of fields'
    },
    fields: {
      type: 'array',
      items: formFieldSchema,
      description: 'Array of form fields'
    }
  }
};

module.exports = {
  formFieldSchema,
  blueprintSchema,
  blueprintCreateSchema,
  blueprintUpdateSchema
};
