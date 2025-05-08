// components/__tests__/QuestionCard.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import QuestionCard from '../QuestionCard';

describe('QuestionCard コンポーネントのテスト', () => {
  it('問題文が正しく表示される', () => {
    const questionText = 'テスト用の問題文';
    const options = ['選択肢A', '選択肢B', '選択肢C'];

    render(<QuestionCard question={questionText} options={options} onSelectOption={() => {}} />);

    // 問題文が表示されているか
    expect(screen.getByText(`問題: ${questionText}`)).toBeTruthy();
  });

  it('選択肢が正しい数だけ表示される (正規表現で部分一致)', () => {
    const questionText = 'テスト用の問題文';
    const options = ['選択肢A', '選択肢B', '選択肢C'];

    render(<QuestionCard question={questionText} options={options} onSelectOption={() => {}} />);

    // "選択肢A" を含む文字列(例: "1. 選択肢A")を正規表現で部分一致
    options.forEach((option) => {
      // 正規表現コンストラクタを使用
      expect(screen.getByText(new RegExp(option))).toBeTruthy();
      // またはリテラルで書くなら: screen.getByText(new RegExp(`${option}`))
    });
  });

  it('選択肢をタップすると onSelectOption が正しく呼ばれる (正規表現でタップ)', () => {
    const questionText = 'テスト用の問題文';
    const options = ['選択肢A', '選択肢B', '選択肢C'];
    const mockOnSelectOption = jest.fn();

    render(
      <QuestionCard
        question={questionText}
        options={options}
        onSelectOption={mockOnSelectOption}
      />,
    );

    // "選択肢A" を含む文字列要素を検索 (例: "1. 選択肢A") => タップ
    fireEvent.press(screen.getByText(/選択肢A/));

    // onSelectOption(0) が呼ばれるはず
    expect(mockOnSelectOption).toHaveBeenCalledTimes(1);
    expect(mockOnSelectOption).toHaveBeenCalledWith(0);
  });
});
