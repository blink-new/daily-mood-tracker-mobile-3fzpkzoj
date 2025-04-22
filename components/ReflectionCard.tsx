
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { Mood } from '@/lib/supabase';

interface ReflectionCardProps {
  mood?: Mood;
  isLoading?: boolean;
}

const getReflection = (mood?: Mood): string => {
  if (!mood) return 'Take a moment to reflect on your emotions...';

  const reflections: Record<Mood, string[]> = {
    happy: [
      "Your joy brightens the world around you! 🌟",
      "Happiness looks beautiful on you! Keep shining! ✨",
    ],
    calm: [
      "Inner peace is a wonderful gift to yourself 🌊",
      "Tranquility breeds clarity. Embrace this moment 🍃",
    ],
    neutral: [
      "Balance is its own kind of strength 🌅",
      "Sometimes being okay is exactly where we need to be ⚖️",
    ],
    sad: [
      "It's okay to not be okay. Tomorrow brings new possibilities 🌱",
      "Your feelings are valid. Be gentle with yourself today 💗",
    ],
    stressed: [
      "Take a deep breath. This moment shall pass 🌬️",
      "Small steps forward are still progress. You've got this 💪",
    ],
  };

  const moodReflections = reflections[mood];
  return moodReflections[Math.floor(Math.random() * moodReflections.length)];
};

export function ReflectionCard({ mood, isLoading }: ReflectionCardProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7C3AED20', '#4F46E510']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>Daily Reflection</Text>
        <Text style={styles.text}>
          {isLoading ? 'Loading reflection...' : getReflection(mood)}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
});