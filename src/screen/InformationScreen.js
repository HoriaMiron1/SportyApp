import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function InformationScreen() {
  return (
    <LinearGradient
      colors={['#322839', '#83508d', '#c0aab2']}
      style={styles.container}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row-reverse',
        }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          scrollIndicatorInsets={{ right: 1 }} //Pentru IOS ne ajuta sa pozitionam Scrollbar-ul la dreapta
        >
          <Text style={styles.title}>Welcome to Sporty</Text>
          <Text style={styles.text}>
            This is a football reservation app. You can use this app to reserve
            your time slot for playing football in our designated football
            pitches.
          </Text>
          <Text style={styles.title}>How to Use Our App</Text>

          <Text style={styles.subTitle}>Step 1: Select a Field</Text>
          <Text style={styles.text}>
            When you launch our app, you'll find yourself on the Home Screen.
            Here, you can view all the available football fields. To select a
            field, simply tap on the one you'd like to play on.
          </Text>

          <Text style={styles.subTitle}>Step 2: Choose a Day</Text>
          <Text style={styles.text}>
            Once you've selected a field, you will be directed to a new screen
            where you can choose the day for your game. The days are listed in a
            calendar format, and you can select your preferred day by tapping on
            it.
          </Text>

          <Text style={styles.subTitle}>Step 3: Choose an Hour</Text>
          <Text style={styles.text}>
            After selecting the day, you will be navigated to a page where you
            can choose your preferred time slot for the game. The time slots are
            listed in one-hour intervals. Simply tap on the time slot that works
            best for you.
          </Text>

          <Text style={styles.subTitle}>Congratulations!</Text>
          <Text style={styles.text}>
            That's it! You've successfully booked your football field. You can
            view and manage your reservations from the Profile Screen. Enjoy
            your game!
          </Text>
          <Text style={styles.subTitle}>Contact Information</Text>
          <Text style={styles.text}>Email: sportyappteam@gmail.com</Text>
          <Text style={styles.text}>Phone: +40 0722/678/658</Text>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
    backgroundColor: 'transparent', // Set ScrollView background to transparent
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f5f5f5', // Changed color to off-white
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f5f5f5', // Changed color to off-white
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#f5f5f5', // Changed color to off-white
    marginBottom: 20,
  },
});
