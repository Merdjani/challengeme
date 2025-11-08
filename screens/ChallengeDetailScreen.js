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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { challengeService } from '../services/challengeService';
import CircularProgress from '../components/CircularProgress';
import GlowButton from '../components/GlowButton';

export default function ChallengeDetailScreen({ route, navigation }) {
  const { challengeId } = route.params;
  const [challenge, setChallenge] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    loadChallengeDetails();
    loadComments();
  }, [challengeId]);

  const loadChallengeDetails = async () => {
    try {
      const data = await challengeService.getChallengeDetails(challengeId);
      setChallenge(data);
    } catch (error) {
      console.error('Error loading challenge:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const data = await challengeService.fetchComments(challengeId);
      setComments(data);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleStartChallenge = async () => {
    try {
      await challengeService.startChallenge(challengeId, 'current_user_id');
      Alert.alert('Success', 'Challenge started!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to start challenge');
    }
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const newComment = await challengeService.addComment(challengeId, 'current_user_id', commentText);
      setComments([...comments, newComment]);
      setCommentText('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.green} />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (!challenge) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>Challenge not found</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Challenge Details</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{challenge.title}</Text>
          <Text style={styles.description}>{challenge.description}</Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Ionicons name="people" size={20} color={colors.green} />
              <Text style={styles.infoText}>{challenge.participants} participants</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="flag" size={20} color={colors.green} />
              <Text style={styles.infoText}>{challenge.difficulty}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="pricetag" size={20} color={colors.green} />
              <Text style={styles.infoText}>{challenge.category}</Text>
            </View>
          </View>

          <View style={styles.commentsSection}>
            <Text style={styles.sectionTitle}>Comments</Text>
            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentAuthor}>{comment.userName || 'User'}</Text>
                  <Text style={styles.commentTime}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            ))}

            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor={colors.textSecondary}
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity
                style={[styles.sendButton, submittingComment && styles.sendButtonDisabled]}
                onPress={handleSubmitComment}
                disabled={submittingComment}
              >
                <Ionicons name="send" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <GlowButton
            title="Start Challenge"
            onPress={handleStartChallenge}
            style={styles.startButton}
          />
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    flex: 1,
    textAlign: 'center',
    fontFamily: 'System',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontFamily: 'System',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 12,
    fontFamily: 'System',
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
    lineHeight: 24,
    fontFamily: 'System',
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.cardDark,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: 'System',
    textTransform: 'capitalize',
  },
  commentsSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 16,
    fontFamily: 'System',
  },
  commentItem: {
    backgroundColor: colors.cardDark,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.blackLight,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.green,
    fontFamily: 'System',
  },
  commentTime: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
  commentText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: 'System',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    backgroundColor: colors.cardDark,
    borderRadius: 12,
    padding: 12,
    color: colors.white,
    fontSize: 14,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.blackLight,
    fontFamily: 'System',
  },
  sendButton: {
    backgroundColor: colors.green,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  startButton: {
    width: '100%',
  },
});

