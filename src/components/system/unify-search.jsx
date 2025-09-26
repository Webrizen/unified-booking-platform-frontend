'use client';

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

export default function UnifySearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState('hotels');
    const [searchQuery, setSearchQuery] = useState('');

    // Initialize from URL params on component mount
    useEffect(() => {
        const tab = searchParams.get('tab') || 'hotels'                                                                                                                                                                                                          
        const query = searchParams.get('q') || ''
        
        setActiveTab(tab)
        setSearchQuery(query)
    }, [searchParams])

    const handleSearch = (e) => {
        e.preventDefault()
        updateURLParams()
    }

    const handleTabChange = (value) => {
        setActiveTab(value)
        updateURLParams(value)
    }

    const updateURLParams = (tab = activeTab) => {
        const params = new URLSearchParams()
        
        if (tab) params.set('tab', tab)
        if (searchQuery.trim()) params.set('q', searchQuery.trim())
        
        // Update URL without page reload
        router.push(`/search?${params.toString()}`, { scroll: false })
    }

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            updateURLParams()
        }
    }

    return (
        <div className='w-full h-min border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl'>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="hotels">Hotels</TabsTrigger>
                    <TabsTrigger value="gardens">Gardens</TabsTrigger>
                    <TabsTrigger value="parks">Water Parks</TabsTrigger>
                </TabsList>
                
                <div className="mb-6">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-0 bottom-0 my-auto h-4 w-4 text-zinc-500" />
                        <Input
                            type="text"
                            placeholder={`Search ${activeTab === 'hotels' ? 'hotels' : activeTab === 'gardens' ? 'gardens' : 'water parks'}...`}
                            value={searchQuery}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            className="pl-10 pr-20 py-6 text-lg rounded-xl"
                        />
                        <Button 
                            type="submit" 
                            className="absolute right-2 top-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Search
                        </Button>
                    </form>
                </div>

                <TabsContent value="hotels" className="mt-4">
                    {searchQuery ? (
                        <div className="text-center py-8">
                            <h3 className="text-xl font-semibold mb-2">Searching Hotels for: "{searchQuery}"</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">Results will be displayed here</p>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <h3 className="text-xl font-semibold mb-2">Search Hotels</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">Enter your search query above to find hotels</p>
                        </div>
                    )}
                </TabsContent>
                
                <TabsContent value="gardens" className="mt-4">
                    {searchQuery ? (
                        <div className="text-center py-8">
                            <h3 className="text-xl font-semibold mb-2">Searching Gardens for: "{searchQuery}"</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">Results will be displayed here</p>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <h3 className="text-xl font-semibold mb-2">Search Gardens</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">Enter your search query above to find gardens</p>
                        </div>
                    )}
                </TabsContent>
                
                <TabsContent value="parks" className="mt-4">
                    {searchQuery ? (
                        <div className="text-center py-8">
                            <h3 className="text-xl font-semibold mb-2">Searching Water Parks for: "{searchQuery}"</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">Results will be displayed here</p>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <h3 className="text-xl font-semibold mb-2">Search Water Parks</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">Enter your search query above to find water parks</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}