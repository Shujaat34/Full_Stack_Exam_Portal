package com.exam.backendexam.service.impl;

import com.exam.backendexam.model.Quiz;
import com.exam.backendexam.repository.QuizRepository;
import com.exam.backendexam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public Set<Quiz> getAllQuizzes() {
        return quizRepository.findAll().stream().collect(Collectors.toSet());
    }

    @Override
    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id).get();
    }

    @Override
    public void deleteById(Long id) {
        quizRepository.deleteById(id);
    }

    @Override
    public Set<Quiz> getActiveQuizzes() {
        return quizRepository.findByIsActiveQuizzes();
    }

    @Override
    public Set<Quiz> getActiveQuizzesOfCategory(Long categoryId) {
        return quizRepository.findByCategoryAndIsActive(categoryId);
    }
}
