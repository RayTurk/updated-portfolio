import React, { useState } from "react";
import { Send, MapPin, Mail } from "lucide-react";
import useDocumentTitle from '../hooks/useDocumentTitle';
import SparklesText from "./ui/sparkles-text.jsx";
import SEO from './SEO';
import { generateBreadcrumbSchema } from '../utils/schema';
import { WEB3FORMS_API_KEY } from '../config';


// AnimatedGrid Component
const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
          <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] opacity-20">
            {[...Array(40)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="relative h-full w-full border-r border-blue-500/10"
                style={{
                  animation: `gridPulse ${2 + Math.random() * 2
                    }s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-[repeat(40,1fr)] opacity-20">
            {[...Array(40)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="relative w-full h-full border-b border-blue-500/10"
                style={{
                  animation: `gridPulse ${2 + Math.random() * 2
                    }s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Contact() {
  useDocumentTitle('Contact');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  // SEO setup
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://rturk.me/' },
    { name: 'Contact', url: 'https://rturk.me/contact' }
  ]);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("Please fill in all required fields correctly.");
      return;
    }

    setStatus("Sending message...");

    try {
      // Prepare form data for Web3Forms
      const formSubmission = {
        access_key: WEB3FORMS_API_KEY, // Access key from config
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        from_page: window.location.pathname
      };

      // Submit to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formSubmission)
      });

      const result = await response.json();

      if (result.success) {
        // Push form submission event to dataLayer for GTM
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'contact_form_submission',
          'formType': 'contact',
          'formData': {
            'name': formData.name,
            'email': formData.email,
            'subject': formData.subject
          }
        });

        setStatus("Message sent successfully!");

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        setErrors({});
      } else {
        setStatus("Sorry, something went wrong. Please try again later.");
        console.error("Form submission error:", result);
      }
    } catch (error) {
      setStatus("Sorry, something went wrong. Please try again later.");
      console.error("Form submission error:", error);
    }
  };

  return (
    <>
      <SEO
        title="Contact Me"
        description="Get in touch with Raymond Turk, Full-Stack Web Developer based in Cleveland, Ohio. Let's discuss your web development needs."
        keywords={['Contact', 'Web Developer', 'Cleveland', 'Hire Developer', 'Custom WordPress']}
        canonical="https://rturk.me/contact"
        schema={breadcrumbSchema}
      />
      <main
        className="pt-20 lg:pt-[0rem] bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white min-h-screen"
      >
        <section className="hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            {/* Animated Grid Background */}
            <AnimatedGrid />
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h1>
                    <SparklesText text="Get in Touch" colors={{ first: "#38bdf8", second: "#34d399" }} />
                  </h1>
                  <p className="text-gray-300 text-lg">
                    Have a question or want to work together? Drop me a message!
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-300">rturk.me@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500/10 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-gray-300">Cleveland, Ohio</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl shadow-xl">
                {/* This hidden input is needed for Netlify form detection */}
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.name ? "border-red-500" : "border-gray-700"} focus:border-blue-500 focus:outline-none transition-colors`}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.email ? "border-red-500" : "border-gray-700"} focus:border-blue-500 focus:outline-none transition-colors`}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.subject ? "border-red-500" : "border-gray-700"} focus:border-blue-500 focus:outline-none transition-colors`}
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        rows="4"
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.message ? "border-red-500" : "border-gray-700"} focus:border-blue-500 focus:outline-none transition-colors resize-none`}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      ></textarea>
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Status Message */}
                {status && (
                  <div
                    className={`mt-4 text-center ${status.includes("success")
                      ? "text-green-400"
                      : "text-red-400"
                      }`}
                  >
                    <p>{status}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}