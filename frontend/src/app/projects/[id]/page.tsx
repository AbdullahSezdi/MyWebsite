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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-screen">
        {project?.thumbnail ? (
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
                    {project?.category}
                  </span>
                </div>

                <div className="space-y-6">
                  <h1 className="text-5xl font-bold text-white leading-tight">
                    {project?.title}
                  </h1>
                  
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {project?.shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex flex-wrap gap-3">
                    {project?.technologies.split(',').map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm font-medium bg-white/5 text-gray-300 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {project?.links?.github && (
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
                    {project?.links?.demo && (
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
              <div className="space-y-16 pb-8">
                {/* Problem Section */}
                <AnimatedSection>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-10">
                      <span className="w-14 h-14 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-xl mr-5 text-2xl font-bold">1</span>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Problem ve Motivasyon</h2>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Projenin çözdüğü temel zorluklar ve motivasyon</p>
                      </div>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      {project?.projectDetails?.problem?.split('\n').map((paragraph, index) => {
                        if (!paragraph?.trim()) return null;
                        
                        if (paragraph.includes('•')) {
                          return (
                            <div key={index} className="flex items-start gap-3 mb-2 pl-1">
                              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-[0.6rem]" />
                              <p className="flex-1 text-gray-600 dark:text-gray-300 text-base leading-relaxed -mt-0.5">
                                {paragraph.replace('•', '').trim()}
                              </p>
                            </div>
                          );
                        } else if (paragraph.match(/^\d+\./)) {
                          const [number, ...rest] = paragraph.split('.');
                          const title = rest.join('.').trim();
                          return (
                            <div key={index} className="project-numbered-section">
                              <style jsx>{`
                                .project-numbered-section {
                                  margin-top: 2rem;
                                  margin-bottom: 1rem;
                                }
                                .project-numbered-section:first-child {
                                  margin-top: 0;
                                }
                                .numbered-heading {
                                  display: flex;
                                  align-items: center;
                                }
                                .number-badge {
                                  width: 2rem;
                                  height: 2rem;
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                  background-color: #EFF6FF;
                                  color: #3B82F6;
                                  border-radius: 0.5rem;
                                  margin-right: 0.75rem;
                                  font-size: 0.875rem;
                                  font-weight: 600;
                                }
                                .title-text {
                                  font-size: 1.25rem;
                                  font-weight: 600;
                                  color: #1F2937;
                                  border-bottom: 2px solid #3B82F6;
                                  padding-bottom: 0.25rem;
                                }
                                :global(.dark) .number-badge {
                                  background-color: #1E3A8A;
                                  color: #60A5FA;
                                }
                                :global(.dark) .title-text {
                                  color: #F3F4F6;
                                }
                              `}</style>
                              <h3 className="numbered-heading">
                                <span className="number-badge">{number}</span>
                                <span className="title-text">{title}</span>
                              </h3>
                            </div>
                          );
                        } else if (paragraph.trim().length > 0) {
                          return (
                            <p key={index} className="project-paragraph">
                              <style jsx>{`
                                .project-paragraph {
                                  color: #4B5563;
                                  font-size: 1rem;
                                  line-height: 1.625;
                                  margin-bottom: 1rem;
                                }
                                :global(.dark) .project-paragraph {
                                  color: #D1D5DB;
                                }
                              `}</style>
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
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-8">
                      <span className="w-14 h-14 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-xl mr-5 text-2xl font-bold">2</span>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Çözüm Yaklaşımı</h2>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Geliştirilen teknik çözümler ve yaklaşımlar</p>
                      </div>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      {project?.projectDetails?.solution?.split('\n').map((paragraph, index) => {
                        if (!paragraph?.trim()) return null;
                        
                        if (paragraph.includes('•')) {
                          return (
                            <div key={index} className="flex items-start gap-3 mb-2 pl-1">
                              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 mt-[0.6rem]" />
                              <p className="flex-1 text-gray-600 dark:text-gray-300 text-base leading-relaxed -mt-0.5">
                                {paragraph.replace('•', '').trim()}
                              </p>
                            </div>
                          );
                        } else if (paragraph.match(/^\d+\./)) {
                          const [number, ...rest] = paragraph.split('.');
                          const title = rest.join('.').trim();
                          return (
                            <div key={index} className="mt-8 first:mt-0 mb-4">
                              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                                <span className="w-8 h-8 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg mr-3 text-sm font-bold">
                                  {number}
                                </span>
                                <span className="border-b-2 border-green-500 pb-1">
                                  {title}
                                </span>
                              </h3>
                            </div>
                          );
                        } else if (paragraph.trim().length > 0) {
                          return (
                            <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-base">
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
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-8">
                      <span className="w-14 h-14 flex items-center justify-center bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-xl mr-5 text-2xl font-bold">3</span>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Metodoloji ve Teknik Detaylar</h2>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Proje geliştirme süreci ve teknik detaylar</p>
                      </div>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      {project?.projectDetails?.methodology?.split('\n').map((paragraph, index) => {
                        if (!paragraph?.trim()) return null;
                        
                        if (paragraph.includes('•')) {
                          return (
                            <div key={index} className="flex items-start gap-3 mb-2 pl-1">
                              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-[0.6rem]" />
                              <p className="flex-1 text-gray-600 dark:text-gray-300 text-base leading-relaxed -mt-0.5">
                                {paragraph.replace('•', '').trim()}
                              </p>
                            </div>
                          );
                        } else if (paragraph.match(/^\d+\./)) {
                          const [number, ...rest] = paragraph.split('.');
                          const title = rest.join('.').trim();
                          return (
                            <div key={index} className="mt-8 first:mt-0 mb-4">
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
                            <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-base">
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
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center mb-10">
                        <span className="w-14 h-14 flex items-center justify-center bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-xl mr-5 text-2xl font-bold">4</span>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sonuçlar</h2>
                          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Proje sonuçları ve performans metrikleri</p>
                        </div>
                      </div>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        {project?.projectDetails?.results?.split('\n').map((paragraph, index) => {
                          if (!paragraph?.trim()) return null;
                          
                          if (paragraph.includes('•')) {
                            return (
                              <div key={index} className="flex items-start gap-3 mb-2 pl-1">
                                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-[0.6rem]" />
                                <p className="flex-1 text-gray-600 dark:text-gray-300 text-base leading-relaxed -mt-0.5">
                                  {paragraph.replace('•', '').trim()}
                                </p>
                              </div>
                            );
                          } else if (paragraph.match(/^\d+\./)) {
                            const [number, ...rest] = paragraph.split('.');
                            const title = rest.join('.').trim();
                            return (
                              <div key={index} className="mt-8 first:mt-0 mb-4">
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
                              <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-base">
                                {paragraph}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>

                    {/* Conclusions Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center mb-8">
                        <span className="w-14 h-14 flex items-center justify-center bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 rounded-xl mr-5 text-2xl font-bold">5</span>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Çıkarımlar</h2>
                          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Öğrenilen dersler ve içgörüler</p>
                        </div>
                      </div>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        {project?.projectDetails?.conclusions?.split('\n').map((paragraph, index) => {
                          if (!paragraph?.trim()) return null;
                          
                          if (paragraph.includes('•')) {
                            return (
                              <div key={index} className="flex items-start gap-3 mb-2 pl-1">
                                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-pink-500 mt-[0.6rem]" />
                                <p className="flex-1 text-gray-600 dark:text-gray-300 text-base leading-relaxed -mt-0.5">
                                  {paragraph.replace('•', '').trim()}
                                </p>
                              </div>
                            );
                          } else if (paragraph.match(/^\d+\./)) {
                            const [number, ...rest] = paragraph.split('.');
                            const title = rest.join('.').trim();
                            return (
                              <div key={index} className="mt-8 first:mt-0 mb-4">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                                  <span className="w-8 h-8 flex items-center justify-center bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 rounded-lg mr-3 text-sm font-bold">
                                    {number}
                                  </span>
                                  <span className="border-b-2 border-pink-500 pb-1">
                                    {title}
                                  </span>
                                </h3>
                              </div>
                            );
                          } else if (paragraph.trim().length > 0) {
                            return (
                              <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-base">
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