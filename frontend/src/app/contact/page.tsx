import ContactForm from '@/components/ui/ContactForm'
import { BsGithub, BsLinkedin, BsTwitter, BsEnvelope } from 'react-icons/bs'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Navbar from '@/components/layout/Navbar'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
        <AnimatedSection className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
              İletişim
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Projeleriniz, iş birliği teklifleriniz veya herhangi bir soru için benimle iletişime geçebilirsiniz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                İletişim Bilgileri
              </h2>
              
              <div className="space-y-6">
                <a
                  href="mailto:your.email@example.com"
                  className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 group"
                >
                  <div className="bg-blue-50 dark:bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors duration-200">
                    <BsEnvelope size={24} />
                  </div>
                  <div>
                    <p className="font-medium">E-posta</p>
                    <span className="text-sm">your.email@example.com</span>
                  </div>
                </a>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                    Sosyal Medya
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <BsGithub size={20} />
                    </a>
                    <a
                      href="https://linkedin.com/in/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <BsLinkedin size={20} />
                    </a>
                    <a
                      href="https://twitter.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <BsTwitter size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
              <ContactForm />
            </div>
          </div>
        </AnimatedSection>
      </main>
    </>
  )
} 