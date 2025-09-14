import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  X,
  Play,
  Trophy,
  Star,
  CheckCircle,
  ArrowRight,
  Gamepad2,
  Brain,
  Target,
  Award,
  Zap,
  Recycle,
  Leaf,
  Globe,
  Lightbulb
} from 'lucide-react';

interface EcoEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
}

interface Game {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

const EcoEducationModal: React.FC<EcoEducationModalProps> = ({ isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'quiz' | 'games' | 'tutorials'>('overview');
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which bin should you use for plastic bottles?",
      options: ["Green Bin (Organic)", "Blue Bin (Recyclable)", "Red Bin (Hazardous)", "Black Bin (General)"],
      correct: 1,
      explanation: "Plastic bottles go in the Blue Bin for recyclables. Make sure to clean them first and remove caps!",
      points: 10
    },
    {
      id: 2,
      question: "What percentage of plastic waste is actually recycled globally?",
      options: ["50%", "25%", "9%", "75%"],
      correct: 2,
      explanation: "Only about 9% of plastic waste is recycled globally. This is why reducing plastic use is so important!",
      points: 15
    },
    {
      id: 3,
      question: "Which of these items takes the longest to decompose?",
      options: ["Apple core (2 months)", "Plastic bottle (450 years)", "Paper (2-6 weeks)", "Glass bottle (1 million years)"],
      correct: 3,
      explanation: "Glass bottles can take up to 1 million years to decompose, but they're 100% recyclable indefinitely!",
      points: 20
    },
    {
      id: 4,
      question: "What is the best way to dispose of electronic waste?",
      options: ["Regular trash bin", "Recycling bin", "E-waste collection center", "Bury in backyard"],
      correct: 2,
      explanation: "E-waste contains valuable materials and toxic substances. Always take it to certified e-waste centers!",
      points: 15
    },
    {
      id: 5,
      question: "Which composting method is best for apartments?",
      options: ["Large outdoor pile", "Bokashi composting", "Burning waste", "Throwing in regular bin"],
      correct: 1,
      explanation: "Bokashi composting is perfect for apartments - it's odorless, compact, and very effective!",
      points: 10
    }
  ];

  const games: Game[] = [
    {
      id: 'waste-sorting',
      title: 'Waste Sorting Challenge',
      description: 'Sort different waste items into correct bins as fast as possible!',
      icon: Recycle,
      color: 'bg-green-500',
      difficulty: 'Easy',
      points: 50
    },
    {
      id: 'eco-memory',
      title: 'Eco Memory Game',
      description: 'Match eco-friendly products with their sustainable alternatives!',
      icon: Brain,
      color: 'bg-blue-500',
      difficulty: 'Medium',
      points: 75
    },
    {
      id: 'carbon-calculator',
      title: 'Carbon Footprint Race',
      description: 'Calculate and reduce your carbon footprint faster than others!',
      icon: Globe,
      color: 'bg-purple-500',
      difficulty: 'Hard',
      points: 100
    },
    {
      id: 'recycling-quiz',
      title: 'Recycling Master Quiz',
      description: 'Test your knowledge about recycling processes and materials!',
      icon: Lightbulb,
      color: 'bg-orange-500',
      difficulty: 'Medium',
      points: 60
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: "Waste Segregation 101",
      duration: "5 min",
      description: "Learn the basics of proper waste segregation",
      completed: false
    },
    {
      id: 2,
      title: "Home Composting Guide",
      duration: "8 min",
      description: "Step-by-step guide to start composting at home",
      completed: false
    },
    {
      id: 3,
      title: "Plastic-Free Living",
      duration: "10 min",
      description: "Tips and tricks to reduce plastic in daily life",
      completed: false
    },
    {
      id: 4,
      title: "Energy Conservation",
      duration: "6 min",
      description: "Simple ways to save energy and reduce bills",
      completed: false
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    
    if (selectedAnswer === quizQuestions[currentQuiz].correct) {
      setScore(score + quizQuestions[currentQuiz].points);
      setCompletedQuestions([...completedQuestions, currentQuiz]);
    }
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
    } else {
      // Quiz completed
      setSelectedTab('overview');
      setCurrentQuiz(0);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompletedQuestions([]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        {/* Modal */}
        <motion.div
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh]"
          initial={{ scale: 0.8, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Eco Education Center</h2>
                  <p className="text-sm text-white/80">Learn, Play, and Earn EcoPoints!</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-white/80">Your Score</p>
                  <p className="text-xl font-bold">{score} pts</p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: 'overview', label: 'Overview', icon: Target },
                { id: 'quiz', label: 'Quiz', icon: Brain },
                { id: 'games', label: 'Games', icon: Gamepad2 },
                { id: 'tutorials', label: 'Tutorials', icon: Play }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                    selectedTab === tab.id
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {selectedTab === 'overview' && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Eco Education!</h3>
                  <p className="text-gray-600 mb-6">
                    Learn about sustainability, play interactive games, and earn EcoPoints while making a difference!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-green-900">Quiz Master</h4>
                    <p className="text-sm text-green-700">Complete quizzes to test your knowledge</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <Gamepad2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-900">Interactive Games</h4>
                    <p className="text-sm text-blue-700">Play fun games while learning</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <Play className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-purple-900">Video Tutorials</h4>
                    <p className="text-sm text-purple-700">Watch step-by-step guides</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-orange-900">Earn Points</h4>
                    <p className="text-sm text-orange-700">Get rewarded for learning</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Your Progress</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{completedQuestions.length}</div>
                      <div className="text-sm text-gray-600">Quizzes Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{score}</div>
                      <div className="text-sm text-gray-600">Total Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">0</div>
                      <div className="text-sm text-gray-600">Games Played</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">0</div>
                      <div className="text-sm text-gray-600">Tutorials Watched</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedTab === 'quiz' && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    Question {currentQuiz + 1} of {quizQuestions.length}
                  </h3>
                  <motion.button
                    onClick={resetQuiz}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset Quiz
                  </motion.button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">
                        Points: {quizQuestions[currentQuiz].points}
                      </span>
                      <div className="flex space-x-1">
                        {quizQuestions.map((_, index) => (
                          <div
                            key={index}
                            className={`w-3 h-3 rounded-full ${
                              index === currentQuiz
                                ? 'bg-blue-500'
                                : completedQuestions.includes(index)
                                ? 'bg-green-500'
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      {quizQuestions[currentQuiz].question}
                    </h4>
                  </div>

                  <div className="space-y-3 mb-6">
                    {quizQuestions[currentQuiz].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                          selectedAnswer === index
                            ? showResult
                              ? index === quizQuestions[currentQuiz].correct
                                ? 'bg-green-100 border-green-500 text-green-800'
                                : 'bg-red-100 border-red-500 text-red-800'
                              : 'bg-blue-100 border-blue-500 text-blue-800'
                            : showResult && index === quizQuestions[currentQuiz].correct
                            ? 'bg-green-100 border-green-500 text-green-800'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: showResult ? 1 : 1.02 }}
                        whileTap={{ scale: showResult ? 1 : 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswer === index
                              ? showResult
                                ? index === quizQuestions[currentQuiz].correct
                                  ? 'border-green-500 bg-green-500'
                                  : 'border-red-500 bg-red-500'
                                : 'border-blue-500 bg-blue-500'
                              : showResult && index === quizQuestions[currentQuiz].correct
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300'
                          }`}>
                            {(selectedAnswer === index && showResult) || (showResult && index === quizQuestions[currentQuiz].correct) ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : null}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {showResult && (
                    <motion.div
                      className="bg-blue-50 p-4 rounded-lg mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h5 className="font-semibold text-blue-900 mb-2">Explanation:</h5>
                      <p className="text-blue-800">{quizQuestions[currentQuiz].explanation}</p>
                    </motion.div>
                  )}

                  <div className="flex justify-between">
                    <div className="text-sm text-gray-500">
                      Score: {score} points
                    </div>
                    <div className="space-x-2">
                      {!showResult ? (
                        <motion.button
                          onClick={handleSubmitAnswer}
                          disabled={selectedAnswer === null}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Submit Answer
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={handleNextQuestion}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>{currentQuiz < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                          <ArrowRight className="h-4 w-4" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedTab === 'games' && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Games</h3>
                  <p className="text-gray-600">Play fun games while learning about sustainability!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {games.map((game) => (
                    <motion.div
                      key={game.id}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`${game.color} p-3 rounded-lg`}>
                          <game.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{game.title}</h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              game.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                              game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {game.difficulty}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">{game.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm text-gray-600">{game.points} points</span>
                            </div>
                            <motion.button
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Play className="h-4 w-4" />
                              <span>Play Now</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {selectedTab === 'tutorials' && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Video Tutorials</h3>
                  <p className="text-gray-600">Watch step-by-step guides to become an eco expert!</p>
                </div>

                <div className="space-y-4">
                  {tutorials.map((tutorial) => (
                    <motion.div
                      key={tutorial.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-lg font-semibold text-gray-900">{tutorial.title}</h4>
                            <span className="text-sm text-gray-500">{tutorial.duration}</span>
                          </div>
                          <p className="text-gray-600 mb-2">{tutorial.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {tutorial.completed ? (
                                <div className="flex items-center space-x-1 text-green-600">
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="text-sm">Completed</span>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-500">Not started</span>
                              )}
                            </div>
                            <motion.button
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Play className="h-4 w-4" />
                              <span>Watch</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EcoEducationModal;