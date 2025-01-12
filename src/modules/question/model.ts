export interface QuestionOptions {
  id: string;
  text: string;
  options: string[];
  correct_option: number;
}

export class Question implements QuestionOptions {
  id: string;
  text: string;
  options: string[];
  correct_option: number;

  /**
   * Creates a new Question.
   * @param {QuestionOptions} options - The question options.
   */
  constructor(options: QuestionOptions) {
    this.id = options.id;
    this.text = options.text;
    this.options = options.options;
    this.correct_option = options.correct_option;
  }
}

export const questions: Question[] = [];
