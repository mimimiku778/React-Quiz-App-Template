// Question Types
// 1. MCQs | Multiple Choice | single
// 2. boolean | true/false | single
// 3. MAQs | Multiple Answers | multiple

import { Topic } from '.'
import CodeSnippet1 from '../../assets/images/code-snippet-1.png'

export const react: Topic = {
  topic: 'ブロンズ',
  level: 'Beginner',
  totalQuestions: 3,
  totalScore: 25,
  totalTime: 180,
  questions: [
    {
      question: 'What is JSX in React?',
      choices: [
        'A syntax extension for JavaScript that allows writing HTML-like code in JavaScript',
        'A state management library for React applications',
        'A build tool for bundling React applications',
        'A testing framework for React components',
      ],
      type: 'MCQs',
      correctAnswers: [
        'A syntax extension for JavaScript that allows writing HTML-like code in JavaScript',
      ],
      explanation: '解説を入力',
      score: 10,
    },
    {
      question: 'React components must always return a single JSX element.',
      choices: ['True', 'False'],
      type: 'boolean',
      correctAnswers: ['True'],
      score: 5,
    },
    {
      question: 'What is the output of the following code snippet?',
      image: CodeSnippet1,
      choices: ['0', '1', '2', 'undefined'],
      type: 'MCQs',
      correctAnswers: ['0'],
      score: 10,
    },
  ],
}
