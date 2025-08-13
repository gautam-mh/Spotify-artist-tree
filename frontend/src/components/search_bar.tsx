import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/use_debounce'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type SearchBarProps = {
    onSearch: (query: string) => void
    isLoading?: boolean
}

export const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 300) // 300ms delay

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (debouncedQuery.trim()) {
            onSearch(debouncedQuery.trim())
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '42rem', margin: '0 auto' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for an artist..."
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 3rem',
                        fontSize: '1.125rem',
                        borderRadius: '9999px',
                        border: '1px solid #D1D5DB',
                        outline: 'none',
                        transition: 'all 0.2s',
                    }}
                    disabled={isLoading}
                />
                <MagnifyingGlassIcon 
                    style={{
                        position: 'absolute',
                        left: '1rem',
                        width: '1.25rem',
                        height: '1.25rem',
                        color: '#9CA3AF'
                    }}
                />
                <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    style={{
                        position: 'absolute',
                        right: '0.75rem',
                        padding: '0.375rem 1rem',
                        backgroundColor: isLoading || !query.trim() ? '#D1D5DB' : '#10B981',
                        color: 'white',
                        borderRadius: '9999px',
                        cursor: isLoading || !query.trim() ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>
        </form>
    )
}
