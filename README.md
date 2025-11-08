# ChallengeMe - Calm Self-Improvement App 🌿

A beautiful, calming mobile app for tracking daily personal challenges with a focus on peaceful motivation and friendly competition.

## Features

- 🏠 **Ongoing Challenges Screen** - View all your active challenges with progress tracking
- 🌙 **Challenge Details Screen** - Detailed view with circular progress and activity log
- 🏅 **Leaderboard Screen** - Friendly competition with glowing top users
- ✏️ **Create Challenge Screen** - Quick and easy challenge creation

## Design

- **Theme**: Dark & soothing with deep navy to teal gradients
- **Accents**: Soft glowing blue and mint green highlights
- **Typography**: Rounded, modern sans-serif
- **Mood**: Peaceful yet energizing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator / `a` for Android emulator

## Project Structure

```
├── App.js                    # Main app entry with navigation
├── screens/                  # Screen components
│   ├── OngoingChallengesScreen.js
│   ├── ChallengeDetailsScreen.js
│   ├── LeaderboardScreen.js
│   └── CreateChallengeScreen.js
├── components/               # Reusable components
│   ├── GradientBackground.js
│   ├── ChallengeCard.js
│   ├── CircularProgress.js
│   └── GlowButton.js
└── theme/                    # Theme and colors
    └── colors.js
```

## Technologies

- React Native
- Expo
- React Navigation
- Expo Linear Gradient
- React Native SVG
- React Native Reanimated

## License

MIT

