import { createContext, ReactNode, useState } from 'react';

type AnswersContextType = {
  points: number;
  answeredQuestions: number;
  stats: string;
  percentage: string;
  handleCorrectAnswer: (id: number) => void;
  handleIncorrectAnswer: (id: number) => void;
};

export const StatsTrackerContext = createContext<AnswersContextType>({
  points: 0,
  answeredQuestions: 0,
  stats: '0 / 0',
  percentage: '0%',
  handleCorrectAnswer: () => {},
  handleIncorrectAnswer: () => {},
});

const StatsTrackerProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [stats, setStats] = useState('0 / 0');
  const [percentage, setPercentage] = useState('0%');
  const [ids, setIds] = useState<Set<number>>(new Set());

  const handleCorrectAnswer = (id: number) => {
    if (!ids.has(id)) {
      setStats(`${points + 1} / ${answeredQuestions + 1}`);
      setPercentage(Math.round(((points + 1) / (answeredQuestions + 1)) * 100) + '%');
      setPoints((prev: number) => prev + 1);
      setAnsweredQuestions((prev: number) => prev + 1);
      setIds((prev: Set<number>) => new Set(prev).add(id));
    }
  };

  const handleIncorrectAnswer = (id: number) => {
    if (!ids.has(id)) {
      setStats(`${points} / ${answeredQuestions + 1}`);
      setPercentage(Math.round((points / (answeredQuestions + 1)) * 100) + '%');
      setAnsweredQuestions((prev: number) => prev + 1);
      setIds((prev: Set<number>) => new Set(prev).add(id));
    }
  };

  return (
    <StatsTrackerContext.Provider
      value={{
        points,
        answeredQuestions,
        stats,
        percentage,
        handleCorrectAnswer,
        handleIncorrectAnswer,
      }}
    >
      {children}
    </StatsTrackerContext.Provider>
  );
};

export default StatsTrackerProvider;
