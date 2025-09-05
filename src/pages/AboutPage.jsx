import Navbar from '../components/landing/Navbar.jsx';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp">
              About EduPrime
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto animate-fadeInUp animation-delay-200">
              Empowering minds and shaping futures through excellence in education since 1985
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At EduPrime, we are committed to providing world-class education that prepares students 
                for the challenges of tomorrow. Our mission is to foster critical thinking, creativity, 
                and innovation while maintaining the highest standards of academic excellence.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe in nurturing not just academic growth, but also personal development, 
                ensuring our graduates become responsible global citizens who contribute positively 
                to society.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students in classroom"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-blue-600 bg-opacity-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <img
                src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="University campus"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-blue-600 bg-opacity-10 rounded-lg"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To be the leading educational institution that transforms lives through innovative 
                learning experiences, cutting-edge research, and meaningful community engagement.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a future where our graduates lead positive change in their communities 
                and industries, armed with the knowledge, skills, and values needed to thrive in 
                an ever-evolving world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Four decades of educational excellence and innovation
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            
            <div className="space-y-12">
              {/* Timeline Item 1 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">1985</h3>
                    <h4 className="text-lg font-medium text-blue-600 mb-2">Foundation</h4>
                    <p className="text-gray-600">
                      EduPrime was established with a vision to provide quality education 
                      and started with just 100 students and 10 faculty members.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                <div className="flex-1 pl-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">1995</h3>
                    <h4 className="text-lg font-medium text-blue-600 mb-2">Expansion</h4>
                    <p className="text-gray-600">
                      Expanded to include graduate programs and research facilities, 
                      establishing ourselves as a comprehensive educational institution.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">2005</h3>
                    <h4 className="text-lg font-medium text-blue-600 mb-2">Digital Innovation</h4>
                    <p className="text-gray-600">
                      Pioneered online learning platforms and digital resources, 
                      making education accessible to students worldwide.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Timeline Item 4 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                <div className="flex-1 pl-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">2020</h3>
                    <h4 className="text-lg font-medium text-blue-600 mb-2">Global Recognition</h4>
                    <p className="text-gray-600">
                      Achieved international accreditation and recognition, 
                      with over 50,000 alumni making impact globally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet the visionaries leading our institution forward
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Leader 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Dr. James Wilson"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dr. James Wilson</h3>
                <p className="text-blue-600 font-medium mb-3">President & Chancellor</p>
                <p className="text-gray-600 text-sm">
                  Leading EduPrime with over 25 years of experience in higher education 
                  and a vision for innovative learning.
                </p>
              </div>
            </div>

            {/* Leader 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Dr. Sarah Chen"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dr. Sarah Chen</h3>
                <p className="text-blue-600 font-medium mb-3">Vice President of Academics</p>
                <p className="text-gray-600 text-sm">
                  Overseeing academic excellence and curriculum development with expertise 
                  in educational technology and pedagogy.
                </p>
              </div>
            </div>

            {/* Leader 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Dr. Michael Rodriguez"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dr. Michael Rodriguez</h3>
                <p className="text-blue-600 font-medium mb-3">Dean of Research</p>
                <p className="text-gray-600 text-sm">
                  Driving research initiatives and fostering innovation across all 
                  departments with a focus on real-world applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                Striving for the highest standards in education, research, and service.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                Maintaining honesty, transparency, and ethical conduct in all our actions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Embracing new ideas and technologies to enhance learning experiences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                Building strong relationships and contributing to society's betterment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">EduPrime</h3>
            <p className="text-gray-400 mb-4">
              Empowering minds, shaping futures with excellence in education
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 EduPrime. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}