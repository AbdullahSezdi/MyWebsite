'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import Image from 'next/image'

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  publishDate: string;
  readTime: string;
}

export default function BlogPost() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.slug}`);
        if (!response.ok) {
          throw new Error('Blog yazısı yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        setPost(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Blog yazısı yüklenirken bir hata oluştu');
        console.error('Blog yükleme hatası:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchBlogPost();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="pt-24 px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Yükleniyor...
          </h1>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="pt-24 px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {error || 'Yazı bulunamadı'}
          </h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 mt-4 inline-block">
            Blog'a Dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <AnimatedSection className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              {post.title}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 flex flex-wrap justify-center gap-2"
            >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900 dark:text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400"
            >
              <span>{new Date(post.publishDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span>•</span>
              <span>{post.readTime} dk okuma</span>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Blog Content */}
      <AnimatedSection className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-8"
          >
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-contain p-8"
                sizes="(max-width: 1536px) 100vw, 1536px"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/blog/default.svg';
                }}
              />
            )}
          </motion.div>

          {/* Post Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              className="markdown-content prose prose-lg dark:prose-invert max-w-none
                prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-p:text-gray-600 dark:prose-p:text-gray-300
                prose-strong:text-gray-900 dark:prose-strong:text-white
                prose-code:text-blue-600 dark:prose-code:text-blue-400
                prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20
                prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
                prose-pre:p-4 prose-pre:rounded-lg
                prose-a:text-blue-600 dark:prose-a:text-blue-400
                prose-a:no-underline hover:prose-a:text-blue-700
                prose-li:text-gray-600 dark:prose-li:text-gray-300
                prose-img:rounded-lg prose-img:shadow-lg"
            >
              {post.content}
            </ReactMarkdown>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Back to Blog */}
      <AnimatedSection className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link 
            href="/blog"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            ← Tüm Yazılara Dön
          </Link>
        </div>
      </AnimatedSection>
    </div>
  )
} 