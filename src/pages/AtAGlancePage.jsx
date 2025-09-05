import Navbar from '../components/landing/Navbar.jsx';

export default function AtAGlancePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">At A Glance</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Key facts and highlights about EduPrime in one place
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <p className="text-4xl font-extrabold text-blue-600">40+</p>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <p className="text-4xl font-extrabold text-blue-600">50K+</p>
              <p className="text-gray-600">Global Alumni</p>
            </div>
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <p className="text-4xl font-extrabold text-blue-600">100+</p>
              <p className="text-gray-600">Programs Offered</p>
            </div>
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <p className="text-4xl font-extrabold text-blue-600">95%</p>
              <p className="text-gray-600">Graduate Employment Rate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Campus</h2>
              <p className="text-gray-600">State-of-the-art facilities, collaborative spaces, and modern labs.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Faculty</h2>
              <p className="text-gray-600">Experienced educators and industry experts dedicated to student success.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

