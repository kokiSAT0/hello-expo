// services/bulkInsertQuestions.ts
import { db } from './db';
import questions from '@/assets/data/bulk_questions.json';

/**
 * JSONデータを読み取り、SQLiteに問題を一括INSERTする。
 * 既にデータがあればスキップ。
 */
export function bulkInsertQuestions(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // 1) テーブルを作成（なければ）
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS quiz_data
         (
             id           INTEGER PRIMARY KEY AUTOINCREMENT,
             question     TEXT NOT NULL,
             optionA      TEXT,
             optionB      TEXT,
             optionC      TEXT,
             optionD      TEXT,
             correctIndex INTEGER
         );`,
      );

      // 2) 既にデータがあるかチェック
      tx.executeSql(
        'SELECT COUNT(*) as cnt FROM quiz_data',
        [],
        (_, rs) => {
          const count = rs.rows.item(0).cnt;
          if (count === 0) {
            console.log('No records in quiz_data; inserting from JSON...');
            questions.forEach((q) => {
              // options[0]〜[3]を個別列に分割
              tx.executeSql(
                `INSERT INTO quiz_data (question, optionA, optionB, optionC, optionD, correctIndex)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                  q.question,
                  q.options[0],
                  q.options[1],
                  q.options[2],
                  q.options[3],
                  q.correctIndex,
                ],
              );
            });
            console.log('Inserted all JSON-based questions.');
          } else {
            console.log(`quiz_data already has ${count} records; skipping insert.`);
          }
          resolve();
        },
        (_, err) => {
          reject(err);
          return true;
        },
      );
    });
  });
}
