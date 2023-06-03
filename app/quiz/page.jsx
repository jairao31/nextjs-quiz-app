"use client";
import React, { useEffect, useState } from "react";
import { quiz } from "../quizData";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Quiz = () => {
    const searchParams = useSearchParams();
    const qNum = searchParams.get("qNum");
    // const [questions, setQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnwer, setSeletcedAnswer] = useState("");
    const [checked, setChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowReslt] = useState(false);
    const [result, setResult] = useState({
        score: 0,
        correctAnswer: 0,
        wrongAnswer: 0,
    });
    const getRandomQuestions = (qNum) => {
        const { questions } = quiz;
        const totalQuestions = questions.length;

        if (qNum >= totalQuestions) {
            return questions; // Return all questions if qNum is greater than or equal to totalQuestions
        }

        const randomIndices = [];
        while (randomIndices.length < qNum) {
            const randomIndex = Math.floor(Math.random() * totalQuestions);
            if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
            }
        }

        return randomIndices.map((index) => questions[index]);
    };

    const questions = quiz.questions.slice(0, qNum);
    //  const { questions } = quiz;

    // useEffect(() => {
    //     const qq = getRandomQuestions(qNum);
    //     setQuestions(qq);
    // }, [qNum]);
    // const questions = getRandomQuestions(qNum);
    const { question, answers, correctAnswer } = questions[activeQuestion];

    const onAnswerSelected = (ans, idx) => {
        setChecked(true);
        setSelectedAnswerIndex(idx);
        ans === correctAnswer
            ? setSeletcedAnswer(true)
            : setSeletcedAnswer(false);
    };

    const nextQuestion = () => {
        setSelectedAnswerIndex(null);
        setResult((prev) =>
            selectedAnwer
                ? {
                      ...prev,
                      score: prev.score + 5,
                      correctAnswer: prev.correctAnswer + 1,
                  }
                : {
                      ...prev,
                      wrongAnswer: prev.wrongAnswer + 1,
                  }
        );
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
        } else {
            setActiveQuestion(0);
            setShowReslt(true);
        }
        setChecked(false);
    };

    return (
        <div className="container">
            <div className="quiz-heading">
                <Link href={"/"}>
                    <h1 className="home">Home </h1>
                </Link>
                <h1>| Quiz Page</h1>
            </div>

            {!showResult && (
                <div>
                    <h2>
                        Question: {activeQuestion + 1}
                        <span>/{questions.length}</span>
                    </h2>
                </div>
            )}
            <div>
                {!showResult ? (
                    <div className="quiz-container">
                        <h3>{questions[activeQuestion].question}</h3>
                        {answers.map((ans, idx) => (
                            <li
                                key={idx}
                                className={
                                    selectedAnswerIndex === idx
                                        ? "li-selected"
                                        : "li-hover"
                                }
                                onClick={() => onAnswerSelected(ans, idx)}
                            >
                                <span>{ans}</span>
                            </li>
                        ))}
                        {checked ? (
                            <button onClick={nextQuestion} className="btn">
                                {activeQuestion === questions.length - 1
                                    ? "Finish"
                                    : "Next"}
                            </button>
                        ) : (
                            <button
                                onClick={nextQuestion}
                                disabled
                                className="btn-disabled"
                            >
                                {activeQuestion === questions.length - 1
                                    ? "Finish"
                                    : "Next"}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="quiz-container">
                        <h3>Results</h3>
                        <h3>
                            Overall{" "}
                            {(result.score / (questions.length * 5)) * 100}%
                        </h3>
                        <p>
                            Total Questions: <span>{questions.length}</span>
                        </p>
                        <p>
                            Total Score: <span>{result.score}</span>
                        </p>
                        <p>
                            Correct Answers: <span>{result.correctAnswer}</span>
                        </p>
                        <p>
                            Wrong Answers: <span>{result.wrongAnswer}</span>
                        </p>
                        <button onClick={() => window.location.reload()}>
                            Reset
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
