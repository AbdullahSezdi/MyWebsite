const fs = require('fs').promises;
const path = require('path');
const Project = require('../models/Project');

// Tüm projeleri getir
exports.getAllProjects = async (req, res) => {
  try {
    const projectsDir = path.join(__dirname, '../../data/projects');
    const files = await fs.readdir(projectsDir);
    const projectPromises = files
      .filter(file => file.endsWith('.json'))
      .map(async file => {
        const filePath = path.join(projectsDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
      });

    const projects = await Promise.all(projectPromises);
    res.json(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    res.status(500).json({ message: error.message });
  }
};

// ID'ye göre proje getir
exports.getProjectById = async (req, res) => {
  try {
    const projectsDir = path.join(__dirname, '../../data/projects');
    const files = await fs.readdir(projectsDir);
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      
      const filePath = path.join(projectsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const project = JSON.parse(content);
      
      if (project._id === req.params.id) {
        return res.json(project);
      }
    }
    
    res.status(404).json({ message: 'Proje bulunamadı' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni proje oluştur
exports.createProject = async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Projeyi güncelle
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      Object.assign(project, req.body);
      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Proje bulunamadı' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Projeyi sil
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.remove();
      res.json({ message: 'Proje silindi' });
    } else {
      res.status(404).json({ message: 'Proje bulunamadı' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kategoriye göre projeleri getir
exports.getProjectsByCategory = async (req, res) => {
  try {
    const projects = await Project.find({ category: req.params.category });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 