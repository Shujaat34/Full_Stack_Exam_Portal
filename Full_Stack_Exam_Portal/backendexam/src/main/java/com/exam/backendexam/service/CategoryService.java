package com.exam.backendexam.service;

import com.exam.backendexam.model.Category;
import com.exam.backendexam.model.Quiz;

import java.util.Set;

public interface CategoryService {
    Category addCategory(Category category);

    Category updateCategory(Category category);

    Set<Category> getAllCategories();

    Category getCategoryById(Long id);

    void deleteCategoryById(Long id);

    Set<Quiz> getQuizzesOfCategory(Long cateId);
}
