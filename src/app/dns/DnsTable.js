'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchInput from '../components/SearchInput';

export default function DnsTable() {
    const [dnsResults, setDnsResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    // Fetch DNS results from the API
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dns-results`)  // Adjust to your backend URL
            .then(response => setDnsResults(response.data))
            .catch(error => console.error("Error fetching DNS results:", error));
    }, []);

    // Filter results based on search query
    useEffect(() => {
        setFilteredResults(
            dnsResults.filter(result =>
                result.domain.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, dnsResults]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">DNS Results</h1>

            <SearchInput value={searchQuery} onChange={setSearchQuery} />

            <table className="min-w-full border border-gray-300">
                <thead>
                <tr>
                    <th className="border p-2">Domain</th>
                    <th className="border p-2">SPF</th>
                    <th className="border p-2">DKIM</th>
                    <th className="border p-2">DMARC</th>
                    <th className="border p-2">Checked At</th>
                </tr>
                </thead>
                <tbody>
                {filteredResults.map(result => (
                    <tr key={result.id}>
                        <td className="border p-2">{result.domain}</td>
                        <td className="border p-2">{result.spf}</td>
                        <td className="border p-2">{result.dkim}</td>
                        <td className="border p-2">{result.dmarc}</td>
                        <td className="border p-2">{new Date(result.checkedAt).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
