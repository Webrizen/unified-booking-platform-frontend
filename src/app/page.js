'use client'

import UnifySearch from '@/components/system/unify-search'
import Link from 'next/link'
import React, { Suspense, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import {
  Star,
  Heart,
  MapPin,
  Calendar,
  Users,
  Shield,
  Trophy,
  Sparkles,
  Palette,
  Droplets,
  Building,
  CheckCircle
} from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const heros = [
  {
    title: "Luxury Hotels",
    slug: "hotels",
    backgroundImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Discover premium accommodations with world-class amenities and exceptional service"
  },
  {
    title: "Marriage Gardens",
    slug: "gardens",
    backgroundImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    description: "Find the perfect venue for your special day with stunning decor and catering options"
  },
  {
    title: "Water Parks",
    slug: "parks",
    backgroundImage: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Experience thrilling adventures with family-friendly water attractions and facilities"
  }
];

export default function Page() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.activeIndex);
  };

  const features = [
    {
      icon: Building,
      title: "Luxury Hotels",
      description: "Discover premium accommodations with world-class amenities and exceptional service",
      count: "10,000+",
      color: "indigo"
    },
    {
      icon: Palette,
      title: "Marriage Gardens",
      description: "Find the perfect venue for your special day with stunning decor and catering options",
      count: "2,500+",
      color: "pink"
    },
    {
      icon: Droplets,
      title: "Water Parks",
      description: "Experience thrilling adventures with family-friendly water attractions and facilities",
      count: "800+",
      color: "cyan"
    }
  ];

  const stats = [
    { number: "500K+", label: "Happy Customers" },
    { number: "15K+", label: "Premium Venues" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Customer Support" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Wedding Planner",
      content: "This platform revolutionized how I book venues for my clients. Everything in one place!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Travel Blogger",
      content: "From luxury hotels to amazing water parks, the booking experience is seamless and reliable.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Event Manager",
      content: "The quality of marriage gardens available here is exceptional. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <>
      {/* Hero Section with Swiper */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image with Transition */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${heros[activeSlide].backgroundImage})`
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 w-full">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1000}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
            }}
            onSlideChange={handleSlideChange}
            className="w-full"
          >
            {heros.map((hero, index) => (
              <SwiperSlide key={index}>
                <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12 min-h-screen items-center py-20">
                  <div className="mx-auto text-center lg:text-left flex flex-col max-w-3xl justify-center lg:justify-start lg:pb-8 flex-1 lg:w-1/2 lg:max-w-none">
                    <h1 className="text-white text-4xl/snug sm:text-6xl/tight lg:text-5xl/tight xl:text-6xl/tight font-semibold">
                      Your World of {hero.title}. <span className="bg-gradient-to-r from-indigo-400 to-indigo-200 bg-clip-text text-transparent">Seamlessly.</span>
                    </h1>

                    <p className="mt-6 text-zinc-200 text-lg lg:text-xl max-w-2xl lg:max-w-none mx-auto leading-relaxed">
                      {hero.description}
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start flex-wrap">
                      <Link href="/auth/sign-up" className="relative px-8 py-4 before:absolute before:inset-0 before:rounded-xl before:transition-all active:before:bg-indigo-700 text-white hover:before:bg-indigo-800 before:bg-indigo-600 hover:before:scale-105 duration-200 group">
                        <span className="relative flex items-center justify-center gap-2 font-semibold">
                          Get Started Free
                        </span>
                      </Link>

                      <Link href="/search" className="relative px-8 py-4 before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-zinc-300 before:transition-all text-white hover:before:scale-105 duration-200 group">
                        <span className="relative flex items-center justify-center gap-2 font-semibold">
                          Explore Services
                        </span>
                      </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-zinc-300">
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        <span>Secure Booking</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Best Price Guarantee</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 lg:w-1/2 relative max-w-3xl mx-auto lg:max-w-none md:h-[600px] overflow-y-auto">
                    <Suspense fallback={<div className="text-white">Loading...</div>}>
                      <UnifySearch title={hero.slug} />
                    </Suspense>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-50 to-indigo-50 dark:from-zinc-900 dark:to-indigo-900/20">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight font-bold text-zinc-900 dark:text-white">
              Everything You Need in <span className="text-transparent bg-gradient-to-r from-indigo-600 to-indigo-600 bg-clip-text">One Place</span>
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-lg">
              Three unique services, one seamless experience. Discover the perfect venue for every occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <div key={index} className="group relative bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7`} />
                </div>

                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  {feature.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {feature.count}
                  </span>
                  <span className="text-sm text-zinc-500">Venues</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-6 bg-white dark:bg-zinc-900">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-600 dark:text-indigo-400">
                  {stat.number}
                </div>
                <div className="text-zinc-600 dark:text-zinc-300 mt-2 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-800">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight font-bold text-zinc-900 dark:text-white">
              Loved by <span className="text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text">Thousands</span>
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-lg">
              See what our customers are saying about their experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-zinc-700 dark:text-zinc-300 italic mb-6">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 text-center">
          <h2 className="text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight font-bold text-white mb-6">
            Ready to Create Unforgettable Memories?
          </h2>

          <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who have transformed their events and stays with our platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-zinc-100 transition-colors duration-200 inline-flex items-center justify-center gap-2">
              Start Your Journey
            </Link>

            <Link href="/search" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-200">
              Browse All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}