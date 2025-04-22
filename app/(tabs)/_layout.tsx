
import { Tabs } from 'expo-router';
import { Home, BarChart2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
        },
        headerBackground: () => (
          <LinearGradient
            colors={['#7C3AED', '#4F46E5']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        headerTitleStyle: {
          fontWeight: '600',
          color: '#FFFFFF',
        },
        headerTintColor: '#FFFFFF',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Daily Mood',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trends"
        options={{
          title: 'Trends',
          tabBarIcon: ({ color, size }) => <BarChart2 size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}