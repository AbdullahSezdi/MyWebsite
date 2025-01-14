'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { HiDownload } from 'react-icons/hi'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Navbar from '@/components/layout/Navbar'
import { useState, useEffect, useMemo } from 'react'
import BlogCard from '@/components/blog/BlogCard'

interface Project {
  slug: string
  title: string
  summary: string
  technologies: string
  category: string
  image: string | null
  links: {
    github?: string
    demo?: string
    documentation?: string
  }
}

interface BlogPost {
  slug: string
  title: string
  summary: string
  category: string
  readTime: string
  publishDate: string
  image: string
}

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  // Projeleri memoize edelim
  const memoizedProjects = useMemo(() => 
    featuredProjects.map(project => ({
      ...project,
      technologies: project.technologies.split(',').map(tech => tech.trim())
    })),
    [featuredProjects]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await fetch('http://localhost:5001/api/projects', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        if (!projectsResponse.ok) {
          throw new Error('Failed to fetch projects');
        }
        const projects = await projectsResponse.json();
        setFeaturedProjects(projects.slice(0, 3));

        // Blog yazılarını getir
        const blogsResponse = await fetch('http://localhost:5001/api/blogs', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        if (!blogsResponse.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const blogs = await blogsResponse.json();
        console.log('Fetched Blog Posts:', blogs);
        setBlogPosts(blogs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <AnimatedSection key="hero-section" className="relative pt-32 pb-40 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Sol Taraf - Metin İçeriği */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                      Abdullah Sezdi
                    </span>
                  </h1>
                  <p className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-300">
                    Jr. Data Scientist | Machine Learning & Data Analytics Enthusiast
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                    Yapay zeka ve veri bilimi tutkusuyla, karmaşık problemlere yenilikçi çözümler üretiyorum. 
                    Python, TensorFlow ve scikit-learn kullanarak makine öğrenmesi modelleri geliştiriyor, 
                    veri analizi ile değer yaratan içgörüler elde ediyorum.
                  </p>
                </div>

                {/* Butonlar */}
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/contact"
                    className="group relative inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
                  >
                    <div className="relative w-full">
                      <span className="relative z-10">İletişime Geç</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                    </div>
                  </Link>
                  <a 
                    href="/assets/cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center px-8 py-4 text-lg font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <HiDownload className="mr-2 group-hover:animate-bounce" />
                    CV İndir
                  </a>
                </div>

                {/* Sosyal Medya */}
                <div className="flex gap-4">
                  {[
                    {
                      id: 'github',
                      href: 'https://github.com/AbdullahSezdi',
                      icon: <BsGithub size={28} className="group-hover:text-blue-500 transition-colors duration-200" />
                    },
                    {
                      id: 'linkedin',
                      href: 'https://www.linkedin.com/in/abdullah-sezdi-b648a41b3/',
                      icon: <BsLinkedin size={28} className="group-hover:text-blue-500 transition-colors duration-200" />
                    }
                  ].map(social => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Sağ Taraf - Profil Görseli */}
              <div className="relative lg:order-last order-first">
                <div className="relative w-full max-w-lg mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-blue-400/30 rounded-full blur-[80px] opacity-50 animate-pulse"></div>
                  <div className="relative z-10 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden w-[450px] h-[450px] mx-auto">
                    <Image
                      src="/images/profile.png"
                      alt="Abdullah Sezdi"
                      width={450}
                      height={450}
                      className="w-full h-full object-cover transform hover:scale-[1.02] transition-all duration-300"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Öne Çıkan Projeler */}
        <AnimatedSection key="projects-section" className="py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
                Öne Çıkan Projeler
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Son dönemde geliştirdiğim bazı projeler. Tüm projelerimi görmek için projeler sayfasını ziyaret edebilirsiniz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memoizedProjects.map((project) => (
                <div 
                  key={project.slug} 
                  className="group bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-200"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <div
                        key={`${project.slug}-${tech}`}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <BsGithub size={28} className="group-hover:text-blue-500 transition-colors duration-200" />
                      </a>
                    )}
                    {project.links?.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      >
                        Demo
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-auto group-hover:translate-x-1 transform duration-200"
                    >
                      <div className="flex items-center">
                        <span>Detaylar</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/projects"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div>Tüm Projeleri Gör</div>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Öne Çıkan Blog Yazıları */}
        <AnimatedSection key="blog-section" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
                Son Blog Yazıları
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Veri bilimi, yapay zeka ve teknoloji üzerine yazdığım blog yazıları
              </p>
            </div>

            {/* Blog Posts Grid */}
            {blogPosts.length > 0 && (
              <div key="blog-posts-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div>Tüm Yazıları Gör</div>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </main>
    </>
  )
}
