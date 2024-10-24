import Question from "../models/Question.js";


// Get all questions
export const getAllQuestions = async (req, res) => {
    try {
      const { questionaire } = req.query;
      const query = questionaire ? { questionaire: Number(questionaire) } : {};
      const questions = await Question.find(query);
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Get a single question by ID
export const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new question
export const createQuestion = async (req, res) => {
    const { questionaire, questionText, answers, correctAnswer } = req.body;

    const newQuestion = new Question({
        questionaire,
        questionText,
        answers,
        correctAnswer
    });

    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a question by ID
export const updateQuestion = async (req, res) => {
    const { questionaire, questionText, answers, correctAnswer } = req.body;

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            { questionaire, questionText, answers, correctAnswer },
            { new: true, runValidators: true }
        );

        if (!updatedQuestion) return res.status(404).json({ message: 'Question not found' });

        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a question by ID
export const deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

        if (!deletedQuestion) return res.status(404).json({ message: 'Question not found' });

        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
