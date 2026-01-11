import { ChevronDown, ChevronUp, Phone, Mail, MessageCircle, ArrowLeft, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface HelpPageProps {
  onBack?: () => void;
}

export default function HelpPage({ onBack }: HelpPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I book a ride?',
      answer: 'Go to the "Book" tab, select your child, choose date and time, then confirm your booking.'
    },
    {
      id: 2,
      question: 'Can I track rides in real-time?',
      answer: 'Yes! Use the "Track" tab to see live location updates and estimated arrival time.'
    },
    {
      id: 3,
      question: 'How do I add children?',
      answer: 'Navigate to "Manage Children" from the menu and tap "Add New Child".'
    },
    {
      id: 4,
      question: 'How can I cancel a ride?',
      answer: 'View your ride in History and contact support. Cancel at least 2 hours before pickup.'
    },
    {
      id: 5,
      question: 'Are drivers verified?',
      answer: 'Yes! All drivers undergo background checks and safety training.'
    }
  ];

  return (
    <div className="p-4 pb-24">
      {/* Contact Cards */}
      <h3 className="text-gray-800 mb-3">Contact Support</h3>
      <div className="space-y-3 mb-6">
        <a
          href="tel:0800123456"
          className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 border border-gray-100 active:scale-95 transition-all"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E0F7FA' }}>
            <Phone className="w-6 h-6" style={{ color: '#2F6F9F' }} />
          </div>
          <div>
            <h4 className="text-gray-800">Call Us</h4>
            <p className="text-gray-600 text-sm">0800 123 456</p>
          </div>
        </a>

        <a
          href="mailto:support@wairoarides.nz"
          className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 border border-gray-100 active:scale-95 transition-all"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h4 className="text-gray-800">Email Us</h4>
            <p className="text-gray-600 text-sm">support@wairoarides.nz</p>
          </div>
        </a>

        <button className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 border border-gray-100 active:scale-95 transition-all w-full">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E0F7FA' }}>
            <MessageCircle className="w-6 h-6" style={{ color: '#2F6F9F' }} />
          </div>
          <div className="text-left">
            <h4 className="text-gray-800">Live Chat</h4>
            <p className="text-gray-600 text-sm">Chat with support</p>
          </div>
        </button>
      </div>

      {/* FAQs */}
      <h3 className="text-gray-800 mb-3">Frequently Asked</h3>
      <div className="space-y-2">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <button
              onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-start gap-3 flex-1">
                <HelpCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#2F6F9F' }} />
                <h4 className="text-gray-800 text-sm">{faq.question}</h4>
              </div>
              {openFaq === faq.id ? (
                <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            {openFaq === faq.id && (
              <div className="px-4 pb-4">
                <p className="text-gray-600 text-sm ml-8">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Emergency */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-6">
        <h4 className="text-gray-800 mb-2">Emergency</h4>
        <p className="text-gray-700 text-sm">
          In case of emergency, call <strong>111</strong>
        </p>
      </div>

      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="bg-gray-100 rounded-xl shadow-md p-4 flex items-center gap-4 border border-gray-100 active:scale-95 transition-all w-full mt-6"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
          <div className="text-left">
            <h4 className="text-gray-800">Back</h4>
          </div>
        </button>
      )}
    </div>
  );
}