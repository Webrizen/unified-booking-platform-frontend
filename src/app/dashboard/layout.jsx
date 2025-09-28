import Sidebar from '@/components/system/sidebar'
import React from 'react'

export default function DashboardLayout({ children }) {
    return (
        <>
            <Sidebar children={children} />
        </>
    )
}
