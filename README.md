# Rahi - Your Personal Travel Companion 🌎

![Rahi Logo](public/logo.png)

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-4.19.2-green)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.8.0-green)](https://www.mongodb.com/)

## 🌟 Overview

Rahi is an AI-powered travel planning application that creates personalized itineraries based on your preferences, interests, and budget. From must-see attractions to hidden gems, Rahi helps you plan the perfect trip with real-time data integration and optimized travel experiences.

### 🎯 Key Features

- **Personalized Itineraries**: AI-driven customized daily plans
- **Real-Time Data Integration**: Up-to-date information on attractions and activities
- **Budget Management**: Comprehensive cost breakdown and tracking
- **Interactive Maps**: Visual route planning and location discovery
- **Accommodation Recommendations**: Curated lodging options
- **Transportation Planning**: Efficient route suggestions
- **Multi-Platform Support**: Seamless experience across devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- MongoDB
- Git

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/rishabhguptajs/rahiapp.git
cd rahiapp
```

2. **Set Up Client**
```bash
cd client
npm install
cp .env.example .env.local
```

3. **Set Up Server**
```bash
cd ../server
npm install
cp .env.example .env
```

4. **Configure Environment Variables**

Client (.env.local):
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8080
```

Server (.env):
```env
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
PORT=8080
```

5. **Start Development Servers**

In separate terminals:
```bash
# Client (from client directory)
npm run dev

# Server (from server directory)
npm start
```

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- React 18
- Tailwind CSS
- Clerk Authentication
- Framer Motion
- MapLibre GL

### Backend
- Express.js
- MongoDB
- Mongoose
- Google AI (Gemini)
- Node.js

## 📖 Documentation

- [Contributing Guide](/.github/CONTRIBUTING.md)
- [API Documentation](/docs/api.md)
- [Environment Setup](/docs/environment.md)

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](/.github/CONTRIBUTING.md) before submitting a pull request.

### Mentorship

Our team is committed to helping new contributors. Feel free to reach out to our maintainers:

- **Rishabh Gupta** - [LinkedIn](https://www.linkedin.com/in/rishabhguptajs)
- **Pulkit Kumar** - [LinkedIn](https://www.linkedin.com/in/pulkit-kumar-199534201/)
- **Navya Bijoy** - [LinkedIn](https://www.linkedin.com/in/navya-bijoy-883a35249/)

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🌐 Connect With Us

- [LinkedIn](https://www.linkedin.com/company/travelwithrahi/)
- [Instagram](https://www.instagram.com/explorewithrahi/)
- [Twitter](https://twitter.com/ExploreWithRahi)
- Email: support@rahiapp.tech

## 🎯 Project Roadmap

### Current Version (v0.1.0)
- Basic itinerary planning
- User authentication
- Map integration
- Basic AI recommendations

### Upcoming Features
- Advanced AI trip optimization
- Social sharing capabilities
- Offline mode
- Mobile applications
- Group trip planning
- Local expert connections

## 💪 Support

If you find any bugs or have feature requests, please create an issue in the [Issue Tracker](https://github.com/rishabhguptajs/rahiapp/issues).

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape Rahi
- Special thanks to our early adopters and testers
- Built with support from various open-source communities

---

<p align="center">Made with ❤️ by the Rahi Team</p>