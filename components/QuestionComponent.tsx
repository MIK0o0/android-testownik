import React, { useContext } from 'react';
import { Answer, Question } from '/types/question';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StatsTrackerContext } from '/providers/StatsTrackerProvider';
import Image from 'next/image';

type FormInput = {
  [index: number]: boolean;
};

const QuestionComponent = ({ question, index }: { question: Question; index: number }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted },
  } = useForm();
  const { handleCorrectAnswer, handleIncorrectAnswer } = useContext(StatsTrackerContext);

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
    const answersState = question.answers.map((answer: Answer) => answer.isCorrect);
    const selectedAnswers = Object.values(data);

    JSON.stringify(answersState) === JSON.stringify(selectedAnswers) ? handleCorrectAnswer(index) : handleIncorrectAnswer(index);
  };

  return (
    <div className="w-full flex flex-col gap-3 p-4 bg-stone-800 rounded-lg text-white shadow-xl">
      <div className="font-bold border-b-[1px] pb-2">
        <h1 className="mb-2">{question.question}</h1>
        {question.image && (
          <div className="relative w-full h-64">
            <Image src={question.image} fill style={{ objectFit: 'contain' }} alt={question.question} />
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} id={question.question} className="flex items-start flex-col gap-3">
        {question.answers.map((answer: Answer, idx: number) => (
          <div key={index + idx} className="w-full flex items-center justify-center gap-2 text-sm">
            <input {...register((index * 10 + idx).toString())} type="checkbox" id={(index * 10 + idx).toString()} className="hidden peer"></input>
            <label
              htmlFor={(index * 10 + idx).toString()}
              className={`w-full p-2 border-[2px] border-transparent rounded-lg md:hover:border-blue-300 md:cursor-pointer peer-checked:text-stone-600 transition-all duration-200 ${
                isSubmitted
                  ? `${
                      answer.isCorrect
                        ? 'border-orange-500 peer-checked:border-green-500 peer-checked:bg-green-200'
                        : 'peer-checked:border-red-500 peer-checked:bg-red-200'
                    }`
                  : 'peer-checked:border-blue-500 peer-checked:text-white'
              }`}
            >
              {answer.text}
            </label>
          </div>
        ))}
        <div className="w-full flex items-center justify-between font-bold">
          <input type="submit" value="Sprawdź odpowiedź" className="md:cursor-pointer md:hover:text-yellow-400 md:transition-all md:duration-200" />
          <input
            type="button"
            onClick={() => reset()}
            value="Reset"
            className="md:cursor-pointer md:hover:text-yellow-400 md:transition-all md:duration-200"
          />
        </div>
      </form>
    </div>
  );
};

export default QuestionComponent;
