// Question Types
// 1. MCQs | Multiple Choice | single
// 2. boolean | true/false | single
// 3. MAQs | Multiple Answers | multiple

import { Topic } from '.'

const dto = (document.getElementById('arg-dto-silver') as HTMLScriptElement)?.textContent!
export const javascript: Topic = dto ? JSON.parse(dto) : null