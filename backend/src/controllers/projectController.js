const Project = require('../models/Project');

// Tüm projeleri getir
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ID'ye göre proje getir
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Proje bulunamadı' });
    }
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