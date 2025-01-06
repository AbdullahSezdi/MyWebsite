'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { BsGithub, BsGlobe, BsArrowLeft } from 'react-icons/bs'
import Navbar from '@/components/layout/Navbar'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'

interface Project {
  _id: string
  title: string
  shortDescription: string
  technologies: string
  category: string
  thumbnail: string | null
  projectDetails: {
    problem: string
    solution: string
    methodology: string
    results: string
    conclusions: string
  }
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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProject = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:5001/api/projects/${params?.id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Proje yüklenirken bir hata oluştu')
        }
        const data = await response.json()
        if (!data) {
          throw new Error('Proje bulunamadı')
        }
        setProject(data)
      } catch (error) {
        console.error('Error loading project:', error)
        setError(error instanceof Error ? error.message : 'Bir hata oluştu')
      } finally {
        setIsLoading(false)
      }
    }

    if (params?.id) {
      loadProject()
    }
  }, [params?.id])

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hata Oluştu
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {error}
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
      <div className="relative min-h-screen">
        {project.thumbnail ? (
          <div className="absolute inset-0 h-[60vh]">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover brightness-[0.3]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/80 to-gray-900" />
          </div>
        ) : (
          <div className="absolute inset-0 h-[60vh] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
        )}

        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Project Info */}
            <div className="max-w-3xl pt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <Link
                    href="/projects"
                    className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors group"
                  >
                    <BsArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={16} />
                    <span>Projelere Dön</span>
                  </Link>

                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-200 bg-blue-500/20 rounded-full">
                    {project.category}
                  </span>
                </div>

                <div className="space-y-6">
                  <h1 className="text-5xl font-bold text-white leading-tight">
                    {project.title}
                  </h1>
                  
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.split(',').map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm font-medium bg-white/5 text-gray-300 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {project.links.github && (
                      <Link
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-[#24292e] hover:bg-[#2f363d] rounded-lg transition-all"
                      >
                        <BsGithub className="mr-2" size={18} />
                        <span>GitHub Repo</span>
                      </Link>
                    )}
                    {project.links.demo && (
                      <Link
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
                      >
                        <BsGlobe className="mr-2" size={18} />
                        <span>Demo</span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative bg-gray-900 pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Project Details */}
              <div className="space-y-12 pb-8">
                {/* Problem Section */}
                <AnimatedSection>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-8">
                      <span className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-xl mr-4 text-xl font-bold">1</span>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Problem ve Motivasyon</h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Projenin çözdüğü temel zorluklar ve motivasyon</p>
                      </div>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      {project.projectDetails.problem.split('\n').map((paragraph, index) => {
                        if (paragraph.startsWith('•')) {
                          return (
                            <div key={index} className="flex items-start space-x-3 mb-4">
                              <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                {paragraph.substring(1).trim()}
                              </p>
                            </div>
                          );
                        } else if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.')) {
                          return (
                            <div key={index} className="mt-8 mb-4">
                              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                                <span className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg mr-3 text-sm font-bold">
                                  {paragraph.split('.')[0]}
                                </span>
                                <span className="border-b-2 border-blue-500 pb-1">
                                  {paragraph.split('.')[1].trim()}
                                </span>
                              </h3>
                            </div>
                          );
                        } else if (paragraph.trim().length > 0) {
                          return (
                            <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                              {paragraph}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </AnimatedSection>

                {/* Solution Section */}
                <AnimatedSection>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-8">
                      <span className="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-xl mr-4 text-xl font-bold">2</span>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Çözüm Yaklaşımı</h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Geliştirilen teknik çözümler ve yaklaşımlar</p>
                      </div>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      {project.projectDetails.solution.split('\n').map((paragraph, index) => {
                        if (paragraph.startsWith('•')) {
                          return (
                            <div key={index} className="flex items-start space-x-3 mb-4">
                              <span className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                {paragraph.substring(1).trim()}
                              </p>
                            </div>
                          );
                        } else if (paragraph.startsWith('-')) {
                          return (
                            <div key={index} className="ml-6 flex items-start space-x-3 mb-3">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                                {paragraph.substring(1).trim()}
                              </p>
                            </div>
                          );
                        } else if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.') || paragraph.startsWith('4.') || paragraph.startsWith('5.')) {
                          return (
                            <div key={index} className="mt-8 mb-4">
                              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                                <span className="w-8 h-8 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg mr-3 text-sm font-bold">
                                  {paragraph.split('.')[0]}
                                </span>
                                <span className="border-b-2 border-green-500 pb-1">
                                  {paragraph.split('.')[1].trim()}
                                </span>
                              </h3>
                            </div>
                          );
                        } else if (paragraph.trim().length > 0) {
                          return (
                            <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                              {paragraph}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </AnimatedSection>

                {/* Methodology Section */}
                <AnimatedSection>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-8">
                      <span className="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-xl mr-4 text-xl font-bold">3</span>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Metodoloji ve Teknik Detaylar</h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Proje geliştirme süreci ve teknik detaylar</p>
                      </div>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      {project.projectDetails.methodology.split('\n').map((paragraph, index) => {
                        if (paragraph.startsWith('•')) {
                          return (
                            <div key={index} className="flex items-start space-x-3 mb-3">
                              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                                {paragraph.substring(1).trim()}
                              </p>
                            </div>
                          );
                        } else if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.') || paragraph.startsWith('4.') || paragraph.startsWith('5.')) {
                          const [number, ...rest] = paragraph.split('.');
                          const title = rest.join('.').trim();
                          return (
                            <div key={index} className="mt-6 first:mt-0 mb-4">
                              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                                <span className="w-8 h-8 flex items-center justify-center bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-lg mr-3 text-sm font-bold">
                                  {number}
                                </span>
                                <span className="border-b-2 border-purple-500 pb-1">
                                  {title}
                                </span>
                              </h3>
                            </div>
                          );
                        } else if (paragraph.trim().length > 0) {
                          return (
                            <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-base pl-4">
                              {paragraph}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </AnimatedSection>

                {/* Results and Conclusions */}
                <AnimatedSection>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Results Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center mb-8">
                        <span className="w-12 h-12 flex items-center justify-center bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-xl mr-4 text-xl font-bold">4</span>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sonuçlar ve Başarı Metrikleri</h2>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Proje sonuçları ve performans metrikleri</p>
                        </div>
                      </div>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        {project.projectDetails.results.split('\n').map((paragraph, index) => {
                          if (paragraph.startsWith('•')) {
                            return (
                              <div key={index} className="flex items-start space-x-3 mb-3">
                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                                  {paragraph.substring(1).trim()}
                                </p>
                              </div>
                            );
                          } else if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.')) {
                            const [number, ...rest] = paragraph.split('.');
                            const title = rest.join('.').trim();
                            return (
                              <div key={index} className="mt-6 first:mt-0 mb-4">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                                  <span className="w-8 h-8 flex items-center justify-center bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-lg mr-3 text-sm font-bold">
                                    {number}
                                  </span>
                                  <span className="border-b-2 border-orange-500 pb-1">
                                    {title}
                                  </span>
                                </h3>
                              </div>
                            );
                          } else if (paragraph.trim().length > 0) {
                            return (
                              <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-base pl-4">
                                {paragraph}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>

                    {/* Conclusions Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center mb-8">
                        <span className="w-12 h-12 flex items-center justify-center bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 rounded-xl mr-4 text-xl font-bold">5</span>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Çıkarımlar</h2>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Öğrenilen dersler ve içgörüler</p>
                        </div>
                      </div>
                      <div>
                        {project.projectDetails.conclusions.split('\n').map((paragraph, index) => {
                          if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.') || paragraph.startsWith('5.')) {
                            const [number, ...rest] = paragraph.split('.');
                            const title = rest.join('.').trim();
                            return (
                              <div key={index} className="mt-12">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400 rounded-lg text-sm font-bold">
                                    {number}
                                  </div>
                                  <div className="flex-1 pb-2 border-b border-pink-500">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                      {title}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            );
                          } else if (paragraph.startsWith('•')) {
                            return (
                              <div key={index} className="flex items-start gap-3 ml-8 mt-4">
                                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-pink-400 dark:bg-pink-500" />
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                  {paragraph.substring(1).trim()}
                                </p>
                              </div>
                            );
                          } else if (paragraph.trim().length > 0 && !paragraph.startsWith('Gelecek adımlar:') && !paragraph.startsWith('-')) {
                            return (
                              <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed ml-[44px] mt-4">
                                {paragraph}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 