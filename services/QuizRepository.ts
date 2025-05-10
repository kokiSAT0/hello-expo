// services/QuizRepository.ts

/**
 * クイズデータ取得用リポジトリ。
 * すべて非同期 API（Promise ベース）で実装しています。
 */
import { getDb } from './db';

/** SQLite 行オブジェクトの型定義 */
export type QuizRow = {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctIndex: number;
};

/**
 * テーブル内の全クイズ問題を取得して配列で返す。
 * 例:
 * ```ts
 * const quizzes = await fetchAllQuestions();
 * ```
 */
export async function fetchAllQuestions(): Promise<QuizRow[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<QuizRow>('SELECT * FROM quiz_data;');
  return rows;
}
