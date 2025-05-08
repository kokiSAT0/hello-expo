module.exports = {
  // Expo の公式推奨プリセットを使用
  preset: 'jest-expo',
  // TypeScriptで書かれたファイルなどを扱うためのtransform
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  // テスト対象外にするパス
  testPathIgnorePatterns: ['/node_modules/'],
  // Coverage を取得する設定（任意）
  collectCoverage: false,
  // Jestがモックするファイルの拡張子
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
