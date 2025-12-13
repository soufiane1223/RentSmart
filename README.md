# RentSmart - Firebase Backend Setup

## Overview
RentSmart backend is built on Firebase, providing authentication and database services for property rental calculations and favorites management.

## Tech Stack
- **Platform**: Firebase (Google)
- **Authentication**: Firebase Auth (Email/Password + Google Sign-in)
- **Database**: Cloud Firestore (NoSQL)
- **Hosting**: Firebase Hosting (optional)

## Project Structure
```
rentSmart/
├── src/
│   ├── config/
│   │   └── firebase.js          # Firebase initialization
│   └── services/
│       ├── authService.js       # Authentication operations
│       └── firestoreService.js  # Database operations
├── firestore.rules              # Security rules
├── firestore.indexes.json       # Database indexes
├── firebase.json                # Firebase configuration
├── .env.example                 # Environment variables template
└── package.json                 # Dependencies
```

## Setup Instructions

### 1. Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Project Setup

#### Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "rentsmart")
4. Follow the setup wizard

#### Enable Authentication
1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Enable **Google** sign-in method (optional but recommended)

#### Create Firestore Database
1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode** (we have security rules)
4. Select your preferred location

#### Get Firebase Configuration
1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 4. Environment Configuration
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase credentials in `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

### 5. Deploy Firestore Rules and Indexes
```bash
# Login to Firebase
npx firebase login

# Initialize Firebase (if not already done)
npx firebase init

# Deploy Firestore rules and indexes
npx firebase deploy --only firestore:rules,firestore:indexes
```

### 6. Local Development with Emulators (Optional)
```bash
# Start Firebase emulators
npm run firebase:emulators
```

This will start:
- Auth Emulator: http://localhost:9099
- Firestore Emulator: http://localhost:8080
- Emulator UI: http://localhost:4000

## API Documentation

### Authentication Service (`authService.js`)

#### Sign Up
```javascript
import { signUp } from './services/authService';

const result = await signUp('user@example.com', 'password123', 'John Doe');
if (result.success) {
  console.log('User created:', result.user);
}
```

#### Sign In
```javascript
import { signIn } from './services/authService';

const result = await signIn('user@example.com', 'password123');
if (result.success) {
  console.log('Signed in:', result.user);
}
```

#### Sign In with Google
```javascript
import { signInWithGoogle } from './services/authService';

const result = await signInWithGoogle();
if (result.success) {
  console.log('Signed in with Google:', result.user);
}
```

#### Sign Out
```javascript
import { logOut } from './services/authService';

await logOut();
```

#### Auth State Observer
```javascript
import { onAuthChange } from './services/authService';

const unsubscribe = onAuthChange((user) => {
  if (user) {
    console.log('User is signed in:', user);
  } else {
    console.log('User is signed out');
  }
});

// Cleanup
unsubscribe();
```

### Firestore Service (`firestoreService.js`)

#### Save a Calculation
```javascript
import { saveCalculation } from './services/firestoreService';

const calculationData = {
  propertyAddress: '123 Main St',
  monthlyRent: 2000,
  expenses: 500,
  netIncome: 1500
};

const result = await saveCalculation(userId, calculationData);
if (result.success) {
  console.log('Calculation saved with ID:', result.id);
}
```

#### Get User Calculations
```javascript
import { getUserCalculations } from './services/firestoreService';

const result = await getUserCalculations(userId);
if (result.success) {
  console.log('Calculations:', result.calculations);
}
```

#### Save to Favorites
```javascript
import { saveToFavorites } from './services/firestoreService';

const propertyData = {
  address: '456 Oak Ave',
  price: 350000,
  bedrooms: 3,
  bathrooms: 2
};

const result = await saveToFavorites(userId, propertyData);
```

#### Get User Favorites
```javascript
import { getUserFavorites } from './services/firestoreService';

const result = await getUserFavorites(userId);
if (result.success) {
  console.log('Favorites:', result.favorites);
}
```

## Database Collections

### `calculations`
Stores property rental calculations
- `userId` (string): User ID who created the calculation
- `createdAt` (timestamp): Creation timestamp
- `updatedAt` (timestamp): Last update timestamp
- Custom fields for calculation data

### `userFavorites`
Stores user's favorite properties
- `userId` (string): User ID
- `createdAt` (timestamp): When favorited
- Custom fields for property data

### `savedProperties`
Stores complete property information with calculations
- `userId` (string): User ID
- `createdAt` (timestamp): Creation timestamp
- `updatedAt` (timestamp): Last update timestamp
- Custom fields for property and calculation data

## Security

### Firestore Rules
- Users can only read/write their own data
- All operations require authentication
- Data is scoped by `userId` field

### Best Practices
- Never commit `.env` file
- Keep Firebase API keys in environment variables
- Use Firestore security rules to protect data
- Validate data on the client before saving

## Deployment

### Deploy to Firebase Hosting
```bash
# Build your app
npm run build

# Deploy to Firebase
npm run firebase:deploy
```

## Troubleshooting

### Common Issues

1. **"Permission denied" errors**
   - Ensure user is authenticated
   - Check Firestore security rules
   - Verify `userId` matches authenticated user

2. **Environment variables not loading**
   - Ensure `.env` file exists
   - Restart development server
   - Check variable names start with `VITE_`

3. **Firebase initialization errors**
   - Verify all config values in `.env`
   - Check Firebase project is active
   - Ensure billing is enabled (for production)

## Next Steps

1. ✅ Backend setup complete
2. 🔄 Create frontend UI components
3. 🔄 Integrate auth with UI
4. 🔄 Build property calculation forms
5. 🔄 Implement favorites management
6. 🔄 Add data visualization

## Support
For Firebase documentation, visit: https://firebase.google.com/docs
