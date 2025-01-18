
# Contributing to Rahi

First off, thank you for considering contributing to Rahi! It's people like you that make Rahi such a great tool for travelers.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Project Structure](#project-structure)
  - [Development Environment](#development-environment)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Guidelines](#development-guidelines)
  - [Client-Side Development](#client-side-development)
  - [Server-Side Development](#server-side-development)
  - [Code Style](#code-style)
  - [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to support@rahiapp.tech.

## Getting Started

### Project Structure

The project is divided into two main parts:

```
rahi/
├── client/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # Reusable React components
│   │   └── context/       # React context providers
│   └── public/            # Static assets
└── server/                # Express.js backend application
    ├── controllers/       # Route controllers
    ├── models/           # Mongoose models
    ├── routes/           # Express routes
    └── helpers/          # Helper functions
```

### Development Environment

1. **Prerequisites**
   - Node.js (v18 or higher)
   - npm or yarn
   - MongoDB
   - Git

2. **Setting Up Local Development**

```bash
# Clone the repository
git clone https://github.com/rishabhguptajs/rahiapp.git
cd rahiapp

# Install dependencies for client
cd client
npm install

# Install dependencies for server
cd ../server
npm install

# Create environment files
cp .env.example .env
```

3. **Environment Variables**

Create `.env` files in both client and server directories similar to the .env.example files provided in both directories.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in the [Issues](https://github.com/rishabhguptajs/rahiapp.git/issues)
2. If not, create a new issue using the bug report template
3. Include:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details if any

### Suggesting Enhancements

1. Check existing issues for similar suggestions
2. Create a new issue describing your enhancement
3. Include:
   - Clear use case
   - Expected benefits
   - Possible implementation details

### Pull Requests

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test your changes locally, ensuring they work as expected
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

## Development Guidelines

### Client-Side Development

- Use TypeScript for new components
- Follow the existing component structure
- Use Tailwind CSS for styling
- Implement responsive designs
- Add JSDoc comments for components and functions

### Server-Side Development

- Use ES modules
- Follow the MVC pattern
- Add proper error handling
- Include input validation
- Document API endpoints
- Write meaningful comments

### Code Style

- Use meaningful variable and function names
- Follow existing code formatting
- Use async/await for asynchronous operations
- Keep functions small and focused
- Add proper error handling

## Documentation

- Update README.md if needed
- Add JSDoc comments for new functions
- Document API changes
- Include comments for complex logic

Thank you for contributing to Rahi! 🚀