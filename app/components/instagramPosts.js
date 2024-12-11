// "use client";

// import React, { useEffect, useState } from "react";
// import * as math from "mathjs"; // Install mathjs using npm for correlation calculations
// import LoadingSpinner from "./loader";

// export default function InstagramPostTable() {
//   const [posts, setPosts] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           "http://localhost:3000/api/dashboard/instagramPosts"
//         ); // Fetch posts from API
//         const data = await response.json();

//         // Process data to include required attributes
//         const processedData = data.map((post) => ({
//           likes: post.like_count,
//           comments: post.comments_count,
//         //   views: post.media_type === "VIDEO" ? post.view_count || 0 : null,
//           engagement: post.like_count + post.comments_count,
//           time: post.time,
//           day: post.day,
//           mediaType: post.media_type,
//         //   duration: post.duration,
//           captionSize: post.caption_size,
//         }));

//         setPosts(processedData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   if (!posts)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <LoadingSpinner />
//       </div>
//     );

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//       <h3 className="text-lg font-bold mb-4 text-gray-800">Instagram Posts</h3>
//       <table className="table-auto w-full border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-200 p-2 text-left">Likes</th>
//             <th className="border border-gray-200 p-2 text-left">Comments</th>
//             <th className="border border-gray-200 p-2 text-left">Views</th>
//             <th className="border border-gray-200 p-2 text-left">Engagement</th>
//             <th className="border border-gray-200 p-2 text-left">Time</th>
//             <th className="border border-gray-200 p-2 text-left">Day</th>
//             <th className="border border-gray-200 p-2 text-left">Media Type</th>
//             <th className="border border-gray-200 p-2 text-left">Duration</th>
//             <th className="border border-gray-200 p-2 text-left">Caption Size</th>
//           </tr>
//         </thead>
//         <tbody>
//           {posts.map((post, index) => (
//             <tr key={index} className="hover:bg-gray-50">
//               <td className="border border-gray-200 p-2">{post.likes}</td>
//               <td className="border border-gray-200 p-2">{post.comments}</td>
//               <td className="border border-gray-200 p-2">{post.views || "N/A"}</td>
//               <td className="border border-gray-200 p-2">{post.engagement}</td>
//               <td className="border border-gray-200 p-2">{post.time}</td>
//               <td className="border border-gray-200 p-2">{post.day}</td>
//               <td className="border border-gray-200 p-2">{post.mediaType}</td>
//               <td className="border border-gray-200 p-2">{post.duration || "N/A"}</td>
//               <td className="border border-gray-200 p-2">{post.captionSize}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export async function fetchInstagramPosts() {
  try {
    const response = await fetch(
      "/api/dashboard/instagramPosts"
    ); // Fetch posts from API
    const data = await response.json();

    // Process data and store it in a dictionary
    const postsDictionary = data.reduce((dict, post) => {
      const postId = post.id; // Use a unique identifier for each post
      dict[postId] = {
        likes: post.like_count,
        comments: post.comments_count,
        engagement: post.like_count + post.comments_count,
        time: post.time,
        day: post.day,
        mediaType: post.media_type,
        captionSize: post.caption_size,
      };
      return dict;
    }, {}); // Initialize an empty dictionary

    return postsDictionary;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
