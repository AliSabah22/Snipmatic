import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import VideoCarousel from '../components/3d/VideoCarousel';
import GlassmorphicPanels from '../components/3d/GlassmorphicPanels';
import AnimatedText from '../components/animations/AnimatedText';
import HoverPop from '../components/animations/HoverPop';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <HoverPop>
              <AnimatedText
                text="Snipmatic.AI"
                className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
              />
            </HoverPop>
          </div>
          <div className="flex items-center space-x-4">
            <HoverPop>
              <Link href="/login" className="text-gray-300 hover:text-white transition">
                Login
              </Link>
            </HoverPop>
            <HoverPop>
              <Link 
                href="/signup" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Sign Up
              </Link>
            </HoverPop>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center">
          <HoverPop>
            <AnimatedText
              text="Transform Your Videos into Viral Clips"
              className="text-5xl md:text-6xl font-bold mb-8"
              delay={200}
            />
          </HoverPop>
          <HoverPop>
            <AnimatedText
              text="Upload your long-form videos and let our AI create engaging short clips perfect for social media. Save time and boost your content's reach."
              className="text-xl text-gray-300 mb-12 max-w-2xl"
              delay={400}
            />
          </HoverPop>
          <div className="flex flex-col sm:flex-row gap-4">
            <HoverPop>
              <Link 
                href="/signup" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
              >
                Get Started Free
              </Link>
            </HoverPop>
            <HoverPop>
              <Link 
                href="#features" 
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
              >
                Learn More
              </Link>
            </HoverPop>
          </div>
        </div>
      </section>

      {/* 3D Video Carousel */}
      <section className="container mx-auto px-6 py-20">
        <VideoCarousel />
      </section>

      {/* Glassmorphic Stats */}
      <section className="container mx-auto px-6 py-20">
        <GlassmorphicPanels />
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <HoverPop>
          <AnimatedText
            text="Why Choose Snipmatic.AI?"
            className="text-3xl font-bold text-center mb-16"
            delay={600}
          />
        </HoverPop>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "AI-Powered Analysis",
              description: "Our advanced AI analyzes your content to identify the most engaging moments and create perfect clips.",
              bgColor: "bg-blue-600"
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              ),
              title: "Easy Export",
              description: "Export your clips in multiple formats and resolutions, ready to share on any social media platform.",
              bgColor: "bg-purple-600"
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Quality Control",
              description: "Review and fine-tune AI-generated clips before publishing to ensure they match your vision.",
              bgColor: "bg-green-600"
            }
          ].map((feature, index) => (
            <HoverPop key={index}>
              <div className="bg-gray-800 p-8 rounded-xl">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </HoverPop>
          ))}
        </div>

        {/* Advanced Features Section */}
        <div className="mt-20">
          <HoverPop>
            <AnimatedText
              text="Advanced Features"
              className="text-2xl font-bold text-center mb-12"
              delay={800}
            />
          </HoverPop>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                  </svg>
                ),
                title: "Virality Score Analysis",
                description: "Our AI analyzes multiple factors to predict the viral potential of each clip:",
                features: [
                  "Engagement prediction based on content patterns",
                  "Audience retention analysis",
                  "Social sharing potential",
                  "Trend alignment scoring"
                ],
                bgColor: "bg-yellow-500"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Performance Analytics",
                description: "Track and optimize your content with detailed metrics:",
                features: [
                  "View duration analysis",
                  "Engagement rate tracking",
                  "Audience retention graphs",
                  "Platform-specific insights"
                ],
                bgColor: "bg-indigo-500"
              }
            ].map((feature, index) => (
              <HoverPop key={index}>
                <div className="bg-gray-800 p-8 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                      <p className="text-gray-300 mb-4">{feature.description}</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        {feature.features.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </HoverPop>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <HoverPop>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <AnimatedText
              text="Ready to Transform Your Content?"
              className="text-3xl font-bold mb-6"
              delay={1000}
            />
            <AnimatedText
              text="Join thousands of content creators who are saving time and growing their audience with Snipmatic.AI."
              className="text-xl mb-8 max-w-2xl mx-auto"
              delay={1200}
            />
            <HoverPop>
              <Link 
                href="/signup" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition inline-block"
              >
                Start Creating Now
              </Link>
            </HoverPop>
          </div>
        </HoverPop>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <HoverPop>
              <AnimatedText
                text="Snipmatic.AI"
                className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                delay={1400}
              />
            </HoverPop>
          </div>
          <div className="flex space-x-6">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <HoverPop key={item}>
                <Link href={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition">
                  {item}
                </Link>
              </HoverPop>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    name: 'One-Click Processing',
    description:
      'Upload your video and let our AI analyze it for the most engaging moments. No manual editing required.',
  },
  {
    name: 'Smart Clip Selection',
    description:
      'Our AI identifies emotional peaks, high-retention segments, and hook-worthy moments to create viral-worthy clips.',
  },
  {
    name: 'Instant Export',
    description:
      'Download your clips in the perfect format for social media platforms. Ready to share in seconds.',
  },
]; 