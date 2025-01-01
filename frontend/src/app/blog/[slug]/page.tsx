'use client'

import { useParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import Image from 'next/image'

// Örnek blog yazıları
const posts = [
  {
    id: 1,
    title: 'Yapay Zeka ve Veri Biliminin Geleceği',
    summary: 'Yapay zeka ve veri bilimi alanındaki son gelişmeler ve gelecek trendleri hakkında detaylı bir analiz.',
    category: 'Yapay Zeka',
    tags: ['AI', 'Machine Learning', 'Future Tech'],
    image: '/blog/ai-future.svg',
    publishDate: '2024-02-20',
    readTime: '8 dk',
    slug: 'yapay-zeka-ve-veri-biliminin-gelecegi',
    content: `
# Yapay Zeka ve Veri Biliminin Geleceği

Yapay zeka ve veri bilimi alanları son yıllarda muazzam bir gelişme gösterdi. Bu yazıda, önümüzdeki yıllarda bu alanlarda beklenen gelişmeleri ve trendleri inceleyeceğiz.

## 🔍 Öne Çıkan Trendler

### 1. AutoML ve No-Code AI

- Otomatik makine öğrenmesi platformlarının yaygınlaşması
- Kod yazmadan AI modelleri geliştirme
- Demokratikleşen yapay zeka

### 2. Edge AI ve IoT Entegrasyonu

- Uç cihazlarda AI işleme
- Düşük güç tüketimi
- Gerçek zamanlı işleme kapasitesi

### 3. Açıklanabilir AI (XAI)

- Model kararlarının şeffaflığı
- Etik AI gelişimi
- Regülasyonlara uyum

## 💡 Yeni Teknolojiler

\`\`\`python
# Gelecekte yaygınlaşacak bir XAI örneği
from explainable_ai import LIMEExplainer

def explain_model_decision(model, input_data):
    explainer = LIMEExplainer(model)
    explanation = explainer.explain(input_data)
    return explanation.feature_importance
\`\`\`

## 📊 İstatistikler ve Tahminler

1. **Market Büyüklüğü**
   - 2025'te global AI market büyüklüğü: $190 milyar
   - Yıllık büyüme oranı: %35
   - En hızlı büyüyen sektörler: Sağlık, Finans, Otomotiv

2. **Yeni İş Alanları**
   - AI Ethics Officer
   - Machine Learning Operations Engineer
   - Data Science Team Lead
   - AI Product Manager

## 🎯 Sonuç

Yapay zeka ve veri bilimi alanları hızla evrilmeye devam ediyor. Başarılı olmak için sürekli öğrenme ve adaptasyon kritik önem taşıyor.

## 🔗 Faydalı Kaynaklar

- [AI Trend Report 2024](https://example.com)
- [Future of Data Science](https://example.com)
- [Machine Learning Roadmap](https://example.com)
`
  },
  {
    id: 2,
    title: 'Python ile Veri Analizi: Pandas ve NumPy',
    summary: 'Python\'da veri analizi için kullanılan temel kütüphaneler ve pratik örneklerle kullanımları.',
    category: 'Veri Analizi',
    tags: ['Python', 'Pandas', 'NumPy'],
    image: '/blog/python-data-analysis.svg',
    publishDate: '2024-02-15',
    readTime: '10 dk',
    slug: 'python-ile-veri-analizi',
    content: `
# Python ile Veri Analizi: Pandas ve NumPy

Python'da veri analizi için en çok kullanılan kütüphaneler Pandas ve NumPy'dır. Bu yazıda, bu kütüphanelerin temel kullanımlarını ve pratik örneklerini inceleyeceğiz.

## 📊 Pandas ile Veri Manipülasyonu

### DataFrame Oluşturma ve Temel İşlemler

\`\`\`python
import pandas as pd

# Veri seti oluşturma
data = {
    'isim': ['Ali', 'Ayşe', 'Mehmet'],
    'yaş': [25, 30, 35],
    'şehir': ['İstanbul', 'Ankara', 'İzmir']
}

df = pd.DataFrame(data)
print(df.head())
\`\`\`

### Veri Analizi

\`\`\`python
# Temel istatistikler
print(df.describe())

# Gruplama ve agregasyon
df.groupby('şehir')['yaş'].mean()
\`\`\`

## 🔢 NumPy ile Sayısal İşlemler

### Array İşlemleri

\`\`\`python
import numpy as np

# Array oluşturma
arr = np.array([1, 2, 3, 4, 5])
print(arr * 2)  # Vektörel çarpım

# Matris işlemleri
matrix = arr.reshape(5, 1)
print(matrix.T @ matrix)  # Matris çarpımı
\`\`\`

## 📈 Veri Görselleştirme

\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# Veri görselleştirme
plt.figure(figsize=(10, 6))
sns.scatterplot(data=df, x='yaş', y='maaş')
plt.title('Yaş-Maaş İlişkisi')
plt.show()
\`\`\`

## 🎯 Örnek Proje: Satış Analizi

\`\`\`python
# Satış verilerini okuma
sales_df = pd.read_csv('sales.csv')

# Aylık satış analizi
monthly_sales = sales_df.groupby('ay')['miktar'].sum()

# Sonuçları görselleştirme
plt.figure(figsize=(12, 6))
monthly_sales.plot(kind='bar')
plt.title('Aylık Satış Miktarları')
plt.show()
\`\`\`

## 🔗 Faydalı Kaynaklar

- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [NumPy User Guide](https://numpy.org/doc/stable/user/)
- [Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/)
`
  }
]

export default function BlogPost() {
  const params = useParams()
  const post = posts.find(p => p.slug === params.slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="pt-24 px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Yazı bulunamadı
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
              <span>{post.publishDate}</span>
              <span>•</span>
              <span>{post.readTime}</span>
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
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-contain p-8"
              sizes="(max-width: 1536px) 100vw, 1536px"
              priority
            />
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