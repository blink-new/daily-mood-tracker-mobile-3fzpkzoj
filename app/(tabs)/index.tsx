
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const MOODS = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😫', label: 'Stressed' },
];

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
          <Text style={styles.question}>How are you feeling today?</Text>
        </View>

        <View style={styles.moodGrid}>
          {MOODS.map((mood, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedMood(mood)}
              style={[
                styles.moodButton,
                selectedMood === mood && styles.selectedMoodButton
              ]}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={[
                styles.moodLabel,
                selectedMood === mood && styles.selectedMoodLabel
              ]}>
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <LinearGradient
            colors={['#7C3AED20', '#4F46E510']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.cardTitle}>Daily Reflection</Text>
            <Text style={styles.cardText}>
              Take a moment to reflect on your emotions. What made you feel this way today?
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  date: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
  },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 24,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  moodButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedMoodButton: {
    backgroundColor: '#7C3AED',
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  selectedMoodLabel: {
    color: '#FFFFFF',
  },
  card: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
});