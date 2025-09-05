import Navbar from '../components/landing/Navbar.jsx';

export default function CareerPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers at EduPrime</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Join our mission to transform education and empower learners worldwide.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {[1,2,3].map((id) => (
                <div key={id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Senior {id === 1 ? 'Frontend' : id === 2 ? 'Backend' : 'UI/UX'} Engineer</h3>
                      <p className="text-blue-600">Full-time • Knowledge City</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md">Apply</button>
                  </div>
                  <p className="text-gray-600 mt-3">Work with a talented team to build engaging learning experiences.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['React','Node','Figma','Tailwind'].map((s) => (
                      <span key={s} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <aside className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Why work with us</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Mission-driven culture</li>
                  <li>Flexible hybrid work</li>
                  <li>Growth and learning budget</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Benefits</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Healthcare and wellness</li>
                  <li>401(k) with match</li>
                  <li>Generous PTO</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

