# Tourism Website

A modern, responsive tourism website built with React and Material-UI that helps users explore and book travel destinations.

## Features

- **Modern UI/UX**: Clean and responsive design using Material-UI components
- **User Authentication**: Secure login and signup functionality using Firebase
- **Interactive Navigation**: Smooth scrolling to different sections
- **Destination Showcase**: Beautiful display of travel destinations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **User Profiles**: Personal dashboard for users to manage their information
- **Firebase Integration**: Real-time database and authentication

## Tech Stack

- **Frontend**: React.js
- **UI Framework**: Material-UI (MUI)
- **Routing**: React Router
- **Authentication**: Firebase Auth
- **Database**: Firebase Realtime Database
- **State Management**: React Hooks
- **Styling**: Emotion (MUI's styling solution)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14.0 or higher)
- npm (usually comes with Node.js)
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tourism-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
PORT=3001

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3001`.

## Project Structure

```
tourism-website/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Home/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   └── Destinations/
│   ├── firebase.js
│   ├── App.js
│   └── index.js
├── .env
└── package.json
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password and Google Sign-in)
4. Create a Realtime Database
5. Get your Firebase configuration and add it to `.env`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Deployment

This project can be deployed to various platforms:

1. **Firebase Hosting**:
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

2. **Vercel**:
```bash
npm install -g vercel
vercel
```

3. **Netlify**: Connect your GitHub repository to Netlify for automatic deployments

## Features to Add

- [ ] Search functionality for destinations
- [ ] User reviews and ratings
- [ ] Booking system
- [ ] Interactive maps
- [ ] Multi-language support
- [ ] Dark mode

## Troubleshooting

Common issues and solutions:

1. **Firebase Configuration**:
   - Ensure all Firebase environment variables are correctly set in `.env`
   - Check if Firebase is initialized properly in `firebase.js`

2. **npm Install Issues**:
   ```bash
   npm clean-install
   # or
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Port Already in Use**:
   - Change the PORT in `.env`
   - Kill the process using the port: `lsof -i :3001`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/tourism-website](https://github.com/yourusername/tourism-website)
