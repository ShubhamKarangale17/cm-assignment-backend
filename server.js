const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./swagger/swagger.config');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI  ;

// Connect to MongoDB before starting the server
async function startServer() {
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('MongoDB connected successfully');
        
        // Routes - only set up after DB connection
        const blueprintRoutes = require('./routes/blueprint.routes');
        const contractRoutes = require('./routes/contract.routes');

        app.use('/api/blueprints', blueprintRoutes);
        app.use('/api/contracts', contractRoutes);

        // Health check
        app.get('/api/health', (req, res) => {
            res.json({ 
                status: 'ok', 
                message: 'Server is running',
                database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
            });
        });

        // Start server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
}

startServer();
