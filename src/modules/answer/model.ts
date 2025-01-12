export interface Answer {
  user_id: string;
  question_id: string;
  quiz_id: string;
  selected_option: number;
  is_correct: boolean;
}

export const answers: Answer[] = [];

export class AnswerModel implements Answer {
  user_id: string;
  question_id: string;
  quiz_id: string;
  selected_option: number;
  is_correct: boolean;

  constructor(
    user_id: string,
    question_id: string,
    quiz_id: string,
    selected_option: number,
    is_correct: boolean,
  ) {
    this.user_id = user_id;
    this.question_id = question_id;
    this.quiz_id = quiz_id;
    this.selected_option = selected_option;
    this.is_correct = is_correct;
  }
}

export default AnswerModel;
