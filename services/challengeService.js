// Mock challenge service (replace with real API calls)
export const challengeService = {
  // Fetch all challenges
  async fetchChallenges(page = 1, limit = 20) {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockChallenges = [
          {
            id: '1',
            title: '30-Day Fitness Challenge',
            description: 'Complete daily workouts for 30 days',
            difficulty: 'medium',
            category: 'fitness',
            image: null,
            createdBy: { id: '1', name: 'Admin' },
            participants: 150,
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Read 10 Pages Daily',
            description: 'Read at least 10 pages every day',
            difficulty: 'easy',
            category: 'learning',
            image: null,
            createdBy: { id: '2', name: 'User' },
            participants: 89,
            createdAt: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'Meditation Challenge',
            description: 'Meditate for 15 minutes daily',
            difficulty: 'easy',
            category: 'wellness',
            image: null,
            createdBy: { id: '1', name: 'Admin' },
            participants: 203,
            createdAt: new Date().toISOString(),
          },
        ];
        resolve({ challenges: mockChallenges, total: 3, page, limit });
      }, 500);
    });
  },

  // Search challenges
  async searchChallenges(query) {
    // TODO: Replace with actual API call
    const allChallenges = await this.fetchChallenges();
    const filtered = allChallenges.challenges.filter((challenge) =>
      challenge.title.toLowerCase().includes(query.toLowerCase()) ||
      challenge.description.toLowerCase().includes(query.toLowerCase())
    );
    return { challenges: filtered };
  },

  // Filter challenges
  async filterChallenges(category, difficulty) {
    // TODO: Replace with actual API call
    const allChallenges = await this.fetchChallenges();
    let filtered = allChallenges.challenges;
    
    if (category) {
      filtered = filtered.filter((c) => c.category === category);
    }
    if (difficulty) {
      filtered = filtered.filter((c) => c.difficulty === difficulty);
    }
    
    return { challenges: filtered };
  },

  // Get challenge details
  async getChallengeDetails(challengeId) {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: challengeId,
          title: '30-Day Fitness Challenge',
          description: 'Complete daily workouts for 30 days. This challenge will help you build a consistent exercise routine.',
          difficulty: 'medium',
          category: 'fitness',
          image: null,
          createdBy: { id: '1', name: 'Admin', avatar: null },
          participants: 150,
          createdAt: new Date().toISOString(),
          duration: 30,
        });
      }, 500);
    });
  },

  // Join challenge
  async joinChallenge(challengeId, userId) {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Successfully joined challenge' });
      }, 500);
    });
  },

  // Start challenge
  async startChallenge(challengeId, userId) {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Challenge started' });
      }, 500);
    });
  },

  // Submit progress
  async submitProgress(challengeId, userId, progressData) {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, progress: progressData });
      }, 500);
    });
  },

  // Create challenge
  async createChallenge(challengeData) {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now().toString(),
          ...challengeData,
          createdAt: new Date().toISOString(),
        });
      }, 500);
    });
  },

  // Get user challenges
  async fetchUserChallenges(userId) {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          active: [
            { id: '1', title: '30-Day Fitness Challenge', currentDay: 7, duration: 30 },
            { id: '2', title: 'Read 10 Pages Daily', currentDay: 15, duration: 30 },
          ],
          completed: [
            { id: '3', title: 'Meditation Challenge', completedAt: new Date().toISOString() },
          ],
        });
      }, 500);
    });
  },

  // Get comments
  async fetchComments(challengeId) {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            userId: '1',
            userName: 'User1',
            text: 'Great challenge!',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            userId: '2',
            userName: 'User2',
            text: 'This is helping me a lot!',
            createdAt: new Date().toISOString(),
          },
        ]);
      }, 500);
    });
  },

  // Add comment
  async addComment(challengeId, userId, text) {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now().toString(),
          userId,
          text,
          createdAt: new Date().toISOString(),
        });
      }, 500);
    });
  },
};

