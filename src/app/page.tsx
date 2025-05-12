import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import GlassmorphicPanels from '../components/3d/GlassmorphicPanels';
import AnimatedText from '../components/animations/AnimatedText';
import HoverPop from '../components/animations/HoverPop';
import ThemeToggle from '../components/ThemeToggle';

// Dynamically import VideoCarousel with no SSR and loading state
// const VideoCarousel = dynamic(() => import('../components/3d/VideoCarousel'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-[600px] w-full flex items-center justify-center bg-gray-900/50 rounded-xl">
//       <div className="text-center">
//         <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
//           Loading 3D Features...
//         </h2>
//         <p className="text-gray-300">Please wait while we prepare the interactive experience</p>
//       </div>
//     </div>
//   ),
// });

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-gradient-to-b dark:from-emerald-950 dark:via-pink-950 dark:to-emerald-950 text-gray-900 dark:text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 dark:backdrop-blur-sm dark:bg-black/20 bg-white fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 dark:border-none rounded-b-xl shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center">
            <HoverPop>
              <AnimatedText
                text="Snipmatic.AI"
                className="text-2xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-amber-100 dark:via-pink-300 dark:to-emerald-300 dark:bg-clip-text dark:text-transparent"
              />
            </HoverPop>
          </div>
          <div className="flex items-center space-x-8">
            <ThemeToggle />
            <HoverPop>
              <Link href="/login" className="text-emerald-700 dark:text-amber-100 hover:text-emerald-900 dark:hover:text-white transition-colors duration-300">
                Login
              </Link>
            </HoverPop>
            <HoverPop>
              <Link 
                href="/signup" 
                className="bg-gradient-to-r from-amber-200 to-pink-300 hover:from-amber-300 hover:to-pink-400 dark:from-amber-300 dark:to-pink-400 dark:hover:from-amber-400 dark:hover:to-pink-500 text-emerald-950 px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-pink-500/25 text-lg font-semibold"
              >
                Sign Up
              </Link>
            </HoverPop>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-40 pb-28">
        <div className="flex flex-col items-center text-center md:text-left max-w-4xl mx-auto">
          <div className="mb-14 w-full">
            <div className="bg-white dark:bg-black/20 dark:backdrop-blur-sm p-12 rounded-xl border border-neutral-200 dark:border-amber-500/30 shadow-md">
              <HoverPop>
                <AnimatedText
                  text="Transform Your Videos into Viral Clips"
                  className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-gray-900 dark:bg-gradient-to-r dark:from-amber-100 dark:via-pink-300 dark:to-emerald-300 dark:bg-clip-text dark:text-transparent"
                  delay={200}
                />
              </HoverPop>
              <HoverPop>
                <AnimatedText
                  text="Upload your long-form videos and let our AI create engaging short clips perfect for social media. Save time and boost your content's reach."
                  className="text-xl text-gray-700 dark:text-amber-100 mb-12 max-w-2xl mx-auto leading-relaxed"
                  delay={400}
                />
              </HoverPop>
              <div className="flex flex-col sm:flex-row gap-6 mt-8 justify-center md:justify-start">
                <HoverPop>
                  <Link 
                    href="/signup" 
                    className="bg-gradient-to-r from-amber-200 to-pink-300 hover:from-amber-300 hover:to-pink-400 text-emerald-950 px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-pink-500/25 min-w-[220px] text-center"
                  >
                    Get Started Free
                  </Link>
                </HoverPop>
                <HoverPop>
                  <Link 
                    href="#features" 
                    className="bg-neutral-200 dark:bg-black/20 dark:backdrop-blur-sm hover:bg-neutral-300 dark:hover:bg-black/30 text-emerald-900 dark:text-white px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 border border-neutral-200 dark:border-amber-500/30 min-w-[220px] text-center"
                  >
                    Learn More
                  </Link>
                </HoverPop>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Benefits */}
      <section className="container mx-auto px-6 py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl mx-auto">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Save Hours",
              description: "Cut editing time by up to 90% with AI-powered automation",
              gradient: "from-amber-100 to-amber-300"
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ),
              title: "Boost Engagement",
              description: "Increase views and shares with optimized content",
              gradient: "from-pink-200 to-pink-400"
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Professional Quality",
              description: "Get studio-quality results with minimal effort",
              gradient: "from-emerald-200 to-emerald-400"
            }
          ].map((benefit, index) => (
            <HoverPop key={index}>
              <div className="group relative h-[280px]">
                <div className="relative bg-white dark:bg-black/20 dark:backdrop-blur-sm p-10 rounded-xl border border-neutral-200 dark:border-amber-500/30 h-full flex flex-col transition-all duration-300 group-hover:shadow-lg shadow-md">
                  <div className={`text-transparent bg-gradient-to-r ${benefit.gradient} bg-clip-text mb-6`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:bg-gradient-to-r dark:from-amber-50 dark:to-pink-100 dark:bg-clip-text dark:text-transparent">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 dark:text-amber-100 flex-grow text-lg">{benefit.description}</p>
                </div>
              </div>
            </HoverPop>
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="container mx-auto px-6 py-28">
        <div className="bg-white dark:bg-black/20 dark:backdrop-blur-sm p-10 rounded-xl border border-neutral-200 dark:border-amber-500/30 shadow-md text-center max-w-4xl mx-auto">
          <p className="text-emerald-700 dark:text-amber-200 mb-10 text-xl font-semibold">Trusted by content creators worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-80">
            {['YouTube', 'TikTok', 'Instagram', 'LinkedIn'].map((platform) => (
              <HoverPop key={platform}>
                <div className="text-emerald-700 dark:text-amber-200 font-medium text-lg hover:text-emerald-900 dark:hover:text-white transition-colors duration-300">
                  {platform}
                </div>
              </HoverPop>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="bg-white dark:bg-black/20 dark:backdrop-blur-sm p-10 rounded-xl border border-neutral-200 dark:border-amber-500/30 shadow-md">
              <HoverPop>
                <AnimatedText
                  text="Why Choose Snipmatic.AI?"
                  className="text-4xl font-bold text-left md:text-center bg-gradient-to-r from-emerald-600 via-pink-600 to-emerald-600 dark:from-amber-100 dark:via-pink-300 dark:to-emerald-300 bg-clip-text text-transparent"
                  delay={600}
                />
              </HoverPop>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "AI-Powered Analysis",
                description: "Our advanced AI analyzes your content to identify the most engaging moments and create perfect clips.",
                gradient: "from-amber-100 to-amber-300"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                ),
                title: "Easy Export",
                description: "Export your clips in multiple formats and resolutions, ready to share on any social media platform.",
                gradient: "from-pink-200 to-pink-400"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Quality Control",
                description: "Review and fine-tune AI-generated clips before publishing to ensure they match your vision.",
                gradient: "from-emerald-200 to-emerald-400"
              }
            ].map((feature, index) => (
              <HoverPop key={index}>
                <div className="group relative h-[280px]">
                  <div className="relative bg-white dark:bg-black/20 dark:backdrop-blur-sm p-10 rounded-xl border border-neutral-200 dark:border-amber-500/30 h-full flex flex-col transition-all duration-300 group-hover:shadow-lg shadow-md">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-gradient-to-r ${feature.gradient}`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:bg-gradient-to-r dark:from-amber-50 dark:to-pink-100 dark:bg-clip-text dark:text-transparent">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 dark:text-amber-100 flex-grow text-lg">{feature.description}</p>
                  </div>
                </div>
              </HoverPop>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="container mx-auto px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="bg-white dark:bg-black/20 dark:backdrop-blur-sm p-10 rounded-xl border border-neutral-200 dark:border-amber-500/30 shadow-md">
              <HoverPop>
                <AnimatedText
                  text="Advanced Features"
                  className="text-4xl font-bold text-left md:text-center bg-gradient-to-r from-emerald-600 via-pink-600 to-emerald-600 dark:from-amber-100 dark:via-pink-300 dark:to-emerald-300 bg-clip-text text-transparent"
                  delay={800}
                />
              </HoverPop>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
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
                gradient: "from-amber-100 to-amber-300"
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
                gradient: "from-pink-200 to-pink-400"
              }
            ].map((feature, index) => (
              <HoverPop key={index}>
                <div className="group relative h-[280px]">
                  <div className="relative bg-white dark:bg-black/20 dark:backdrop-blur-sm p-10 rounded-xl border border-neutral-200 dark:border-amber-500/30 h-full transition-all duration-300 group-hover:shadow-lg shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r ${feature.gradient}`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold mb-3 text-gray-900 dark:bg-gradient-to-r dark:from-amber-50 dark:to-pink-100 dark:bg-clip-text dark:text-transparent">
                          {feature.title}
                        </h4>
                        <p className="text-gray-700 dark:text-amber-100 mb-4 text-lg">{feature.description}</p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-amber-100 space-y-2">
                          {feature.features && feature.features.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </HoverPop>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <HoverPop>
            <div className="relative bg-gradient-to-r from-amber-200 via-pink-300 to-emerald-300 dark:bg-gradient-to-r dark:from-amber-200 dark:via-pink-300 dark:to-emerald-300 rounded-2xl p-16 text-center overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-neutral-50 dark:bg-black/20 dark:backdrop-blur-sm rounded-2xl"></div>
              <div className="relative z-10">
                <AnimatedText
                  text="Ready to Transform Your Content?"
                  className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-pink-600 to-emerald-600 dark:from-amber-100 dark:via-pink-300 dark:to-emerald-300 bg-clip-text text-transparent"
                  delay={1000}
                />
                <AnimatedText
                  text="Join thousands of content creators who are saving time and growing their audience with Snipmatic.AI."
                  className="text-xl mb-8 max-w-2xl mx-auto text-emerald-700 dark:text-amber-100"
                  delay={1200}
                />
                <HoverPop>
                  <Link 
                    href="/signup" 
                    className="bg-emerald-700 dark:bg-amber-100 text-white dark:text-emerald-900 hover:bg-pink-500 dark:hover:bg-pink-300 px-12 py-5 rounded-full text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-pink-500/25 inline-block mt-4"
                  >
                    Start Creating Now
                  </Link>
                </HoverPop>
              </div>
            </div>
          </HoverPop>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-neutral-200 bg-neutral-50 dark:bg-black/20 dark:border-amber-500/30 mt-12 rounded-t-xl shadow-inner">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <HoverPop>
              <AnimatedText
                text="Snipmatic.AI"
                className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-pink-600 to-emerald-600 bg-clip-text text-transparent"
                delay={1400}
              />
            </HoverPop>
          </div>
          <div className="flex space-x-8">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <HoverPop key={item}>
                <Link 
                  href={`/${item.toLowerCase()}`} 
                  className="text-emerald-700 dark:text-amber-200 hover:text-emerald-900 dark:hover:text-white transition-colors duration-300"
                >
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