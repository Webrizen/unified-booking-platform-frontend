"use client"
import Link from 'next/link'
import { useState } from 'react'
import { LogIn, Menu, X } from 'lucide-react'; 

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Gardens', href: '/gardens' },
    { name: 'Parks', href: '/parks' }
];

export default function Navbar() {
    const [navIsOpened, setNavIsOpened] = useState(false)
    const closeNavbar = () => {
        setNavIsOpened(false)
    }
    const toggleNavbar = () => {
        setNavIsOpened(navIsOpened => !navIsOpened)
    }
    return (
        <>
            <div
                aria-hidden={true}
                onClick={closeNavbar}
                className={`fixed bg-zinc-800/40 inset-0 z-30 transition-opacity duration-300 ${navIsOpened ? "opacity-100 lg:hidden" : "opacity-0 invisible lg:hidden"}`}
            />
            
            <header className="sticky top-0 w-full flex items-center h-20 border-b border-b-zinc-200 dark:border-b-zinc-800 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm">
                <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
                    
                    {/* Brand Logo/Name: "UnifyBook" */}
                    <div className="flex items-center min-w-max">
                        <Link href="/" className="relative flex items-center gap-2.5 group">
                            <span aria-hidden={true} className="flex transition-transform duration-500 group-hover:rotate-[15deg]">
                                {/* Unique, minimal logo icon using Tailwind shapes */}
                                <span className="w-3 h-6 rounded-l-full flex bg-indigo-500 transition-colors duration-300 group-hover:bg-indigo-400" />
                                <span className="w-3 h-6 rounded-r-full flex bg-blue-600 mt-2 transition-colors duration-300 group-hover:bg-blue-500" />
                            </span>
                            <span className="inline-flex text-xl font-extrabold text-zinc-950 dark:text-white transition-colors duration-300 group-hover:text-indigo-600">
                                UnifyBook
                            </span>
                        </Link>
                    </div>
                    
                    {/* Navigation Menu (Desktop & Mobile) */}
                    <div className={`
                        absolute top-full left-0 bg-white dark:bg-zinc-950 lg:bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:w-max lg:flex duration-300 ease-in-out gap-x-6
                        ${navIsOpened ? "visible opacity-100 translate-y-0" : "translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100"}
                    `}>
                        <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-zinc-700 dark:text-zinc-300 lg:w-full lg:justify-center">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href} 
                                        onClick={closeNavbar}
                                        className="relative py-2.5 text-sm font-medium duration-300 ease-linear hover:text-indigo-600 dark:hover:text-indigo-400 
                                        after:absolute after:w-full after:left-0 after:bottom-0 after:h-0.5 after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-indigo-600 dark:after:bg-indigo-400"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Auth Button for Mobile/Tablet */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:min-w-max mt-10 lg:mt-0">
                            <Link 
                                href="/auth/sign-in" 
                                onClick={closeNavbar}
                                className="relative flex justify-center items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300
                                bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-700 hover:shadow-indigo-600/50"
                            >
                                <span className="relative text-sm">Sign In</span>
                            </Link>
                        </div>
                    </div>
                    
                    {/* Mobile Menu Toggle Button */}
                    <div className="flex items-center lg:hidden">
                        <button 
                            onClick={toggleNavbar} 
                            aria-label='Toggle menu' 
                            className="outline-none border-l border-l-zinc-200 dark:border-l-zinc-800 pl-3 relative p-2 rounded-lg transition-colors duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            {navIsOpened ? (
                                <X className="w-6 h-6 text-zinc-800 dark:text-zinc-300 transition-transform duration-300" />
                            ) : (
                                <Menu className="w-6 h-6 text-zinc-800 dark:text-zinc-300 transition-transform duration-300" />
                            )}
                        </button>
                    </div>
                </nav>
            </header>
        </>
    )
}