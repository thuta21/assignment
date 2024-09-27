import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Nav';
import axios from 'axios';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 9; // 9 books per page

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://example-data.draftbit.com/books');
        setBooks(response.data);
        setFilteredBooks(response.data); // Initially, show all books
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  // Handle Search
  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
    setPage(1); // Reset to first page after search
  }, [searchTerm, books]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBooks.length / limit);
  const paginatedBooks = filteredBooks.slice((page - 1) * limit, page * limit);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="flex flex-col items-center mt-16">
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a book..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-lg p-6">
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="rounded-lg w-full h-64 object-cover mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  <Link to={`/books/${book.id}`} className="hover:text-blue-500">
                    {book.title}
                  </Link>
                </h2>
                <p className="text-gray-600">
                  By: {book.authors}
                </p>
                <p className="text-yellow-500">
                  Rating: {book.rating}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className={`bg-blue-500 text-white px-4 py-2 rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className={`bg-blue-500 text-white px-4 py-2 rounded ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
