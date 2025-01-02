'use client'

import Navbar from '@/components/layout/Navbar'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Yetenekler verisi
const skills = {
  'Programlama': ['Python', 'SQL'],
  'Veri Analizi': ['Statistical Analysis', 'NumPy', 'SciPy', 'A/B Testing', 'Statsmodels', 'Data Mining'],
  'Makine Öğrenmesi': ['Scikit-learn', 'XGBoost', 'LightGBM', 'Predictive Modeling'],
  'Veri İşleme': ['Data Cleaning', 'Pandas', 'Feature Engineering', 'Preprocessing'],
  'Görselleştirme': ['Tableau', 'Matplotlib', 'Seaborn'],
  'Doğal Dil İşleme': ['NLTK', 'SpaCy'],
  'Zaman Serileri': ['Statsmodels', 'Prophet'],
  'Derin Öğrenme': ['TensorFlow', 'Keras']
}

// Eğitim verisi
const education = [
  {
    school: 'ADNAN MENDERES UNIVERSITY',
    degree: 'Bachelor of Computer Engineering',
    date: '2019 - 2024',
    description: 'GPA: 3.35 / 4.0'
  }
]

// İş deneyimi
const experience = [
  {
    company: 'Co-CRM',
    position: 'Data Mining Intern',
    date: '10/2024 - 11/2024',
    description: 'Web scraping, data collection and management, tool proficiency in data analysis.',
    achievements: [
      'Developed scripts to extract and organize data from Google searches for over 2,000 Turkish company names',
      'Gathered key company details with 90% accuracy, ensuring data quality',
      'Utilized Excel and SQL for efficient data recording and database management',
      'Applied both manual and automated approaches to address discrepancies in search results'
    ]
  },
  {
    company: 'Anadolu University',
    position: 'IT Department Intern',
    date: '07/2023 - 08/2023',
    description: 'SQL & data preparation, KPI tracking, and data visualization.',
    achievements: [
      'Utilized complex SQL queries to extract, clean, and prepare data for analysis',
      'Created reports to track university\'s Key Performance Indicators',
      'Developed KPI-focused interactive dashboards in Tableau for quick data access'
    ]
  }
]

// Sertifikalar
const certificates = [
  {
    name: 'HackerRank SQL Advanced Certificate',
    issuer: 'HackerRank',
    date: '2024'
  },
  {
    name: 'Miuul Machine Learning Bootcamp',
    issuer: 'Miuul',
    date: '2024'
  }
]

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <AnimatedSection className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              Hakkımda
            </motion.h1>
          </div>
        </div>
      </AnimatedSection>

      {/* Bio Section */}
      <AnimatedSection className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-48 h-48 relative rounded-full overflow-hidden"
            >
              <Image
                src="/profile.svg"
                alt="Profil Fotoğrafı"
                fill
                className="object-contain p-4"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Merhaba! 👋
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Merhaba, ben Abdullah Sezdi. Veri bilimi alanında uzmanlaşmış bir mühendis olarak, karmaşık problemleri 
                çözmek ve stratejik içgörüler üretmek için verinin gücünü kullanıyorum. Python, SQL, makine öğrenimi ve 
                zaman serileri analizi gibi alanlarda derinlemesine bilgiye sahibim.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                Projelerimde, müşteri segmentasyonundan zaman serisi tahminlerine, duygu analizinden fiyat modellemelerine 
                kadar geniş bir yelpazede çözümler geliştirdim. Amacım, veriyi anlamlı içgörülere dönüştürerek, teknolojiyle 
                iş dünyasını bir adım öteye taşımak. İleri görüşlü, yaratıcı ve sonuç odaklı bir profesyonel olarak, her 
                projede fark yaratmaya odaklanıyorum.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Teknik Yetenekler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900 dark:text-blue-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            İş Deneyimi
          </h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {job.position}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {job.company}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {job.date}
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {job.description}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  {job.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Education Section */}
      <AnimatedSection className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Eğitim
          </h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {edu.school}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {edu.date}
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {edu.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Certificates Section */}
      <AnimatedSection className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Sertifikalar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {cert.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {cert.issuer}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {cert.date}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
} 