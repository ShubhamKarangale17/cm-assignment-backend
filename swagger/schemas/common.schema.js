const errorSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'Error message'
    }
  }
};

const successMessageSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      description: 'Success message'
    }
  }
};

module.exports = {
  errorSchema,
  successMessageSchema
};
