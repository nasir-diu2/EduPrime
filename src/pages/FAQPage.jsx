import Navbar from '../components/landing/Navbar.jsx';

const faqs = [
  {
    q: 'How do I apply to EduPrime?',
    a: 'Visit the Admissions section to review requirements and submit your application online.'
  },
  {
    q: 'Do you offer scholarships?',
    a: 'Yes, we offer merit-based and need-based scholarships. Details are on our Scholarships page.'
  },
  {
    q: 'Is on-campus housing available?',
    a: 'Limited on-campus housing is available for first-year students. Apply early for priority.'
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Answers to common questions about EduPrime
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {faqs.map((item, idx) => (
            <details key={idx} className="bg-white border rounded-lg p-5 shadow-sm group">
              <summary className="cursor-pointer flex items-center justify-between list-none">
                <span className="text-lg font-semibold text-gray-900">{item.q}</span>
                <span className="text-blue-600 group-open:rotate-45 transition-transform">＋</span>
              </summary>
              <p className="text-gray-600 mt-3">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

