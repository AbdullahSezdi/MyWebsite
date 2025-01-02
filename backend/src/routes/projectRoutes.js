const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Tüm projeleri getir
router.get('/', projectController.getAllProjects);

// ID'ye göre proje getir
router.get('/:id', projectController.getProjectById);

// Kategoriye göre projeleri getir
router.get('/category/:category', projectController.getProjectsByCategory);

// Yeni proje oluştur
router.post('/', projectController.createProject);

// Projeyi güncelle
router.put('/:id', projectController.updateProject);

// Projeyi sil
router.delete('/:id', projectController.deleteProject);

module.exports = router; 