"use client";

import React from 'react';

export default function TopPosts() {
  const posts = [
    {
      title: 'Enjoy the Rain!',
      date: 'May 09, 12:22',
      description: 'Even the desert can’t resist a good shower! NYUAD’s rainy day aesthetics.',
      imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
    },
    {
      title: 'Study Away at NYUAD',
      date: 'Apr 16, 18:15',
      description: 'We are studying away at NYU Abu Dhabi. Our professors are amazing!',
      imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
    },
    {
      title: 'NYU Abu Dhabi Welcomes Students',
      date: 'Jan 23, 12:10',
      description: '142 visiting students from @nyuniversity explore Abu Dhabi’s vibrant culture.',
      imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Top Posts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition duration-200">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h4 className="text-sm font-bold">{post.title}</h4>
            <p className="text-xs text-gray-500 mb-2">{post.date}</p>
            <p className="text-sm text-gray-700">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}