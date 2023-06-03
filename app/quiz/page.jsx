"use client";
import React, { useState } from "react";
import { quiz } from "../quizData";

const Quiz = () => {
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

    const { questions } = quiz;
    const { question, answers, correctAnswer } = questions[activeQuestion];

    return (
        <div className="container">
            <h1>Quiz Page</h1>
            <div>
                <h2>
                    Question: {activeQuestion + 1}
                    <span>/{questions.length}</span>
                </h2>
            </div>
            <div></div>
        </div>
    );
};

export default Quiz;
