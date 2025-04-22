
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoodButton } from '@/components/MoodButton';
import { ReflectionCard } from '@/components/ReflectionCard';
import { saveMoodEntry, getTodaysMoodEntry, type Mood, type MoodEntry } from '@/lib/supabase';

const MOODS: Array<{ emoji: string; label: string; mood: Mood }> = [
  { emoji: '😊', label: 'Happy', mood: 'happy' },
  { emoji: '😌', label: 'Calm', mood: 'calm' },
  { emoji: '😐', label: 'Neutral', mood: 'neutral' },
  { emoji: '😔', label: 'Sad', mood: 'sad' },
  { emoji: '😫', label: 'Stressed', mood: 'stressed' },
];

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [todayEntry, setTodayEntry] = useState<MoodEntry | null>(null);

  useEffect(() => {
    loadTodaysMood();
  }, []);

  const loadTodaysMood = async () => {
    const entry = await getTodaysMoodEntry();
    if (entry) {
      setSelectedMood(entry.mood);
      setTodayEntry(entry);
    }
    setIsLoading(false);
  };

  const handleMoodSelect = async (mood: Mood) => {
    if (isSaving) return;
    
    setIsSaving(true);
    setSelectedMood(mood);
    
    const entry = await saveMoodEntry(mood);
    if (entry) {
      setTodayEntry(entry);
    }
    
    setIsSaving(false);
  };

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
          <Text style={styles.question}>
            {todayEntry 
              ? "How are you feeling now?"
              : "How are you feeling today?"}
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7C3AED" />
          </View>
        ) : (
          <View style={styles.moodGrid}>
            {MOODS.map((mood) => (
              <MoodButton
                key={mood.mood}
                emoji={mood.emoji}
                label={mood.label}
                mood={mood.mood}
                selected={selectedMood === mood.mood}
                onPress={handleMoodSelect}
                disabled={isSaving}
              />
            ))}
          </View>
        )}

        <ReflectionCard 
          mood={selectedMood || undefined}
          isLoading={isLoading || isSaving}
        />
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
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
});