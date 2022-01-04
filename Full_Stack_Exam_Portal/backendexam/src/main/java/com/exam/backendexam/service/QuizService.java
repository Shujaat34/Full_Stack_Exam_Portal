package com.exam.backendexam.service;

import com.exam.backendexam.model.Quiz;

import java.util.Set;

public interface QuizService {
    Quiz addQuiz(Quiz quiz);

    Quiz updateQuiz(Quiz quiz);

    Set<Quiz> getAllQuizzes();

    Quiz getQuizById(Long id);

    void deleteById(Long id);

    Set<Quiz> getActiveQuizzes();

    Set<Quiz> getActiveQuizzesOfCategory(Long categoryId);
}
