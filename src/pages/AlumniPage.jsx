import Navbar from '../components/landing/Navbar.jsx';

export default function AlumniPage() {
  const stories = [
    { id: 1, name: 'Sharmin Sultana', role: 'Software Engineer, TechCorp', quote: 'DIIT gave me the foundation to thrive in tech.' },
    { id: 2, name: 'Raihan Kabir', role: 'Analyst, FinServe', quote: 'Practical learning and supportive faculty made all the difference.' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Alumni</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Success stories and achievements of our graduates.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {stories.map(s => (
            <div key={s.id} className="p-6 border rounded-lg bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{s.name}</h3>
                  <p className="text-blue-700 font-medium">{s.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mt-3">“{s.quote}”</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

