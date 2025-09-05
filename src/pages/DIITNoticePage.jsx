import Navbar from '../components/landing/Navbar.jsx';

export default function DIITNoticePage() {
  const notices = [
    { id: 1, title: 'Midterm Exam Schedule Published', date: '2025-02-01' },
    { id: 2, title: 'Campus Closure on National Holiday', date: '2025-02-15' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">DIIT Notice</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Official notices and announcements from DIIT.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {notices.map(n => (
              <div key={n.id} className="p-5 border rounded-lg hover:bg-gray-50 transition">
                <p className="text-sm text-gray-500">{n.date}</p>
                <h3 className="text-lg font-semibold text-gray-900">{n.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

