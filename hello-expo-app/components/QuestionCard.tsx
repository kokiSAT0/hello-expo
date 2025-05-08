// components/QuestionCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QuestionCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Question — ダミー</Text>
      {['A', 'B', 'C', 'D'].map((l) => (
        <View key={l} style={styles.option}>
          <Text>
            {l}. Option {l}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Android
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  option: { paddingVertical: 6 },
});
