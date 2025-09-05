import Navbar from '../components/landing/Navbar.jsx';

export default function AdmissionInstructionPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admission Instructions</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Follow these steps to complete your application successfully
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="space-y-4 list-decimal list-inside text-gray-800">
            <li>
              Review eligibility criteria for your chosen program.
            </li>
            <li>
              Prepare required documents: transcripts, test scores, ID, resume.
            </li>
            <li>
              Complete the online application and pay the application fee.
            </li>
            <li>
              Submit recommendations and personal statement if required.
            </li>
            <li>
              Track your application status via your applicant portal.
            </li>
          </ol>
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Need help?</h2>
            <p className="text-gray-600">Contact admissions at admissions@eduprime.edu or call +1 (555) 234-5678.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

