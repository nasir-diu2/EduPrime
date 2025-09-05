import Navbar from '../components/landing/Navbar.jsx';

export default function AdmissionPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admissions</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Everything you need to know to apply to EduPrime
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/admission/query" className="block border rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900">Admission Query</h3>
              <p className="text-gray-600 mt-2">Have questions? Reach admissions for guidance before you apply.</p>
            </a>
            <a href="/admission/instruction" className="block border rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900">Instruction</h3>
              <p className="text-gray-600 mt-2">Step-by-step guide on eligibility, documents, and timelines.</p>
            </a>
            <a href="/admission/tuition-fees" className="block border rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900">Tuition Fees</h3>
              <p className="text-gray-600 mt-2">Program-wise fee structure and available financial aid.</p>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Key Dates</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Applications open: March 1</li>
                <li>Priority deadline: May 15</li>
                <li>Decisions released: June 30</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Eligibility</h2>
              <p className="text-gray-600">Minimum academic requirements vary by program. Strong extracurriculars and essays are encouraged.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

