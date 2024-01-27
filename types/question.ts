export type Question = {
  id: number;
  question: string;
  image: string;
  answers: Answer[];
};

export type Answer = {
  text: string;
  isCorrect: boolean;
};
