package com.exam.backendexam.service.impl;

import com.exam.backendexam.model.Category;
import com.exam.backendexam.model.Quiz;
import com.exam.backendexam.repository.CategoryRepository;
import com.exam.backendexam.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Set<Category> getAllCategories() {
        return categoryRepository.findAll().stream().collect(Collectors.toSet());
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    public void deleteCategoryById(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Set<Quiz> getQuizzesOfCategory(Long cateId) {
        Category category = getCategoryById(cateId);
        return category.getQuizzes();
    }

}
