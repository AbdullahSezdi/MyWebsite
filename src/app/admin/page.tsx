'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BsFilePost, BsFolder, BsPencil, BsTrash, BsPlus } from 'react-icons/bs'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  shortDescription: string
  category: string
  thumbnail: string | null
  createdAt: string
}

interface BlogPost {
  id: number
  title: string
  summary: string
  category: string
  image: string
  publishDate: string
  slug: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const router = useRouter()

  useEffect(() => {
    // Load projects from localStorage
    const loadedProjects = JSON.parse(localStorage.getItem('projects') || '[]')
    setProjects(loadedProjects)

    // Load blog posts from localStorage
    const loadedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]')
    setBlogPosts(loadedPosts)
  }, [])

  const handleDeleteProject = (id: number) => {
    if (window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      const updatedProjects = projects.filter(project => project.id !== id)
      localStorage.setItem('projects', JSON.stringify(updatedProjects))
      setProjects(updatedProjects)
    }
  }

  const handleDeleteBlogPost = (id: number) => {
    if (window.confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      const updatedPosts = blogPosts.filter(post => post.id !== id)
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
      setBlogPosts(updatedPosts)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center space-x-3 w-full px-4 py-3 text-left ${
                  activeTab === 'projects'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                } rounded-lg shadow hover:shadow-md transition-all duration-200`}
              >
                <BsFolder size={20} />
                <span>Projeler</span>
              </button>
              <button
                onClick={() => setActiveTab('blog')}
                className={`flex items-center space-x-3 w-full px-4 py-3 text-left ${
                  activeTab === 'blog'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                } rounded-lg shadow hover:shadow-md transition-all duration-200`}
              >
                <BsFilePost size={20} />
                <span>Blog Yazıları</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === 'projects' ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projeler</h2>
                    <Link
                      href="/admin/new-project"
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <BsPlus className="mr-2" size={20} />
                      Yeni Proje
                    </Link>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Proje
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Kategori
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Tarih
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            İşlemler
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {projects.map((project) => (
                          <tr key={project.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  {project.thumbnail ? (
                                    <Image
                                      src={project.thumbnail}
                                      alt={project.title}
                                      width={40}
                                      height={40}
                                      className="rounded-lg object-cover"
                                    />
                                  ) : (
                                    <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {project.title}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {project.shortDescription.substring(0, 50)}...
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                {project.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {new Date(project.createdAt).toLocaleDateString('tr-TR')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => router.push(`/admin/edit-project/${project.id}`)}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4"
                              >
                                <BsPencil size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                              >
                                <BsTrash size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Blog Yazıları</h2>
                    <Link
                      href="/admin/new-blog"
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <BsPlus className="mr-2" size={20} />
                      Yeni Yazı
                    </Link>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Yazı
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Kategori
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Yayın Tarihi
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            İşlemler
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {blogPosts.map((post) => (
                          <tr key={post.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={40}
                                    height={40}
                                    className="rounded-lg object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {post.title}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {post.summary.substring(0, 50)}...
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                {post.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {post.publishDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => router.push(`/admin/edit-blog/${post.slug}`)}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4"
                              >
                                <BsPencil size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteBlogPost(post.id)}
                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                              >
                                <BsTrash size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 