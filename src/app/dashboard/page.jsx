import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, IndianRupee, ArrowRight, Building, Palette, Droplets, Star, Clock, TrendingUp } from 'lucide-react'

export default function page() {
  // Mock data - replace with actual API data
  const upcomingBookings = [
    {
      id: 1,
      type: 'hotel',
      name: 'Grand Plaza Hotel',
      date: '2024-12-15',
      status: 'confirmed',
      price: 340,
      guests: 2,
      nights: 3
    },
    {
      id: 2,
      type: 'garden',
      name: 'Royal Marriage Garden',
      date: '2024-12-20',
      status: 'confirmed',
      price: 450,
      guests: 150,
      event: 'Wedding'
    },
    {
      id: 3,
      type: 'park',
      name: 'Splash Water Park',
      date: '2024-12-10',
      status: 'pending',
      price: 670,
      guests: 4,
      type: 'Day Pass'
    }
  ]

  const stats = {
    totalBookings: 12,
    upcomingTrips: 3,
    totalSpent: 8450,
    favoriteService: 'Hotels'
  }

  const recentActivity = [
    { action: 'Booking confirmed', service: 'Hotel', time: '2 hours ago', type: 'success' },
    { action: 'Payment processed', service: 'Water Park', time: '1 day ago', type: 'success' },
    { action: 'Booking requested', service: 'Garden', time: '2 days ago', type: 'pending' }
  ]

  const getServiceIcon = (type) => {
    switch (type) {
      case 'hotel': return <Building className="w-4 h-4" />
      case 'garden': return <Palette className="w-4 h-4" />
      case 'park': return <Droplets className="w-4 h-4" />
      default: return <Building className="w-4 h-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <section className="w-full h-full p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Here's your booking overview</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          New Booking
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">All-time bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
            <Calendar className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingTrips}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Next 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <IndianRupee className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalSpent}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Lifetime value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorite</CardTitle>
            <Star className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favoriteService}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Most booked service</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Bookings
            </CardTitle>
            <CardDescription>Your next adventures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    {getServiceIcon(booking.type)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {booking.name}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(booking.date).toLocaleDateString()}
                      {booking.guests && (
                        <>
                          <Users className="w-3 h-3 ml-2" />
                          {booking.guests} {booking.type === 'garden' ? 'guests' : 'people'}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  <div className="font-bold text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {booking.price}
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Bookings
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates on your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-2">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' : 
                  activity.type === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.service} • {activity.time}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Quick Actions */}
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Book Hotel
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Find Garden
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  Water Park
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Wishlist
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - Service Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Your Service Usage</CardTitle>
          <CardDescription>Distribution across different booking types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="font-semibold">Hotels</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">bookings</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                <Palette className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <div className="font-semibold">Gardens</div>
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">events</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                <Droplets className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <div className="font-semibold">Water Parks</div>
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">1</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">visits</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}