# ChallengeMe App Update Plan

## Overview
Restructure the app to match the new scenario: Welcome Page, Guest Mode, Profile Setup, Challenge Room, Results, etc. Remove Rooms, add Guest Mode logic.

## Steps to Complete

### 1. Update App.js
- [ ] Change initial screen to WelcomeScreen
- [ ] Add Guest mode state management
- [ ] Modify navigation structure: Stack for auth/pages, Tab for Home
- [ ] Update authentication logic to handle guest mode

### 2. Create ProfileSetupScreen.js
- [ ] Create new screen for profile setup after signup
- [ ] Include profile picture upload, username, interests
- [ ] Navigate to Home after completion

### 3. Create EditProfileScreen.js
- [ ] Create screen for editing profile information
- [ ] Include edit name, username, bio, change profile picture
- [ ] Navigate back to Profile after save

### 4. Create ResultsScreen.js
- [ ] Create screen to show challenge results
- [ ] Display score, correct/incorrect answers
- [ ] Include Retry and Share buttons

### 5. Update WelcomeScreen.js
- [ ] Update to match scenario: App logo/name, welcome message, buttons for Login, Signup, Enter Without Account
- [ ] Add navigation to respective screens

### 6. Update LoginScreen.js and SignupScreen.js
- [ ] Signup: Navigate to ProfileSetup after successful signup
- [ ] Login: Add note for guest mode if applicable
- [ ] Ensure proper navigation flows

### 7. Update DashboardScreen.js to Home
- [ ] Rename/update to Home Page
- [ ] Add bottom tabs: Challenges, Leaderboard (hidden for guests), Profile (hidden for guests)
- [ ] Add featured challenge banner, quick access buttons
- [ ] Implement guest mode prompts

### 8. Update LeaderboardScreen.js and ProfileScreen.js
- [ ] Hide Leaderboard tab for guests, show prompt to sign up
- [ ] Hide Profile tab for guests, show prompt to sign up
- [ ] Update content accordingly

### 9. Update ChallengeDetailScreen.js to ChallengeRoom
- [ ] Rename to ChallengeRoomScreen.js
- [ ] Update to show challenge description, start button, timer, tasks/questions
- [ ] Add submit/finish button to navigate to Results

### 10. Add Results Navigation
- [ ] Update challenge completion logic to navigate to ResultsScreen
- [ ] Ensure scores are saved only for registered users

### 11. Remove Room-related Screens/Components
- [ ] Delete RoomDetailsScreen.js, RoomCard.js
- [ ] Remove room references from Dashboard and other screens
- [ ] Update any dependent code

## Followup Steps
- [ ] Test navigation flow for all user paths (login, signup, guest)
- [ ] Implement guest mode logic in services (local scores, limited features)
- [ ] Update authService and challengeService for guest handling
- [ ] Test challenge flow: Start -> Challenge Room -> Results
- [ ] Verify leaderboard and profile are hidden for guests
- [ ] Run app and check for errors
