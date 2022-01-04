package com.exam.backendexam.service;

import com.exam.backendexam.model.Question;
import com.exam.backendexam.model.Quiz;

import java.util.List;
import java.util.Set;

public interface QuestionService {
    Question addQuestion(Question question);

    Question updateQuestion(Question question);

    Set<Question> getAllQuestions();

    Question getQuestionById(Long id);

    List<Question> getQuestionsOfQuiz(Long quizId);
    List<Question> getQuestionsOfQuizAdmin(Long quizId);


    void deleteQuestionById(Long questionId);
}
