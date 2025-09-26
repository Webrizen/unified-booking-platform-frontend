'use client';

import { useSearchParams } from 'next/navigation'
import UnifySearch from '@/components/system/unify-search';

export default function SearchPage() {
    const searchParams = useSearchParams()
    
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Search</h1>
                <UnifySearch searchQ={searchParams} />
            </div>
        </div>
    )
}