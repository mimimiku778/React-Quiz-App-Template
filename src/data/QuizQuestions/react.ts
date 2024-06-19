// Question Types
// 1. MCQs | Multiple Choice | single
// 2. boolean | true/false | single
// 3. MAQs | Multiple Answers | multiple

import { Topic } from '.'

export const react: Topic = JSON.parse(
  (document.getElementById('arg-dto') as HTMLScriptElement).textContent!
)