const { blueprintSchema, blueprintCreateSchema, blueprintUpdateSchema } = require('./schemas/blueprint.schema');
const { contractSchema, contractCreateSchema, contractUpdateSchema } = require('./schemas/contract.schema');
const { errorSchema, successMessageSchema } = require('./schemas/common.schema');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Contract Manager API',
    version: '1.0.0',
    description: 'API documentation for Contract Manager application',
    contact: {
      name: 'API Support',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      FormField: {
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
              x: { type: 'number' },
              y: { type: 'number' },
              w: { type: 'number' },
              h: { type: 'number' }
            }
          },
          value: {
            description: 'Value of the field',
            nullable: true
          }
        }
      },
      Blueprint: blueprintSchema,
      BlueprintCreate: blueprintCreateSchema,
      BlueprintUpdate: blueprintUpdateSchema,
      Contract: contractSchema,
      ContractCreate: contractCreateSchema,
      ContractUpdate: contractUpdateSchema,
      Error: errorSchema,
      SuccessMessage: successMessageSchema,
    },
  },
  paths: {
    '/api/blueprints': {
      get: {
        tags: ['Blueprints'],
        summary: 'Get all blueprints',
        description: 'Retrieve a list of all blueprints',
        responses: {
          200: {
            description: 'List of blueprints',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Blueprint' }
                }
              }
            }
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      post: {
        tags: ['Blueprints'],
        summary: 'Create a new blueprint',
        description: 'Create a new blueprint with fields',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/BlueprintCreate' }
            }
          }
        },
        responses: {
          201: {
            description: 'Blueprint created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Blueprint' }
              }
            }
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/blueprints/{id}': {
      get: {
        tags: ['Blueprints'],
        summary: 'Get blueprint by ID',
        description: 'Retrieve a specific blueprint by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Blueprint ID',
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Blueprint found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Blueprint' }
              }
            }
          },
          404: {
            description: 'Blueprint not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      put: {
        tags: ['Blueprints'],
        summary: 'Update blueprint',
        description: 'Update an existing blueprint',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Blueprint ID',
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/BlueprintUpdate' }
            }
          }
        },
        responses: {
          200: {
            description: 'Blueprint updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Blueprint' }
              }
            }
          },
          404: {
            description: 'Blueprint not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Blueprints'],
        summary: 'Delete blueprint',
        description: 'Delete a blueprint by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Blueprint ID',
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Blueprint deleted successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessMessage' }
              }
            }
          },
          404: {
            description: 'Blueprint not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/contracts': {
      get: {
        tags: ['Contracts'],
        summary: 'Get all contracts',
        description: 'Retrieve a list of all contracts',
        responses: {
          200: {
            description: 'List of contracts',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Contract' }
                }
              }
            }
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      post: {
        tags: ['Contracts'],
        summary: 'Create a new contract',
        description: 'Create a new contract based on a blueprint',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ContractCreate' }
            }
          }
        },
        responses: {
          201: {
            description: 'Contract created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Contract' }
              }
            }
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/contracts/{id}': {
      get: {
        tags: ['Contracts'],
        summary: 'Get contract by ID',
        description: 'Retrieve a specific contract by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Contract ID',
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Contract found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Contract' }
              }
            }
          },
          404: {
            description: 'Contract not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      put: {
        tags: ['Contracts'],
        summary: 'Update contract',
        description: 'Update an existing contract',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Contract ID',
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ContractUpdate' }
            }
          }
        },
        responses: {
          200: {
            description: 'Contract updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Contract' }
              }
            }
          },
          404: {
            description: 'Contract not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Contracts'],
        summary: 'Delete contract',
        description: 'Delete a contract by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Contract ID',
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Contract deleted successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessMessage' }
              }
            }
          },
          404: {
            description: 'Contract not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        description: 'Check if the server is running',
        responses: {
          200: {
            description: 'Server is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

module.exports = swaggerDefinition;
