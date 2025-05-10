// app/quiz/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import QuestionCard from '@/components/QuestionCard';
import ScoreModal from '@/components/ScoreModal';

// ★ JSON のインポートは削除し、DBのSELECTを使う
import { fetchAllQuestions } from '@/services/QuizRepository';

// DBから取り出した1件の型 (QuizRepositoryで定義している想定)
type QuizRow = {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctIndex: number;
};

export default function QuizScreen() {
  // DBから取得した全問題
  const [questions, setQuestions] = useState<QuizRow[]>([]);
  // ローディング
  const [loading, setLoading] = useState(true);

  // 現在の問題番号
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // スコア
  const [score, setScore] = useState(0);
  // クイズ終了フラグ
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // ★ 初回マウントでDBから問題を取得
  useEffect(() => {
    fetchAllQuestions()
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => console.error('Failed to load questions:', err))
      .finally(() => setLoading(false));
  }, []);

  // ローディング状態
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  // DBに問題が無かった場合
  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>問題がありません。DBにデータが入っていない可能性があります。</Text>
      </View>
    );
  }

  // 現在の問題
  const currentQuestion = questions[currentQuestionIndex];

  // 選択肢を配列にまとめる
  const options = [
    currentQuestion.optionA,
    currentQuestion.optionB,
    currentQuestion.optionC,
    currentQuestion.optionD,
  ];

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
      // 最後の問題
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
            options={options}
            onSelectOption={handleOptionSelect}
          />
          <View style={styles.footer}>
            <Text style={styles.score}>
              Score: {score} / {questions.length}
            </Text>
            {/* スキップボタンは -1を渡して正解チェックを回避 */}
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
