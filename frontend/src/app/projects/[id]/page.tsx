'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { BsGithub, BsGlobe, BsArrowLeft } from 'react-icons/bs'
import Navbar from '@/components/layout/Navbar'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'

interface ProjectDetails {
  problem: string
  solution: string
  methodology: string
  results: string
  conclusions: string
}

interface Project {
  id: number
  title: string
  shortDescription: string
  technologies: string
  category: string
  thumbnail: string | null
  projectDetails: ProjectDetails
  links: {
    github?: string
    demo?: string
    documentation?: string
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProject = async () => {
      setIsLoading(true)
      try {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]')
        const foundProject = projects.find((p: Project) => p.id.toString() === params?.id)
        setProject(foundProject || null)
      } catch (error) {
        console.error('Error loading project:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params?.id) {
      loadProject()
    }
  }, [params?.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-xl" />
            <div className="space-y-4">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Proje Bulunamadı
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Aradığınız proje mevcut değil veya kaldırılmış olabilir.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <BsArrowLeft className="mr-2" />
              Projelere Dön
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px]">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover brightness-50"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/20" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl pt-20"
            >
              <Link
                href="/projects"
                className="inline-flex items-center px-6 py-3 text-lg font-medium text-white hover:text-blue-100 mb-12 transition-colors"
              >
                <BsArrowLeft className="mr-2" size={24} />
                Projelere Dön
              </Link>
              <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-200 bg-blue-900/30 rounded-full">
                {project.category}
              </span>
              <h1 className="text-4xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.split(',').map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium bg-gray-100/10 text-gray-200 rounded-full"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Project Links */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {project.links.github && (
              <Link
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <BsGithub className="mr-2" size={20} />
                <span>GitHub Repo</span>
              </Link>
            )}
            {project.links.demo && (
              <Link
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <BsGlobe className="mr-2" size={20} />
                <span>Demo</span>
              </Link>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-12">
            <AnimatedSection>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Problem
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                {project.projectDetails.problem.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Çözüm
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                {project.projectDetails.solution.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Metodoloji
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                {project.projectDetails.methodology.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Sonuçlar
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                {project.projectDetails.results.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Sonuç
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                {project.projectDetails.conclusions.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  )
} 