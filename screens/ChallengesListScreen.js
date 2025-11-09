import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { challengeService } from '../services/challengeService';
import ChallengeCard from '../components/ChallengeCard';

export default function ChallengesListScreen({ navigation }) {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const categories = ['all', 'fitness', 'learning', 'wellness', 'creative'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  useEffect(() => {
    loadChallenges();
  }, [selectedCategory, selectedDifficulty]);

  const loadChallenges = async () => {
    setLoading(true);
    try {
      let result;
      if (selectedCategory && selectedCategory !== 'all') {
        result = await challengeService.filterChallenges(selectedCategory, selectedDifficulty !== 'all' ? selectedDifficulty : null);
      } else if (selectedDifficulty && selectedDifficulty !== 'all') {
        result = await challengeService.filterChallenges(null, selectedDifficulty);
      } else {
        result = await challengeService.fetchChallenges();
      }
      setChallenges(result.challenges);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadChallenges();
      return;
    }
    setLoading(true);
    try {
      const result = await challengeService.searchChallenges(searchQuery);
      setChallenges(result.challenges);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinChallenge = async (challengeId) => {
    try {
      await challengeService.joinChallenge(challengeId, 'current_user_id');
      // Refresh challenges
      loadChallenges();
    } catch (error) {
      console.error('Error joining challenge:', error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Challenges</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search challenges..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => { setSearchQuery(''); loadChallenges(); }}>
                <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            <TouchableOpacity
              style={[styles.filterChip, selectedCategory === null && styles.filterChipActive]}
              onPress={() => setSelectedCategory(null)}
            >
              <Text style={[styles.filterText, selectedCategory === null && styles.filterTextActive]}>All</Text>
            </TouchableOpacity>
            {categories.filter(c => c !== 'all').map((category) => (
              <TouchableOpacity
                key={category}
                style={[styles.filterChip, selectedCategory === category && styles.filterChipActive]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[styles.filterText, selectedCategory === category && styles.filterTextActive]}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            {difficulties.map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[styles.filterChip, selectedDifficulty === difficulty && styles.filterChipActive]}
                onPress={() => setSelectedDifficulty(difficulty === 'all' ? null : difficulty)}
              >
                <Text style={[styles.filterText, selectedDifficulty === difficulty && styles.filterTextActive]}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.green} />
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {challenges.length > 0 ? (
              challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onPress={() => navigation.navigate('ChallengeRoom', { challengeId: challenge.id })}
                  onJoin={() => handleJoinChallenge(challenge.id)}
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="trophy-outline" size={64} color={colors.textSecondary} />
                <Text style={styles.emptyText}>No challenges found</Text>
              </View>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'System',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardDark,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: colors.blackLight,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.white,
    fontFamily: 'System',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  filtersScroll: {
    flexGrow: 0,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.cardDark,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.blackLight,
  },
  filterChipActive: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  filterText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 16,
    fontFamily: 'System',
  },
});

