// app/quiz/index.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import QuestionCard from '@/components/QuestionCard'; // tsconfig の paths 設定済なら @ で

export default function QuizScreen() {
  const [score, setScore] = useState(0); // まだ固定値

  const handleNext = () => {
    // ★ダミーでスコア +1（lint 対策）
    setScore((prev) => prev + 1);

    // TODO: 質問を次に切り替える処理を後で実装
  };

  return (
    <View style={styles.container}>
      <QuestionCard />

      <View style={styles.footer}>
        <Text style={styles.score}>Score: {score}</Text>
        <Pressable style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextLabel}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  score: { fontSize: 18, fontWeight: 'bold' },
  nextBtn: {
    backgroundColor: '#4f46e5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  nextLabel: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
