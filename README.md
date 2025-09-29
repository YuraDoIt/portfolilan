# Portfolio Publication API

A REST API built with **NestJS** and **Sequelize** for managing portfolios, images, and users.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Local Setup](#local-setup)  
  - [Docker Setup](#docker-setup)  
- [Environment Variables](#environment-variables)  
- [Database Configuration](#database-configuration)  
- [API Endpoints](#api-endpoints)  
- [Data Models](#data-models)  
- [Project Structure](#project-structure)  
- [Authentication & Authorization](#authentication--authorization)  
- [Soft Delete](#soft-delete)  
- [Testing](#testing)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## Features

- User authentication: signup, login, logout with JWT  
- View image feed ordered by creation date  
- Create, update, delete portfolios (multiple per user)  
- Upload, delete images inside portfolios  
- Delete own user profile (cascade deletes portfolios & images)  
- Secure password storage with bcrypt  
- Soft deletes (using Sequelize's paranoid mode)  

---

## Tech Stack

- **NestJS** — framework for building scalable Node.js server-side applications  
- **Sequelize** — ORM for PostgreSQL  
- **PostgreSQL** — relational database  
- **Docker & Docker Compose** — containerization and orchestration  
- **bcrypt** — password hashing  
- **JWT** — JSON Web Tokens for authentication  

---

## Getting Started

### Prerequisites

- Node.js v18+  
- npm or yarn  
- PostgreSQL (if running locally)  
- Docker & Docker Compose (optional)

---

### Local Setup

1. Clone repository:

   ```bash
   git clone https://github.com/your-username/portfolio-api.git
   cd portfolio-api
