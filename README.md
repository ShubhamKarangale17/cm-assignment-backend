# Contract Manager - Backend API

REST API backend for Contract Manager application built with Express.js and MongoDB.

🌐 **API Documentation**: [https://contract-manager-backend.onrender.com/api-docs/](https://contract-manager-backend.onrender.com/api-docs/)  
🐳 **Docker Image**: [shubhamk2323/contract-manager-backend](https://hub.docker.com/r/shubhamk2323/contract-manager-backend)

## 📋 Features

- **RESTful CRUD APIs** for Blueprints and Contracts
- **MongoDB** database with Mongoose ODM
- **Swagger Documentation** - Interactive API documentation
- **CORS Enabled** - Cross-origin resource sharing configured
- **Serverless Ready** - Optimized for Vercel deployment
- **Docker Support** - Containerized deployment option

## 🛠 Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.1.5
- **Documentation**: Swagger UI Express 5.0.1
- **Environment**: dotenv 17.2.3

## 📊 Database Schemas

### Blueprint Schema

```javascript
{
  name: String,              // Blueprint name (required)
  description: String,       // Blueprint description
  totalFields: Number,       // Total number of fields
  fields: [{                 // Array of form fields
    label: String,           // Field label
    type: String,            // 'text' | 'date' | 'checkbox' | 'signature' | 'fixed'
    position: {
      x: Number,             // X coordinate
      y: Number,             // Y coordinate
      w: Number,             // Width
      h: Number              // Height
    },
    value: Mixed             // Field value (null for blueprint)
  }],
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

### Contract Schema

```javascript
{
  blueprintId: String,       // Reference to blueprint (required)
  name: String,              // Contract name (required)
  description: String,       // Contract description
  status: String,            // 'created' | 'approved' | 'sent' | 'signed' | 'locked' | 'revoked'
  fields: [{                 // Array of form fields with values
    label: String,
    type: String,
    position: {
      x: Number,
      y: Number,
      w: Number,
      h: Number
    },
    value: Mixed             // Filled field value
  }],
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

## 🚀 Setup & Installation

### Prerequisites

- Node.js 20 or higher
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?appName=<app-name>
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the production server**
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`

## 📡 API Endpoints

### Blueprints

- `GET /api/blueprints` - Get all blueprints
- `GET /api/blueprints/:id` - Get blueprint by ID
- `POST /api/blueprints` - Create new blueprint
- `PUT /api/blueprints/:id` - Update blueprint
- `DELETE /api/blueprints/:id` - Delete blueprint

### Contracts

- `GET /api/contracts` - Get all contracts
- `GET /api/contracts/:id` - Get contract by ID
- `POST /api/contracts` - Create new contract
- `PUT /api/contracts/:id` - Update contract
- `DELETE /api/contracts/:id` - Delete contract

### Health

- `GET /api/health` - Health check endpoint

## 📖 API Documentation

Interactive Swagger documentation is available at:
- **Local**: `http://localhost:5000/api-docs`
- **Production**: [https://contract-manager-backend.onrender.com/api-docs/](https://contract-manager-backend.onrender.com/api-docs/)

## 🐳 Docker Deployment

### Pull from Docker Hub

```bash
docker pull shubhamk2323/contract-manager-backend
```

### Run Pre-built Image

```bash
docker run -p 5000:5000 \
  -e MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database> \
  shubhamk2323/contract-manager-backend
```

### Build Docker Image

```bash
docker build -t contract-manager-backend .
```

### Run Docker Container

```bash
docker run -p 5000:5000 \
  -e MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database> \
  contract-manager-backend
```

### Docker Compose (with MongoDB)

```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/contract-manager
    depends_on:
      - mongo
  
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

## ☁️ Vercel Deployment

The backend is configured for Vercel serverless deployment with optimized MongoDB connection handling.

### Deploy Steps

1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `backend`
4. Add environment variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`
5. Deploy

The `vercel.json` configuration and serverless-optimized MongoDB connection are already set up.

## 📁 Project Structure

```
backend/
├── models/              # Mongoose models
│   ├── Blueprint.js
│   └── Contract.js
├── routes/              # Express routes
│   ├── blueprint.routes.js
│   └── contract.routes.js
├── swagger/             # API documentation
│   ├── schemas/
│   │   ├── blueprint.schema.js
│   │   ├── contract.schema.js
│   │   └── common.schema.js
│   └── swagger.config.js
├── public/              # Static files
│   └── swagger.html
├── .env                 # Environment variables
├── .dockerignore
├── Dockerfile
├── vercel.json          # Vercel configuration
├── package.json
└── server.js            # Main application file
```
 