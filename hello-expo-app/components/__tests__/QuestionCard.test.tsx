import React from 'react';
import { render, screen } from '@testing-library/react-native';
import QuestionCard from '../QuestionCard';
import { describe, it } from 'node:test';
import expect from 'expect';

describe('QuestionCard', () => {
  it('問題文が正しく表示される', () => {
    const questionText = 'テスト用の問題文';
    const options = ['選択肢A', '選択肢B', '選択肢C'];

    render(<QuestionCard question={questionText} options={options} onSelectOption={() => {}} />);

    // 問題文が表示されているか
    expect(screen.getByText(`問題: ${questionText}`)).toBeTruthy();
  });

  it('選択肢が正しい数だけ表示される', () => {
    const questionText = 'テスト用の問題文';
    const options = ['選択肢A', '選択肢B', '選択肢C'];

    render(<QuestionCard question={questionText} options={options} onSelectOption={() => {}} />);

    // 選択肢が 3 つ表示されているか
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeTruthy();
    });
  });
});
