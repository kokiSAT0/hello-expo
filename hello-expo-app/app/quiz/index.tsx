// app/quiz/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import QuestionCard from '@/components/QuestionCard';
import ScoreModal from '@/components/ScoreModal';
// ↓ JSON をインポート (tsconfig で "resolveJsonModule": true が必要)
import questions from '@/assets/data/questions.json';

export default function QuizScreen() {
  // 現在の問題番号
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // スコア
  const [score, setScore] = useState(0);
  // クイズ終了フラグ
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // 現在の問題データ
  const currentQuestion = questions[currentQuestionIndex];

  // 選択肢を選んだときの処理
  const handleOptionSelect = (selectedIndex: number) => {
    // 正解チェック
    if (selectedIndex === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
    // 次の問題へ
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      // 最後の問題まで到達したらクイズ終了
      setIsQuizFinished(true);
    }
  };

  // クイズをやり直す
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizFinished(false);
  };

  return (
    <View style={styles.container}>
      {/* クイズが終了していなければ問題を表示 */}
      {!isQuizFinished && (
        <>
          <QuestionCard
            question={currentQuestion.question}
            options={currentQuestion.options}
            onSelectOption={handleOptionSelect}
          />
          <View style={styles.footer}>
            <Text style={styles.score}>
              Score: {score} / {questions.length}
            </Text>
            <Pressable style={styles.nextBtn} onPress={() => handleOptionSelect(-1)}>
              <Text style={styles.nextLabel}>スキップ</Text>
            </Pressable>
          </View>
        </>
      )}

      {/* クイズ終了時にモーダルを表示 */}
      <ScoreModal
        visible={isQuizFinished}
        score={score}
        total={questions.length}
        onRetry={handleRetry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F6F6F6' },
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
