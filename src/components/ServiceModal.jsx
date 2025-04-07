import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, CheckCircle, AlertCircle } from "lucide-react";

const ServiceModal = ({ isOpen, onClose, service }) => {
  // If no service is provided, don't render anything
  if (!service) return null;

  // Extract service details
  const { icon: Icon, title, description, features, timeframe, benefits, limitations } = service;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - closes modal when clicked */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl border border-blue-500/20 shadow-xl text-white p-6">

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-tr from-blue-500/20 to-cyan-500/20">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold">{title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-300 text-lg">{description}</p>
              </div>

              {/* Timeframe */}
              {timeframe && (
                <div className="flex items-center gap-2 text-yellow-300 mb-4">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Typical timeframe: {timeframe}</span>
                </div>
              )}

              {/* Features */}
              {features && features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">What's Included</h3>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {benefits && benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-green-400">Key Benefits</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-200">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Limitations or considerations */}
              {limitations && limitations.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-amber-400">Considerations</h3>
                  <ul className="space-y-3">
                    {limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-gray-200">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <div className="mt-8 flex justify-center">
                <a
                  href="/contact"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Get a Quote
                </a>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;