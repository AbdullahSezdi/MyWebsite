const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  technologies: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: null
  },
  links: {
    github: String,
    demo: String,
    documentation: String
  },
  projectDetails: {
    problem: String,
    solution: String,
    methodology: String,
    results: String,
    conclusions: String
  },
  charts: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema); 