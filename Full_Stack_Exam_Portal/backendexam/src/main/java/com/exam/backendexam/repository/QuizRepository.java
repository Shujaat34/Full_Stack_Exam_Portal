package com.exam.backendexam.repository;

import com.exam.backendexam.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    @Query("select quiz from Quiz quiz where quiz.isActive is true")
    Set<Quiz> findByIsActiveQuizzes();

    @Query("select quiz from Quiz quiz where quiz.isActive IS true and quiz.category.id=:cateId")
    Set<Quiz> findByCategoryAndIsActive(Long cateId);
}
