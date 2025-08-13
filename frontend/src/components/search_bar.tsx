import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type SearchBarProps = {
    onSearch: (query: string) => void
    isLoading?: boolean
}

export const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
    const [query, setQuery] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            onSearch(query.trim())
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for an artist..."
                    className="w-full px-4 py-3 pl-12 text-lg rounded-full border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    disabled={isLoading}
                />
                <MagnifyingGlassIcon className="absolute left-4 w-5 h-5 text-gray-400" />
                <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="absolute right-3 px-4 py-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>
        </form>
    )
}
