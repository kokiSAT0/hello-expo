// components/QuestionCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  question: string;
  options: string[];
  onSelectOption: (index: number) => void;
};

export default function QuestionCard({ question, options, onSelectOption }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>問題: {question}</Text>
      {options.map((option, index) => (
        <Pressable key={index} style={styles.optionBtn} onPress={() => onSelectOption(index)}>
          <Text style={styles.optionText}>
            {index + 1}. {option}
          </Text>
        </Pressable>
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
    elevation: 3, // Android向けの影
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  optionText: {
    fontSize: 16,
  },
});
