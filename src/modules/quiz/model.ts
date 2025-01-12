import { Question } from "../question/model";

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export class QuizModel implements Quiz {
  id: string;
  title: string;
  questions: Question[];

  constructor(id: string, title: string, questions: Question[] = []) {
    this.id = id;
    this.title = title;
    this.questions = questions;
  }
}

export const quizzes: QuizModel[] = [];
