// services/db.ts
import * as SQLite from 'expo-sqlite';

/** データベース名（ファイルは自動生成されます） */
const DB_NAME = 'quizdb.db';

/**
 * アプリ全体で 1 つだけ共有する DB コネクション。
 * `expo-sqlite` v11 以降（Expo SDK 49〜）で推奨される
 * `openDatabaseAsync()` を用いて非同期に確立します。
 */
let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

/**
 * DB インスタンスを取得するユーティリティ関数
 * ```ts
 * const db = await getDb();
 * await db.runAsync('CREATE TABLE IF NOT EXISTS ...');
 * ```
 */
export function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(DB_NAME);
  }
  return dbPromise;
}
