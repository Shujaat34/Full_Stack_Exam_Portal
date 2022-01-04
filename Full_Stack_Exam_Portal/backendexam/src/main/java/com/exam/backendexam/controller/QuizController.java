package com.exam.backendexam.controller;

import com.exam.backendexam.model.Quiz;
import com.exam.backendexam.service.CategoryService;
import com.exam.backendexam.service.QuizService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin("*")
@RestController
@Api(tags = "Quiz Api")
@RequestMapping("/quiz")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/")
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizService.addQuiz(quiz));
    }

    @PutMapping("/")
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizService.updateQuiz(quiz));
    }

    @GetMapping("/")
    public ResponseEntity<Set<Quiz>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<Quiz> getQuiz(@PathVariable("quizId") Long quizId) {
        return ResponseEntity.ok(quizService.getQuizById(quizId));
    }

    @DeleteMapping("/{quizId}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable("quizId") Long quizId) {
        quizService.deleteById(quizId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/category/{cateId}")
    public ResponseEntity<Set<Quiz>> getQuizzesOfCategory(@PathVariable("cateId") Long cateId) {
        return ResponseEntity.ok(categoryService.getQuizzesOfCategory(cateId));
    }

    //Get All Active Quizzes
    @GetMapping("/active")
    public ResponseEntity<Set<Quiz>> getActiveQuizzes() {
        return ResponseEntity.ok(quizService.getActiveQuizzes());
    }

    @GetMapping("/category/active/{cateId}")
    public ResponseEntity<Set<Quiz>> getActiveQuizzesOfCategory(@PathVariable("cateId")Long cateId) {
        return ResponseEntity.ok(quizService.getActiveQuizzesOfCategory(cateId));
    }
}
