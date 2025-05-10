// services/bulkInsertQuestions.ts
/**
 * JSON から読み込んだクイズ問題を SQLite に一括投入するユーティリティ。
 * すでにデータが存在すれば挿入はスキップします。
 */
import { getDb } from './db';
import questions from '@/assets/data/bulk_questions.json';

/**
 * クイズ用テーブルを作成し、未挿入であれば JSON から全レコードを挿入する。
 */
export async function bulkInsertQuestions(): Promise<void> {
  // DB コネクションを取得（アプリ全体で 1 つだけ）
  const db = await getDb();

  await db.withTransactionAsync(async () => {
    // 1) テーブル作成（存在しない場合のみ）
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS quiz_data
      (
        id
        INTEGER
        PRIMARY
        KEY
        AUTOINCREMENT,
        question
        TEXT
        NOT
        NULL,
        optionA
        TEXT,
        optionB
        TEXT,
        optionC
        TEXT,
        optionD
        TEXT,
        correctIndex
        INTEGER
      );
    `);

    // 2) 既存レコード数を確認
    const { cnt } = (await db.getFirstAsync<{ cnt: number }>(
      'SELECT COUNT(*) AS cnt FROM quiz_data;',
    )) ?? { cnt: 0 };

    if (cnt === 0) {
      console.log('No records in quiz_data; inserting from JSON…');

      // 3) JSON 配列をループして INSERT
      for (const q of questions as never[]) {
        await db.runAsync(
          `INSERT INTO quiz_data
             (question, optionA, optionB, optionC, optionD, correctIndex)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [q.question, q.options[0], q.options[1], q.options[2], q.options[3], q.correctIndex],
        );
      }
      console.log('Inserted all JSON-based questions.');
    } else {
      console.log(`quiz_data already has ${cnt} records; skipping insert.`);
    }
  });
}
