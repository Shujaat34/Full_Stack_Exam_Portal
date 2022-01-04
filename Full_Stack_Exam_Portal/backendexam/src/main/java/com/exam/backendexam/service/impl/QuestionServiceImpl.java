package com.exam.backendexam.service.impl;

import com.exam.backendexam.model.Question;
import com.exam.backendexam.model.Quiz;
import com.exam.backendexam.repository.QuestionRepository;
import com.exam.backendexam.repository.QuizRepository;
import com.exam.backendexam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public Set<Question> getAllQuestions() {
        return questionRepository.findAll().stream().collect(Collectors.toSet());
    }

    @Override
    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).get();
    }

    @Override
    public List<Question> getQuestionsOfQuiz(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).get();
        Set<Question> questions = quiz.getQuestions();
        List<Question> questionList = new ArrayList<>(questions);

        if (questionList.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            questionList = questionList.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()));
        }
        Collections.shuffle(questionList);
        return questionList;
    }

    @Override
    public List<Question> getQuestionsOfQuizAdmin(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).get();
        Set<Question> questions = quiz.getQuestions();
        List<Question> questionList = new ArrayList<>(questions);
        return questionList;
    }

    @Override
    public void deleteQuestionById(Long questionId) {
        questionRepository.deleteById(questionId);
    }
}
