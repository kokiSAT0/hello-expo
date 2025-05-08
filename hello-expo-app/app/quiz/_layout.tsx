// app/quiz/_layout.tsx
import { Stack } from 'expo-router';

/**
 * quiz 以下の画面共通レイアウト
 * いったんヘッダ非表示のみ
 */
export default function QuizLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
