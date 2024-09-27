import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../Nav';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://example-data.draftbit.com/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navigation />
      <div className="flex flex-col items-center mt-16">
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white p-8 rounded-3xl shadow-lg">
          <img
            src={book.image_url}
            alt={book.title}
            className="rounded-lg w-full h-80 object-cover mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">By: {book.authors}</p>
          <p className="text-yellow-500 mb-4">Rating: {book.rating}</p>
          <p className="text-lg text-gray-700 mb-6">{book.description}</p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quotes:</h2>
          <p className="text-gray-600 italic mb-2">"{book.Quote1}"</p>
          <p className="text-gray-600 italic mb-2">"{book.Quote2}"</p>
          <p className="text-gray-600 italic mb-4">"{book.Quote3}"</p>

          <Link to="/books">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Back to Books
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
