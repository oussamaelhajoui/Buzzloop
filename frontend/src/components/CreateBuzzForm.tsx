"use client";
import React, { useState } from 'react';

const CreateBuzzForm = () => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/buzz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, author }), // Include author in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to create buzz');
      }

      setContent(''); 
      setAuthor('');
      window.location.reload();
    } catch (error) {
      console.error('Error creating buzz:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button type="submit" className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Buzz</button>
    </form>
  );
};

export default CreateBuzzForm;
