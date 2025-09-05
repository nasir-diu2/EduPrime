import Navbar from '../components/landing/Navbar.jsx';

export default function TuitionFeesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tuition & Fees</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Program-wise fee structure and payment information
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full border divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Program</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tuition (per year)</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Other Fees</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3">B.Sc. in CSE</td>
                  <td className="px-4 py-3">$8,000</td>
                  <td className="px-4 py-3">$500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">BBA</td>
                  <td className="px-4 py-3">$6,500</td>
                  <td className="px-4 py-3">$450</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">MBA</td>
                  <td className="px-4 py-3">$10,000</td>
                  <td className="px-4 py-3">$600</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Financial Aid</h2>
            <p className="text-gray-600">We offer scholarships and need-based aid. Contact financialaid@eduprime.edu for details.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

