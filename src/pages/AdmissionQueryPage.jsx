import Navbar from '../components/landing/Navbar.jsx';

export default function AdmissionQueryPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admission Query</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Ask questions and get guidance from our admissions team
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Send a query</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Program of Interest</label>
                <input className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Question</label>
                <textarea rows="5" className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

