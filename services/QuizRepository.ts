// services/QuizRepository.ts
import { db } from './db';

export type QuizRow = {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctIndex: number;
};

/** 全問題を取得する関数 */
export function fetchAllQuestions(): Promise<QuizRow[]> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT *
         FROM quiz_data;`,
        [],
        (_, resultSet) => {
          const items: QuizRow[] = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            items.push(resultSet.rows.item(i));
          }
          resolve(items);
        },
        (_, err) => {
          reject(err);
          return true;
        },
      );
    });
  });
}
