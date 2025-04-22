
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://nxhjvziraymcmrvudlnm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54aGp2emlyYXltY21ydnVkbG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NDIzMzksImV4cCI6MjA2MDMxODMzOX0.IE97E8fQH1KrKBMiNpfabqiTAhGJ2UlszSbE71OSsNo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type Mood = 'happy' | 'calm' | 'neutral' | 'sad' | 'stressed';

export interface MoodEntry {
  id: string;
  user_id: string;
  date: string;
  mood: Mood;
  emoji: string;
  note?: string;
  created_at: string;
}

export const getMoodEmoji = (mood: Mood): string => {
  const emojiMap: Record<Mood, string> = {
    happy: '😊',
    calm: '😌',
    neutral: '😐',
    sad: '😔',
    stressed: '😫'
  };
  return emojiMap[mood];
};

export const saveMoodEntry = async (mood: Mood, note?: string): Promise<MoodEntry | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const today = new Date().toISOString().split('T')[0];
  const entry = {
    user_id: user.id,
    date: today,
    mood,
    emoji: getMoodEmoji(mood),
    note,
    created_at: new Date().toISOString()
  };

  // First try to update existing entry
  const { data: updateData, error: updateError } = await supabase
    .from('mood_entries')
    .update(entry)
    .eq('user_id', user.id)
    .eq('date', today)
    .select()
    .single();

  if (updateData) return updateData;

  // If no existing entry, create new one
  const { data: insertData, error: insertError } = await supabase
    .from('mood_entries')
    .insert([entry])
    .select()
    .single();

  if (insertError) {
    console.error('Error saving mood:', insertError);
    return null;
  }

  return insertData;
};

export const getTodaysMoodEntry = async (): Promise<MoodEntry | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('mood_entries')
    .select()
    .eq('user_id', user.id)
    .eq('date', today)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') { // No rows returned
      console.error('Error fetching today\'s mood:', error);
    }
    return null;
  }

  return data;
};

export const getLastWeekMoods = async (): Promise<MoodEntry[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);

  const { data, error } = await supabase
    .from('mood_entries')
    .select()
    .eq('user_id', user.id)
    .gte('date', startDate.toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0])
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching week moods:', error);
    return [];
  }

  return data || [];
};