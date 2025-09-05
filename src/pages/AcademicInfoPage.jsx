import Navbar from '../components/landing/Navbar.jsx';

export default function AcademicInfoPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Info</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Explore academic resources, calendars, and policies.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Academic Calendar</h2>
              <p className="text-gray-600">Key dates for semesters, exams, and registrations.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Policies</h2>
              <p className="text-gray-600">Academic integrity, grading, attendance, and more.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

