'use client';

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search, Star, MapPin, Calendar, Users, Building, Palette, Droplets, Loader2, Filter, X, IndianRupee } from 'lucide-react'

export default function UnifySearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState('hotels');
    const [searchQuery, setSearchQuery] = useState('');
    const [resources, setResources] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    
    // Filter states
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortBy, setSortBy] = useState('name');
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    // Map resource types to tab values
    const resourceTypeMap = {
        'room': 'hotels',
        'marriageGarden': 'gardens',
        'waterPark': 'parks'
    };

    // Amenities by category
    const amenities = {
        hotels: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Parking', 'Air Conditioning'],
        gardens: ['Outdoor Space', 'Catering', 'Decoration', 'Parking', 'Sound System', 'Lighting'],
        parks: ['Water Slides', 'Wave Pool', 'Locker Rooms', 'Food Court', 'Kids Area', 'Safety Equipment']
    };

    // Fetch resources from API
    const fetchResources = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/public/resources`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('API Response:', data);
            setResources(data);
            
            // Set initial price range based on data
            if (data.length > 0) {
                const prices = data.map(r => parseInt(r.price) || 0);
                const maxPrice = Math.max(...prices);
                setPriceRange([0, Math.max(maxPrice, 1000)]);
            }
        } catch (err) {
            console.error('Error fetching resources:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Initialize from URL params on component mount and fetch resources
    useEffect(() => {
        const tab = searchParams.get('tab') || 'hotels';
        const query = searchParams.get('q') || '';
        
        setActiveTab(tab);
        setSearchQuery(query);
        
        fetchResources();
    }, [searchParams]);

    // Filter and sort resources
    const filteredResources = resources ? resources
        .filter(resource => {
            const matchesTab = resourceTypeMap[resource.resourceType] === activeTab;
            const matchesSearch = searchQuery.trim() === '' || 
                resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                resource.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = parseInt(resource.price) >= priceRange[0] && parseInt(resource.price) <= priceRange[1];
            
            return matchesTab && matchesSearch && matchesPrice;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return (parseInt(a.price) || 0) - (parseInt(b.price) || 0);
                case 'price-high':
                    return (parseInt(b.price) || 0) - (parseInt(a.price) || 0);
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        }) : [];

    const handleSearch = (e) => {
        e.preventDefault();
        updateURLParams();
    }

    const handleTabChange = (value) => {
        setActiveTab(value);
        setSelectedAmenities([]);
        updateURLParams(value);
    }

    const updateURLParams = (tab = activeTab) => {
        const params = new URLSearchParams();
        
        if (tab) params.set('tab', tab);
        if (searchQuery.trim()) params.set('q', searchQuery.trim());
        
        router.push(`/search?${params.toString()}`, { scroll: false });
    }

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateURLParams();
        }
    }

    const handleRetry = () => {
        fetchResources();
    }

    const handleAmenityChange = (amenity) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    }

    const clearFilters = () => {
        setPriceRange([0, 1000]);
        setSortBy('name');
        setSelectedAmenities([]);
    }

    // Get icon and color for resource type
    const getResourceConfig = (resourceType) => {
        switch (resourceType) {
            case 'room':
                return { icon: Building, color: 'blue', label: 'Hotel Room' };
            case 'marriageGarden':
                return { icon: Palette, color: 'pink', label: 'Marriage Garden' };
            case 'waterPark':
                return { icon: Droplets, color: 'cyan', label: 'Water Park' };
            default:
                return { icon: Building, color: 'gray', label: 'Resource' };
        }
    };

    // Format price
    const formatPrice = (price) => {
        return `₹${price}/night`;
    };

    const handleCheckout = (resourceId) => {
        router.push(`/checkout?id=${resourceId}`);
    }

    return (
        <div className='w-full h-min border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm'>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="hotels" className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Hotels
                    </TabsTrigger>
                    <TabsTrigger value="gardens" className="flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Gardens
                    </TabsTrigger>
                    <TabsTrigger value="parks" className="flex items-center gap-2">
                        <Droplets className="w-4 h-4" />
                        Water Parks
                    </TabsTrigger>
                </TabsList>
                
                {/* Search Bar and Filters */}
                <div className="mb-6 space-y-4">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-0 bottom-0 my-auto h-4 w-4 text-zinc-500" />
                        <Input
                            type="text"
                            placeholder={`Search ${activeTab === 'hotels' ? 'hotels' : activeTab === 'gardens' ? 'gardens' : 'water parks'}...`}
                            value={searchQuery}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            className="pl-10 pr-32 py-6 text-lg rounded-xl border-zinc-300 dark:border-zinc-700"
                        />
                        <Button 
                            type="submit" 
                            className="absolute right-2 top-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Search
                        </Button>
                    </form>

                    {/* Filter Controls */}
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                            {selectedAmenities.length > 0 && (
                                <Badge variant="secondary" className="ml-1 bg-indigo-100 text-indigo-700">
                                    {selectedAmenities.length}
                                </Badge>
                            )}
                        </Button>

                        <div className="flex items-center gap-2">
                            <Label htmlFor="sort" className="text-sm text-zinc-600 dark:text-zinc-400">
                                Sort by:
                            </Label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-1 text-sm"
                            >
                                <option value="name">Name</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Expandable Filters */}
                    {showFilters && (
                        <Card className="p-4 border-zinc-200 dark:border-zinc-700">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white">Filters</h4>
                                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-600 hover:text-red-700">
                                    <X className="w-4 h-4 mr-1" />
                                    Clear All
                                </Button>
                            </div>

                            {/* Price Range Filter */}
                            <div className="space-y-3 mb-4">
                                <Label className="text-sm font-medium">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</Label>
                                <Slider
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                    max={priceRange[1] > 1000 ? priceRange[1] : 1000}
                                    step={10}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-zinc-500">
                                    <span>₹0</span>
                                    <span>₹{priceRange[1] > 1000 ? priceRange[1] : 1000}</span>
                                </div>
                            </div>

                            {/* Amenities Filter */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Amenities</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {amenities[activeTab]?.map((amenity) => (
                                        <div key={amenity} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={amenity}
                                                checked={selectedAmenities.includes(amenity)}
                                                onCheckedChange={() => handleAmenityChange(amenity)}
                                            />
                                            <Label htmlFor={amenity} className="text-sm font-normal">
                                                {amenity}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    )}
                </div>

                {/* API Status Display */}
                <div className="mb-4">
                    {loading && (
                        <div className="text-center py-2 text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading resources...
                        </div>
                    )}
                    {error && (
                        <div className="text-center py-2 text-red-600 dark:text-red-400">
                            Error: {error}
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={handleRetry}
                                className="ml-2"
                            >
                                Retry
                            </Button>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                {filteredResources.length > 0 && (
                    <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                        Showing {filteredResources.length} of {resources?.filter(r => resourceTypeMap[r.resourceType] === activeTab).length} results
                    </div>
                )}

                {/* Hotels Tab Content */}
                <TabsContent value="hotels" className="mt-4 space-y-4">
                    {searchQuery && filteredResources.length === 0 ? (
                        <div className="text-center py-12">
                            <Building className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                No hotels found for "{searchQuery}"
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">Try adjusting your search terms or filters</p>
                        </div>
                    ) : filteredResources.length > 0 ? (
                        <div className="grid gap-4">
                            {filteredResources.map((resource) => {
                                const { icon: Icon, color, label } = getResourceConfig(resource.resourceType);
                                return (
                                    <Card key={resource._id} className="hover:shadow-lg transition-shadow duration-200 border-zinc-200 dark:border-zinc-700">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/30`}>
                                                        <Icon className={`w-4 h-4 text-${color}-600 dark:text-${color}-400`} />
                                                    </div>
                                                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {resource.name}
                                                    </CardTitle>
                                                </div>
                                                <Badge variant="outline" className={`border-${color}-200 text-${color}-700 dark:border-${color}-800 dark:text-${color}-300`}>
                                                    {label}
                                                </Badge>
                                            </div>
                                            <CardDescription className="text-zinc-600 dark:text-zinc-400">
                                                {resource.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>Premium Location</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        <span>4.8</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                                                        <IndianRupee className="w-5 h-5" />
                                                        {resource.price}
                                                        <span className="text-sm font-normal text-zinc-500">/night</span>
                                                    </div>
                                                    <Button 
                                                        size="sm" 
                                                        className="mt-2 bg-indigo-600 hover:bg-indigo-700"
                                                        onClick={() => handleCheckout(resource._id)}
                                                    >
                                                        Book Now
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Building className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                Search Hotels
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">Enter your search query above to find amazing hotels</p>
                        </div>
                    )}
                </TabsContent>

                {/* Gardens Tab Content */}
                <TabsContent value="gardens" className="mt-4 space-y-4">
                    {searchQuery && filteredResources.length === 0 ? (
                        <div className="text-center py-12">
                            <Palette className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                No gardens found for "{searchQuery}"
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">Try adjusting your search terms or filters</p>
                        </div>
                    ) : filteredResources.length > 0 ? (
                        <div className="grid gap-4">
                            {filteredResources.map((resource) => {
                                const { icon: Icon, color, label } = getResourceConfig(resource.resourceType);
                                return (
                                    <Card key={resource._id} className="hover:shadow-lg transition-shadow duration-200 border-zinc-200 dark:border-zinc-700">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/30`}>
                                                        <Icon className={`w-4 h-4 text-${color}-600 dark:text-${color}-400`} />
                                                    </div>
                                                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {resource.name}
                                                    </CardTitle>
                                                </div>
                                                <Badge variant="outline" className={`border-${color}-200 text-${color}-700 dark:border-${color}-800 dark:text-${color}-300`}>
                                                    {label}
                                                </Badge>
                                            </div>
                                            <CardDescription className="text-zinc-600 dark:text-zinc-400">
                                                {resource.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        <span>Up to 500 guests</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>Available</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1">
                                                        <IndianRupee className="w-5 h-5" />
                                                        {resource.price}
                                                        <span className="text-sm font-normal text-zinc-500">/event</span>
                                                    </div>
                                                    <Button 
                                                        size="sm" 
                                                        className="mt-2 bg-pink-600 hover:bg-pink-700"
                                                        onClick={() => handleCheckout(resource._id)}
                                                    >
                                                        Book Venue
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Palette className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                Search Gardens
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">Enter your search query above to find beautiful marriage gardens</p>
                        </div>
                    )}
                </TabsContent>

                {/* Water Parks Tab Content */}
                <TabsContent value="parks" className="mt-4 space-y-4">
                    {searchQuery && filteredResources.length === 0 ? (
                        <div className="text-center py-12">
                            <Droplets className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                No water parks found for "{searchQuery}"
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">Try adjusting your search terms or filters</p>
                        </div>
                    ) : filteredResources.length > 0 ? (
                        <div className="grid gap-4">
                            {filteredResources.map((resource) => {
                                const { icon: Icon, color, label } = getResourceConfig(resource.resourceType);
                                return (
                                    <Card key={resource._id} className="hover:shadow-lg transition-shadow duration-200 border-zinc-200 dark:border-zinc-700">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/30`}>
                                                        <Icon className={`w-4 h-4 text-${color}-600 dark:text-${color}-400`} />
                                                    </div>
                                                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {resource.name}
                                                    </CardTitle>
                                                </div>
                                                <Badge variant="outline" className={`border-${color}-200 text-${color}-700 dark:border-${color}-800 dark:text-${color}-300`}>
                                                    {label}
                                                </Badge>
                                            </div>
                                            <CardDescription className="text-zinc-600 dark:text-zinc-400">
                                                {resource.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        <span>Family Friendly</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        <span>4.9</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                                                        <IndianRupee className="w-5 h-5" />
                                                        {resource.price}
                                                        <span className="text-sm font-normal text-zinc-500">/person</span>
                                                    </div>
                                                    <Button 
                                                        size="sm" 
                                                        className="mt-2 bg-cyan-600 hover:bg-cyan-700"
                                                        onClick={() => handleCheckout(resource._id)}
                                                    >
                                                        Get Tickets
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Droplets className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                Search Water Parks
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">Enter your search query above to find thrilling water parks</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}