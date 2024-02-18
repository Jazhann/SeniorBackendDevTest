# Ecommerce Microservices Project

This project implements a domain-driven design (DDD) for an e-commerce system. It features microservices built with NestJS in a Nx monorepo, data management with TypeORM, event handling through Kafka, and containerization with Docker.

## Technologies

- Nx: Extensible dev tools for monorepos, providing a standardized structure and shared configurations.
- NestJS: Progressive Node.js framework for scalable server-side applications.
- TypeORM: ORM library for TypeScript and JavaScript.
- Kafka: Distributed event streaming platform for real-time data processing.
- Docker: Platform for containerizing and deploying applications.
- MariaDB: Open-source relational database management system.
- Helmet: Middleware for enhancing Express.js app security.
- JWT: Method for secure transmission of information between parties as a JSON object.
- Swagger: API design tool for building, documenting, and consuming RESTful web services.

# Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: This project requires Node.js version 20.x.x or newer. You can download it from [nodejs.org](https://nodejs.org/).
- To get the system up and running, ensure you have Docker and Docker Compose installed on your machine.

## Installation

1. Install Node.js dependencies (Optional if running services in Docker):

```
npm install
```

2. Build and start the services using Docker Compose:

```
npm run docker:start
```

## Configuration

Each microservice requires a .env file for environment variables. Here are the necessary variables with generic placeholders:

### API Gateway .env

```
KAFKA_CLIENTID=api-gateway
KAFKA_BROKERS=kafka:9092
KAFKA_GROUPID=api-gateway-group
DB_TYPE=mariadb
DB_HOST=mariadb
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=test123
DB_DATABASE=ecommerce
```

### Authentication Service .env

```
KAFKA_CLIENTID=authentication-service
KAFKA_BROKERS=kafka:9092
KAFKA_GROUPID=authentication-service-group
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=24h
BCRYPT_SALT=your_bcrypt_salt
DB_TYPE=mariadb
DB_HOST=mariadb
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=test123
DB_DATABASE=ecommerce
```

### Order Service .env

```
KAFKA_CLIENTID=order-service
KAFKA_BROKERS=kafka:9092
KAFKA_GROUPID=order-service-group
DB_TYPE=mariadb
DB_HOST=mariadb
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=test123
DB_DATABASE=ecommerce
```

### Product Catalog Service .env

```
KAFKA_CLIENTID=product-catalog-service
KAFKA_BROKERS=kafka:9092
KAFKA_GROUPID=product-catalog-service-group
DB_TYPE=mariadb
DB_HOST=mariadb
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=test123
DB_DATABASE=ecommerce
```

## API Documentation

API documentation is automatically generated using Swagger. Once the services are running, you can access the API documentation at:

- API Gateway: http://localhost:3003/api/docs

## Architecture Overview

The system's architecture follows DDD principles, organizing the solution around the business domain and its logic.

### Microservices

- API Gateway: Routes requests to various services.
- Authentication Service: Manages user authentication and authorization.
- Order Service: Handles order creation, modification, and querying.
- Product Catalog Service: Manages product listings, details, and inventory.

## Docker Deployment

Dockerfiles in each service directory ensure proper environment setup and application launching. The docker-compose.yml file orchestrates the service containers along with Kafka, Zookeeper, and MariaDB.

## Development and Testing

For local development:

```
npm run docker:start:dev
```

Run tests for a specific service with:

```
npm run test:<service-name>
```

Run all test:

```
npm run test:all
```

## Contributing

Contributions to improve the E-Commerce Microservices System are welcome. For significant changes, please open an issue first to discuss what you would like to change. Ensure to update or add tests as appropriate.

## License

This project is licensed under the MIT License.
