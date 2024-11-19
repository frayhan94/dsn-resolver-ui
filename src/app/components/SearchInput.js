'use client';

export default function SearchInput({ value, onChange }) {
    return (
        <input
            type="text"
            placeholder="Search by domain..."
            className="border border-gray-300 p-2 mb-4 rounded w-full text-black"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
