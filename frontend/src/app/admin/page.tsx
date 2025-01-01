'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BsFilePost, BsFolder, BsPerson } from 'react-icons/bs'
import { HiOutlineDocumentAdd } from 'react-icons/hi'

// Örnek proje verisi
const sampleProject = {
  id: Date.now(),
  title: "Derin Öğrenme ile Türkçe Duygu Analizi",
  shortDescription: "BERT tabanlı derin öğrenme modeli kullanarak Türkçe sosyal medya gönderilerinde duygu analizi yapan bir sistem geliştirdim.",
  technologies: "Python, PyTorch, Transformers, Scikit-learn, Pandas",
  category: "Derin Öğrenme",
  thumbnail: "https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?q=80&w=1470&auto=format&fit=crop",
  projectDetails: {
    problem: "Sosyal medya platformlarında Türkçe içeriklerin duygu analizini otomatik olarak gerçekleştirmek, manuel analiz süreçlerinin zaman alıcı ve maliyetli olması nedeniyle önemli bir ihtiyaç haline gelmiştir. Mevcut çözümlerin çoğu İngilizce odaklı olup, Türkçe'nin kendine özgü dilbilimsel özelliklerini yeterince ele alamamaktadır.",
    solution: "Bu problemi çözmek için, BERT (Bidirectional Encoder Representations from Transformers) mimarisini temel alan ve Türkçe metinler için özel olarak ince-ayar (fine-tuning) yapılmış bir derin öğrenme modeli geliştirdim. Model, sosyal medya gönderilerini pozitif, negatif ve nötr olmak üzere üç kategoride sınıflandırmaktadır.",
    methodology: "1. Veri Toplama ve Ön İşleme:\n- Twitter API kullanılarak 100,000+ Türkçe tweet toplandı\n- Metin temizleme ve normalizasyon işlemleri uygulandı\n- Dengeli bir veri seti oluşturmak için örnekleme yapıldı\n\n2. Model Geliştirme:\n- BERTurk modelinin transfer learning ile adaptasyonu\n- Hyperparameter optimizasyonu\n- 5-fold cross validation ile model değerlendirmesi\n\n3. Deployment:\n- REST API geliştirme (FastAPI)\n- Docker containerization\n- CI/CD pipeline kurulumu",
    results: "- Model Performansı:\n  * Doğruluk (Accuracy): 91.2%\n  * F1-Score: 0.89\n  * Precision: 0.88\n  * Recall: 0.90\n\n- Gerçek Zamanlı Analiz:\n  * 1000+ tweet/saniye işleme kapasitesi\n  * Ortalama yanıt süresi < 100ms\n\n- Üretim Ortamı:\n  * 99.9% uptime\n  * Otomatik ölçeklendirme ile yük yönetimi",
    conclusions: "Geliştirilen model, Türkçe duygu analizi alanında state-of-the-art sonuçlar elde etmiştir. Özellikle sosyal medya dilinin kendine özgü yapısını ve Türkçe'nin morfolojik zenginliğini başarıyla ele alabilmektedir. Model, marka itibarı yönetimi, müşteri geri bildirimi analizi ve sosyal medya izleme gibi çeşitli alanlarda pratik uygulamalara sahiptir."
  },
  links: {
    github: "https://github.com/username/turkish-sentiment-analysis",
    demo: "https://demo-sentiment.example.com",
    documentation: "https://docs-sentiment.example.com"
  },
  charts: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1476&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1406&auto=format&fit=crop"
  ],
  createdAt: new Date().toISOString()
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects')
  const router = useRouter()

  const addSampleProject = () => {
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]')
    const updatedProjects = [...existingProjects, sampleProject]
    localStorage.setItem('projects', JSON.stringify(updatedProjects))
    alert('Örnek proje başarıyla eklendi!')
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
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projeler</h2>
                <div className="space-x-4">
                  <button 
                    onClick={addSampleProject}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Örnek Proje Ekle
                  </button>
                  <button 
                    onClick={() => router.push('/admin/new-project')}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <HiOutlineDocumentAdd className="mr-2" size={20} />
                    Yeni Proje
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 