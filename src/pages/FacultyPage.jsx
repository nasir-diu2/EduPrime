import Navbar from '../components/landing/Navbar.jsx';

export default function FacultyPage() {
  const faculty = [
    { id: 1, name: 'Dr. Ayesha Rahman', title: 'Professor, CSE', bio: 'Research in AI and HCI.' },
    { id: 2, name: 'Md. Farid Hasan', title: 'Senior Lecturer, BBA', bio: 'Focus on finance and analytics.' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Faculty</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Meet our experienced educators and researchers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faculty.map(f => (
              <div key={f.id} className="bg-white border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">{f.name}</h3>
                <p className="text-blue-700 font-medium">{f.title}</p>
                <p className="text-gray-600 mt-2">{f.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

