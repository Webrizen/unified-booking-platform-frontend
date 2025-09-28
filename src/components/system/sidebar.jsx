"use client"
import Link from 'next/link'
import { useState } from 'react'

const navItems = [
    {
        id: 1,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
        link: "/dashboard",
        text: "Overview",
        isActive: true,
    },
    {
        id: 2,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
        link: "/dashboard/bookings",
        text: "All Bookings",
        isActive: false,
    },
    {
        id: 3,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
        link: "/dashboard/hotels",
        text: "Hotels",
        isActive: false,
    },
    {
        id: 4,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        link: "/dashboard/gardens",
        text: "Wedding Gardens",
        isActive: false,
    },
    {
        id: 5,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>,
        link: "/dashboard/water-parks",
        text: "Water Parks",
        isActive: false,
    },
    {
        id: 6,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
        link: "/dashboard/wishlist",
        text: "Wishlist",
        isActive: false,
    },
    {
        id: 7,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
        link: "/dashboard/invoices",
        text: "Invoices & Receipts",
        isActive: false,
    },
    {
        id: 8,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>,
        link: "/dashboard/settings",
        text: "Settings",
        isActive: false,
    }
]

const Sidebar = ({ children }) => {
    const [sidebarToggled, setSidebarToggled] = useState(false)
    const [sidebarResized, setSidebarResized] = useState(false)
    
    const toggleSidebar = () => {
        setSidebarToggled(sidebarToggled => !sidebarToggled)
    }
    
    const resizeSidebar = () => {
        setSidebarResized(sidebarResized => !sidebarResized)
    }
    
    return (
        <main className='w-full grid md:grid-cols-[.1fr_1fr] grid-cols-1'>
            <aside className={`
                fixed h-[100dvh] overflow-hidden lg:static w-11/12 max-w-[18rem] rounded-br-4xl md:w-72 transition-all bg-white dark:bg-zinc-950 flex flex-col justify-between px-4 lg:transition-[width] ease-linear z-50
                ${sidebarToggled ? "" : "-translate-x-full lg:-translate-x-0"}
                ${sidebarResized ? "lg:w-20" : ""}
            `}>
                {/* Navigation */}
                <nav className="h-full py-6 flex-1 overflow-y-auto">
                    <ul className="text-zinc-700 dark:text-zinc-300 space-y-1">
                        {navItems.map(navItem => (
                            <li key={navItem.id}>
                                <Link href={navItem.link} className={`
                                    flex items-center gap-x-4 px-3 py-3 rounded-lg transition-all duration-200
                                    ${navItem.isActive 
                                        ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50 shadow-sm" 
                                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white"
                                    }
                                `}>
                                    <span className="min-w-max inline-flex">
                                        {navItem.icon}
                                    </span>
                                    <span className={`
                                        inline-flex ease-linear transition-all duration-300 font-medium
                                        ${sidebarResized ? "lg:opacity-0 lg:invisible" : "opacity-100 visible"}
                                    `}>
                                        {navItem.text}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="py-4 border-t border-zinc-200 dark:border-zinc-800">
                    <div className={`flex items-center justify-between ${sidebarResized ? "lg:justify-center" : ""}`}>
                        <div className={`flex items-center gap-3 transition-all duration-300 ${sidebarResized ? "lg:opacity-0 lg:invisible" : "opacity-100 visible"}`}>
                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                U
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-900 dark:text-white">User Account</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Premium Member</p>
                            </div>
                        </div>
                        
                        {/* Resize Button */}
                        <button onClick={resizeSidebar} className={`
                            outline-none bg-zinc-100 dark:bg-zinc-900 rounded-lg text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 ease-linear transition-all duration-200 w-8 h-8 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800
                            ${sidebarResized ? "rotate-180" : ""}
                        `}>
                            <span className="sr-only">toggle sidebar</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Toggle Button */}
            <div className='w-full h-full overflow-y-auto'>
                <div className="flex lg:hidden fixed right-4 top-4 z-40">
                    <button onClick={toggleSidebar} className="p-3 rounded-xl bg-indigo-600 dark:bg-indigo-500 outline-none w-12 aspect-square flex flex-col relative justify-center items-center shadow-lg">
                        <span className="sr-only">
                            toggle sidebar
                        </span>
                        <span className={`
                            w-6 h-0.5 rounded-full bg-white transition-transform duration-300 ease-linear
                            ${sidebarToggled ? "rotate-[40deg] translate-y-1.5" : ""}
                        `} />
                        <span className={`
                            w-6 origin-center mt-1 h-0.5 rounded-full bg-white transition-all duration-300 ease-linear
                            ${sidebarToggled ? "opacity-0 scale-x-0" : ""}
                        `} />
                        <span className={`
                            w-6 mt-1 h-0.5 rounded-full bg-white transition-all duration-300 ease-linear
                            ${sidebarToggled ? "-rotate-[40deg] -translate-y-1.5" : ""}
                        `} />
                    </button>
                </div>
                {children}
            </div>
        </main>
    )
}

export default Sidebar