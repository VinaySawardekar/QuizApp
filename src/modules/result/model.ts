import { Answer } from "../answer/model";

export interface Result {
  quiz_id: string;
  user_id: string;
  score: number;
  answers: Answer[];
  summary?: any;
}

export class ResultModel implements Result {
  quiz_id: string;
  user_id: string;
  score: number;
  answers: Answer[];
  summary?: any;

  constructor(
    quiz_id: string,
    user_id: string,
    score: number,
    answers: Answer[] = [],
    summary?: any,
  ) {
    this.quiz_id = quiz_id;
    this.user_id = user_id;
    this.score = score;
    this.answers = answers;
    this.summary = summary;
  }
}

export const results: ResultModel[] = [];
