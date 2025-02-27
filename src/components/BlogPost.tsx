import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from './Blog';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(post => post.id === id);

  const handleReturn = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('blog');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article non trouvé</h2>
          <button onClick={handleReturn} className="text-red-600 hover:text-red-700">
            Retourner aux actualités
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-20">
      <div className="mb-8">
        <button 
          onClick={handleReturn}
          className="inline-flex items-center text-red-600 hover:text-red-700"
        >
          ← Retour aux actualités
        </button>
      </div>

      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
      />
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
          <span className="mx-2">•</span>
          <span>Par {post.author}</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {post.excerpt}
          </p>
          {/* Ici, vous pouvez ajouter le contenu complet de l'article */}
        </div>
      </div>
    </article>
  );
}
