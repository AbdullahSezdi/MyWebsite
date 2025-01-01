'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'
import { BsSearch } from 'react-icons/bs'

interface Project {
  id: number
  title: string
  shortDescription: string
  technologies: string
  category: string
  thumbnail: string | null
  links: {
    github?: string
    demo?: string
    documentation?: string
  }
}

const categories = ['Tümü', 'Veri Bilimi', 'Yapay Zeka', 'Makine Öğrenmesi', 'Derin Öğrenme', 'Veri Analizi']

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // localStorage'dan projeleri yükle
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]')
    setProjects(savedProjects)

    // Storage event listener ekle
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'projects') {
        setProjects(JSON.parse(e.newValue || '[]'))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'Tümü' || project.category === selectedCategory
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <AnimatedSection className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Projelerim
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
              Veri bilimi ve yapay zeka alanındaki çalışmalarım
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                    ${selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BsSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Proje veya teknoloji ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Grid */}
      <AnimatedSection className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {project.thumbnail && (
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-500 dark:text-blue-400">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.shortDescription}
                  </p>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.split(',').map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4 mt-4">
                      {project.links.github && (
                        <Link
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        >
                          GitHub
                        </Link>
                      )}
                      {project.links.demo && (
                        <Link
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        >
                          Demo
                        </Link>
                      )}
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-auto group-hover:translate-x-1 transform duration-200"
                      >
                        Detaylar →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery || selectedCategory !== 'Tümü'
                  ? 'Arama kriterlerinize uygun proje bulunamadı.'
                  : 'Henüz hiç proje eklenmemiş.'}
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  )
} 