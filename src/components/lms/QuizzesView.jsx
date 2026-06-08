import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Clock, CheckCircle2, AlertTriangle, Sparkles, Award, RotateCcw, ChevronRight, Lock, X } from 'lucide-react';

const QuizzesView = () => {
  const [quizState, setQuizState] = useState('list'); // 'list' | 'taking' | 'result'
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds for demo
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState('');

  const dailyQuizzes = [
    {
      date: 'Today - June 8, 2026',
      quizzes: [
        {
          id: 'q-genai-today',
          courseId: 'gen-ai',
          courseName: 'Generative AI Fundamentals',
          name: 'Prompt Engineering & Temperature Controls',
          questionsCount: 3,
          duration: '5 Mins',
          difficulty: 'Beginner',
          status: 'pending',
          paid: true,
          questions: [
            {
              id: 1,
              text: 'Which prompt technique involves providing one or more examples to guide the model?',
              options: ['Zero-Shot Prompting', 'Few-Shot Prompting', 'Meta Prompting', 'Chaining Prompts'],
              correct: 1
            },
            {
              id: 2,
              text: 'What parameter control is commonly used to adjust the randomness of AI responses?',
              options: ['Top K', 'System Prompt', 'Temperature', 'Token Limit'],
              correct: 2
            },
            {
              id: 3,
              text: 'In prompt engineering, what does "hallucination" refer to?',
              options: [
                'A model producing highly accurate technical answers.',
                'A model generating grammatically correct but completely false information.',
                'The process of fine-tuning weights.',
                'Entering unauthorized prompt codes.'
              ],
              correct: 1
            }
          ]
        },
        {
          id: 'q-python-today',
          courseId: 'python',
          courseName: 'Python Programming Masterclass',
          name: 'Python Lists & Core Data Types',
          questionsCount: 3,
          duration: '5 Mins',
          difficulty: 'Beginner',
          status: 'completed',
          score: '100%',
          paid: true,
          questions: [
            {
              id: 1,
              text: 'Which of the following data types in Python is mutable?',
              options: ['List', 'Tuple', 'String', 'Integer'],
              correct: 0
            },
            {
              id: 2,
              text: 'What is the correct syntax to add an item to the end of a list in Python?',
              options: ['list.add(item)', 'list.append(item)', 'list.insert(item)', 'list.push(item)'],
              correct: 1
            },
            {
              id: 3,
              text: 'What does the len() function return for a list?',
              options: ['The index of the last item', 'The sum of all items', 'The number of elements in the list', 'The type of elements'],
              correct: 2
            }
          ]
        },
        {
          id: 'q-webdev-today',
          courseId: 'web-dev',
          courseName: 'Advanced Web Development',
          name: 'React Components & Reconciliation',
          questionsCount: 3,
          duration: '5 Mins',
          difficulty: 'Intermediate',
          status: 'pending',
          paid: false,
          questions: []
        },
        {
          id: 'q-c-today',
          courseId: 'c-prog',
          courseName: 'C Programming',
          name: 'C Pointers & Memory Address Basics',
          questionsCount: 3,
          duration: '5 Mins',
          difficulty: 'Intermediate',
          status: 'pending',
          paid: false,
          questions: []
        }
      ]
    },
    {
      date: 'Yesterday - June 7, 2026',
      quizzes: [
        {
          id: 'q-genai-yest',
          courseId: 'gen-ai',
          courseName: 'Generative AI Fundamentals',
          name: 'System Prompts & Rules Definition',
          questionsCount: 3,
          duration: '5 Mins',
          difficulty: 'Beginner',
          status: 'completed',
          score: '67%',
          paid: true,
          questions: [
            {
              id: 1,
              text: 'What is the primary purpose of a System Prompt?',
              options: ['Set model credentials', 'Define rules, behaviors and constraints', 'Run APIs', 'Increase temperature'],
              correct: 1
            },
            {
              id: 2,
              text: 'System Prompts are injected at what stage of context window initialization?',
              options: ['At the very beginning', 'In the middle of the response', 'Only after user responds', 'They are never injected'],
              correct: 0
            },
            {
              id: 3,
              text: 'Which is a common vector attack that attempts to bypass System Prompt safety constraints?',
              options: ['Gradient Descent', 'Prompt Injection', 'Reinforcement Learning', 'Embedding Matrix'],
              correct: 1
            }
          ]
        },
        {
          id: 'q-python-yest',
          courseId: 'python',
          courseName: 'Python Programming Masterclass',
          name: 'Decorators, Iterables, & Laziness',
          questionsCount: 3,
          duration: '5 Mins',
          difficulty: 'Intermediate',
          status: 'pending',
          paid: true,
          questions: [
            {
              id: 1,
              text: 'What is a decorator in Python?',
              options: ['A library for styling', 'A function that modifies the behavior of another function', 'A code decorator for IDEs', 'An object constructor'],
              correct: 1
            },
            {
              id: 2,
              text: 'Which keyword is used to create a generator function in Python?',
              options: ['return', 'generate', 'yield', 'lazy'],
              correct: 2
            },
            {
              id: 3,
              text: 'How are generators different from standard lists?',
              options: ['They are faster to search', 'They return values lazily and save memory', 'They can only hold integers', 'They cannot be iterated'],
              correct: 1
            }
          ]
        },
        {
          id: 'q-webdev-yest',
          courseId: 'web-dev',
          courseName: 'Advanced Web Development',
          name: 'Tailwind CSS Grid & Flex Layouts',
          questionsCount: 3,
          duration: '5 Mins',
          difficulty: 'Beginner',
          status: 'pending',
          paid: false,
          questions: []
        },
        {
          id: 'q-c-yest',
          courseId: 'c-prog',
          courseName: 'C Programming',
          name: 'Memory Allocation using malloc & free',
          questionsCount: 3,
          duration: '5 Mins',
          difficulty: 'Advanced',
          status: 'pending',
          paid: false,
          questions: []
        }
      ]
    },
    {
      date: 'June 6, 2026',
      quizzes: [
        {
          id: 'q-genai-june6',
          courseId: 'gen-ai',
          courseName: 'Generative AI Fundamentals',
          name: 'Tokenization & Vector Embeddings',
          questionsCount: 3,
          duration: '5 Mins',
          difficulty: 'Advanced',
          status: 'completed',
          score: '100%',
          paid: true,
          questions: [
            {
              id: 1,
              text: 'What are vector embeddings in machine learning?',
              options: ['Line graphs', 'Numerical representations of semantic meanings in n-dimensional space', 'Python list index matrices', 'Prompt engineering templates'],
              correct: 1
            },
            {
              id: 2,
              text: 'Which metric is commonly used to measure distance between vector embeddings?',
              options: ['Cosine Similarity', 'Binary Index', 'Unicode Code Points', 'Levensthein Distance'],
              correct: 0
            },
            {
              id: 3,
              text: 'How does an LLM split input strings into numbers?',
              options: ['Characters only', 'Word stems only', 'Via tokenizers (like Byte-Pair Encoding)', 'ASCII indices'],
              correct: 2
            }
          ]
        },
        {
          id: 'q-python-june6',
          courseId: 'python',
          courseName: 'Python Programming Masterclass',
          name: 'File I/O & Exception Catching Blocks',
          questionsCount: 3,
          duration: '5 Mins',
          difficulty: 'Beginner',
          status: 'completed',
          score: '100%',
          paid: true,
          questions: [
            {
              id: 1,
              text: 'What is the benefit of using the "with" statement when opening files in Python?',
              options: ['It runs faster', 'It automatically closes the file even if exceptions occur', 'It encrypts the file', 'It creates the file if it does not exist'],
              correct: 1
            },
            {
              id: 2,
              text: 'Which block in Python is used to catch exceptions?',
              options: ['try', 'catch', 'except', 'handle'],
              correct: 2
            },
            {
              id: 3,
              text: 'Which exception is raised when dividing by zero in Python?',
              options: ['ValueError', 'ZeroDivisionError', 'ArithmeticException', 'NullPointerException'],
              correct: 1
            }
          ]
        },
        {
          id: 'q-webdev-june6',
          courseId: 'web-dev',
          courseName: 'Advanced Web Development',
          name: 'CSS Grid vs Flexbox Layout Rules',
          questionsCount: 3,
          duration: '5 Mins',
          difficulty: 'Beginner',
          status: 'pending',
          paid: false,
          questions: []
        },
        {
          id: 'q-c-june6',
          courseId: 'c-prog',
          courseName: 'C Programming',
          name: 'Arrays, Strings, & Memory Bounds',
          questionsCount: 3,
          duration: '5 Mins',
          difficulty: 'Intermediate',
          status: 'pending',
          paid: false,
          questions: []
        }
      ]
    }
  ];

  const quizQuestions = activeQuiz?.questions || [];

  useEffect(() => {
    if (quizState !== 'taking') return;
    if (timeLeft <= 0) {
      handleQuizSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quizState]);

  const handleStartQuiz = (quiz) => {
    if (!quiz.paid) {
      setSelectedCourseName(quiz.courseName);
      setShowUpgradeModal(true);
      return;
    }
    setActiveQuiz(quiz);
    setSelectedAnswers({});
    setTimeLeft(60);
    setCurrentQuestionIndex(0);
    setQuizState('taking');
  };

  const handleSelectAnswer = (optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIdx }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(idx => idx + 1);
    } else {
      handleQuizSubmit();
    }
  };

  const handleQuizSubmit = () => {
    setQuizState('result');
  };

  const getResultsData = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score++;
    });
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return {
      score,
      total: quizQuestions.length,
      percentage,
      accuracy: `${percentage}%`,
      timeTaken: '42 Secs'
    };
  };

  const results = quizState === 'result' ? getResultsData() : null;

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      
      {/* Quiz Header */}
      <div>
        <h2 className="font-display font-black text-2xl text-slate-800 tracking-tight">Daily Quizzes</h2>
        <p className="text-xs text-slate-500 font-semibold">Take date-wise quizzes. Unlocks are based on paid courses.</p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* LIST STATE */}
        {quizState === 'list' && (
          <motion.div 
            key="quiz-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {dailyQuizzes.map((dayGroup, groupIdx) => (
              <div key={groupIdx} className="space-y-4">
                {/* Date Header */}
                <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
                  <span className="text-sm font-black text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl">
                    📅 {dayGroup.date}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">4 Course Tracks Available</span>
                </div>

                {/* Quizzes Grid for this Day */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {dayGroup.quizzes.map((quiz) => (
                    <div 
                      key={quiz.id}
                      className={`bg-white border rounded-3xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-indigo-50/5 transition-all duration-300 relative group overflow-hidden ${
                        quiz.paid 
                          ? 'border-slate-200/60 hover:border-indigo-500/20' 
                          : 'border-slate-200/30 bg-slate-50/10'
                      }`}
                    >
                      {/* Watermark Locked Icon */}
                      {!quiz.paid && (
                        <div className="absolute top-4 right-4 bg-slate-50 border border-slate-200/80 p-1.5 rounded-lg text-slate-400">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div className="space-y-2">
                        {/* Course Tag */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border ${
                            quiz.difficulty === 'Beginner' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 
                            quiz.difficulty === 'Intermediate' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                            'bg-rose-50 border-rose-200 text-rose-600'
                          }`}>
                            {quiz.difficulty}
                          </span>
                          {!quiz.paid && (
                            <span className="text-[8px] bg-slate-100 border border-slate-200 text-slate-400 font-bold px-1.5 py-0.5 rounded-full">
                              LOCKED
                            </span>
                          )}
                        </div>
                        
                        {/* Course Name */}
                        <span className="text-[9px] text-indigo-500 font-black uppercase tracking-wider block pt-1">
                          {quiz.courseName}
                        </span>

                        {/* Quiz name */}
                        <h3 className={`font-display font-black text-xs sm:text-sm pt-0.5 leading-snug ${
                          quiz.paid ? 'text-slate-800 group-hover:text-indigo-600 transition-colors' : 'text-slate-400'
                        }`}>
                          {quiz.name}
                        </h3>

                        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold pt-1">
                          <span className="flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-slate-300" />
                            {quiz.paid ? `${quiz.questionsCount} MCQs` : '3 MCQs'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-300" />
                            {quiz.duration}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4 mt-5 flex justify-between items-center bg-white">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                          {quiz.status === 'completed' ? `Score: ${quiz.score}` : 'Pending'}
                        </span>
                        
                        <button 
                          onClick={() => handleStartQuiz(quiz)}
                          className={`px-3 py-1.5 font-display text-[10px] font-black rounded-lg cursor-pointer transition-all ${
                            !quiz.paid 
                              ? 'bg-slate-50 text-slate-400 border border-slate-200 hover:text-slate-700' 
                              : quiz.status === 'completed' 
                                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                          }`}
                        >
                          {!quiz.paid ? 'Unlock' : quiz.status === 'completed' ? 'Retake' : 'Start'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAKING QUIZ STATE */}
        {quizState === 'taking' && (
          <motion.div 
            key="quiz-taking"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xl space-y-6"
          >
            {/* Taking Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-display font-black text-sm text-slate-800">{activeQuiz.name}</h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-mono text-xs font-bold shrink-0">
                <Clock className="w-4 h-4" />
                {timeLeft}s
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="space-y-4 text-left">
              <h4 className="font-display font-bold text-sm sm:text-base text-slate-800 leading-normal">
                {quizQuestions[currentQuestionIndex].text}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {quizQuestions[currentQuestionIndex].options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(optIdx)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-xs font-semibold leading-normal transition-all text-left cursor-pointer ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold' 
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {option}
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-indigo-600 bg-indigo-600 text-white text-[9px]' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && '✓'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button 
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 text-white disabled:text-slate-300 font-display text-xs font-black rounded-xl shadow-md cursor-pointer flex items-center gap-1"
              >
                {currentQuestionIndex === quizQuestions.length - 1 ? 'Submit Quiz' : 'Next Question'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* RESULTS STATE */}
        {quizState === 'result' && (
          <motion.div 
            key="quiz-result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xl space-y-6"
          >
            {/* Header */}
            <div className="text-center space-y-3 pb-6 border-b border-slate-100">
              <div className="w-16 h-16 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
                🏆
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-black text-lg text-slate-800">Quiz Completed!</h3>
                <p className="text-xs text-slate-400">Here is your comprehensive score breakdown</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Accuracy</span>
                <span className="text-base font-black text-indigo-600 mt-1 block font-mono">{results.accuracy}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Score</span>
                <span className="text-base font-black text-slate-800 mt-1 block font-mono">{results.score} / {results.total}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Time Taken</span>
                <span className="text-base font-black text-slate-800 mt-1 block font-mono">{results.timeTaken}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">XP Earned</span>
                <span className="text-base font-black text-orange-500 mt-1 block font-mono">+80 XP</span>
              </div>
            </div>

            {/* AI Performance Analysis feedback panel */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4.5 text-left space-y-3.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-indigo-600 shadow-xs shrink-0">
                  <Sparkles className="w-3.5 h-3.5 fill-indigo-100" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs text-indigo-900 leading-none">Performance Diagnostics Analysis</h4>
                  <p className="text-[8px] text-indigo-500 font-semibold leading-none mt-1">Generated dynamically from evaluation metrics</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-indigo-950/90 font-semibold leading-relaxed">
                <div>
                  <span className="text-[10px] font-black text-indigo-600 uppercase block">🟢 Core Strengths</span>
                  Excellent understanding of prompt formats. You correctly answered few-shot prompt parameters.
                </div>
                <div>
                  <span className="text-[10px] font-black text-orange-500 block">🔴 Recommendations</span>
                  Revise Hallucinations constraints and temperature settings. Temperature control controls semantic entropy, which directly prevents incorrect generative answers.
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button 
                onClick={() => handleStartQuiz(activeQuiz)}
                className="px-5 py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 rounded-xl font-display text-xs font-black cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-4 h-4" /> Retake
              </button>
              <button 
                onClick={() => setQuizState('list')}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-display text-xs font-black shadow-md cursor-pointer"
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* LOCK / SUBSCRIPTION UPGRADE MODAL */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={() => setShowUpgradeModal(false)} />
            
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl relative z-10 w-full max-w-sm text-center space-y-4"
            >
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center text-xl mx-auto shadow-inner">
                🔒
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-black text-base text-slate-800">Quiz Locked</h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  The daily quiz for **"{selectedCourseName}"** is a premium feature.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed pt-1.5">
                  Unlock all 4 course tracks, daily quizzes, coding sandboxes, and AI study planners by upgrading your subscription.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-display text-xs font-black shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-indigo-400" />
                  Upgrade Subscription
                </button>
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-display text-xs font-black cursor-pointer transition-all"
                >
                  Contact Administration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default QuizzesView;
