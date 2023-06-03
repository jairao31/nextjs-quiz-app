"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [qNum, setQNum] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        const value = e.target.value;
        if (value <= 100) {
            setQNum(value);
        }
    };

    const handleStartQuiz = () => {
        router.push("/quiz?qNum=" + qNum);
    };

    return (
        <main>
            <div className="container">
                <h1>Quiz App</h1>
                <input
                    className="quiz-num"
                    type="number"
                    placeholder="Enter number of questions to attempt within 100"
                    value={qNum}
                    onChange={handleChange}
                />

                <button disabled={qNum === ""} onClick={handleStartQuiz}>
                    Start Quiz
                </button>
            </div>
        </main>
    );
}
