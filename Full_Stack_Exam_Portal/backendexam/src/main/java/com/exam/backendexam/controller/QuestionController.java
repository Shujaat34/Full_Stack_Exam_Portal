package com.exam.backendexam.controller;

import com.exam.backendexam.model.Question;
import com.exam.backendexam.service.QuestionService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@Api(tags = "Question Api")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(questionService.addQuestion(question));
    }

    @PutMapping("/")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(questionService.updateQuestion(question));
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<List<Question>> getAllQuestionOfQuiz(@PathVariable("quizId") Long quizId) {
        return ResponseEntity.ok(questionService.getQuestionsOfQuiz(quizId));
    }
    @GetMapping("/quiz/all/{quizId}")
    public ResponseEntity<List<Question>> getAllQuestionOfQuizAdmin(@PathVariable("quizId") Long quizId) {
        return ResponseEntity.ok(questionService.getQuestionsOfQuizAdmin(quizId));
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<Question> getQuestion(@PathVariable("questionId") Long questionId) {
        return ResponseEntity.ok(questionService.getQuestionById(questionId));
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable("questionId") Long questionId) {
        questionService.deleteQuestionById(questionId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/eval-quiz")
    public ResponseEntity<Map<String,Object>> evaluateQuestionOfQuiz(@RequestBody List<Question> questions) {
        return ResponseEntity.ok(questionService.evaluateQuestionOfQuiz(questions));
    }

}
