
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import type { Mood } from '@/lib/supabase';

interface MoodButtonProps {
  emoji: string;
  label: string;
  mood: Mood;
  selected: boolean;
  onPress: (mood: Mood) => void;
}

export function MoodButton({ emoji, label, mood, selected, onPress }: MoodButtonProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (selected) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [selected]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(mood)}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          selected && styles.selected,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={[styles.label, selected && styles.selectedLabel]}>
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    aspectRatio: 1.2,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selected: {
    backgroundColor: '#7C3AED',
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
});