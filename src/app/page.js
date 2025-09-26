import UnifySearch from '@/components/system/unify-search'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <>
      <section className="relative pt-10 xl:pt-14">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12">
          <div className="mx-auto text-center lg:text-left flex flex-col max-w-3xl justify-center lg:justify-start lg:py-8 flex-1 lg:w-1/2 lg:max-w-none">
            <h1 className="text-indigo-950 dark:text-white text-4xl/snug sm:text-6xl/tight lg:text-5xl/tight xl:text-6xl/tight font-semibold text">
             Your World of Stays and Celebrations. Seamlessly.
            </h1>
            <p className="mt-10 text-gray-700 dark:text-gray-300 lg:text-lg max-w-2xl lg:max-w-none mx-auto">
             We united the best Hotels, premier Marriage Gardens, and thrilling Water Parks into one stunning experience.
            </p>
            <div className="mt-10 flex gap-4 justify-center lg:justify-start flex-wrap">
              <Link href="/auth/sign-up" className="relative px-6 py-3 before:absolute before:inset-0 before:rounded-lg before:transition active:before:bg-indigo-700 text-white hover:before:bg-indigo-800 before:bg-indigo-600 hover:before:scale-105">
                <span className="relative">
                  Get Started
                </span>
              </Link>
              <Link href="/services" className="relative px-6 py-3 before:absolute before:inset-0 before:rounded-lg before:transition before:bg-gray-100 dark:before:bg-gray-900 text-indigo-600 dark:text-white hover:before:scale-105">
                <span className="relative">
                  Start Exploring Services
                </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-1 lg:w-1/2 relative max-w-3xl mx-auto lg:max-w-none">
           <UnifySearch />
          </div>
        </div>
      </section>
    </>
  )
}
