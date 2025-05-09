// services/db.ts
import * as SQLite from 'expo-sqlite';

const DB_NAME = 'quizdb.db'; // DBファイル名
export const db = SQLite.openDatabase(DB_NAME);
