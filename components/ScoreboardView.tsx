
import React, { useState, useEffect } from 'react';
import * as scoreService from '../services/scoreService';
import { Score } from '../types';
import TrophyIcon from './icons/TrophyIcon';

const ScoreboardView: React.FC = () => {
    const [scores, setScores] = useState<Score[]>([]);
    
    useEffect(() => {
        setScores(scoreService.getScores());
    }, []);

    return (
        <div className="bg-[var(--color-surface)]/80 rounded-lg p-6 w-full flex-grow flex flex-col shadow-lg border border-[var(--color-border)]/70">
            <div className="flex items-center gap-4 mb-6">
                <TrophyIcon className="w-8 h-8 text-[var(--color-icon-primary)]" />
                <h2 className="text-3xl font-bold text-[var(--color-text-main)]">Quiz Scoreboard</h2>
            </div>
            {scores.length === 0 ? (
                <div className="flex-grow flex flex-col justify-center items-center text-[var(--color-text-muted)]">
                    <p className="text-lg">No scores yet!</p>
                    <p>Complete a quiz to see your name in lights.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b border-[var(--color-border)] font-medium text-[var(--color-text-main)]">
                            <tr>
                                <th scope="col" className="px-4 py-3">Rank</th>
                                <th scope="col" className="px-4 py-3">Player</th>
                                <th scope="col" className="px-4 py-3">Score</th>
                                <th scope="col" className="px-4 py-3">Subject</th>
                                <th scope="col" className="px-4 py-3">Level</th>
                                <th scope="col" className="px-4 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-[var(--color-text-muted)]">
                            {scores.map((s, index) => (
                                <tr key={s.id} className="border-b border-[var(--color-border)] transition duration-300 ease-in-out hover:bg-[var(--color-surface-hover)]">
                                    <td className="whitespace-nowrap px-4 py-3 font-bold text-lg text-center">
                                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 font-medium text-[var(--color-text-main)]">{s.email}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-[var(--color-text-accent)] font-semibold">{s.score} / {s.totalQuestions}</td>
                                    <td className="whitespace-nowrap px-4 py-3">{s.subject}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-[var(--color-text-subtle)]">{s.level}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-[var(--color-text-subtle)]">{new Date(s.timestamp).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ScoreboardView;