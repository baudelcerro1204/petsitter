import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/service_comments.css';

const ServiceComments = ({ serviceId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [serviceId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/comments/${serviceId}`);
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error al obtener los comentarios');
      setLoading(false);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/comments',
        {
          text: newComment,
          serviceId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewComment('');
      fetchComments();
    } catch (error) {
      setError('Error al agregar el comentario');
    }
  };

  if (loading) return <p>Cargando comentarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="service-comments-container">
      <h3>Comentarios</h3>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Escribe un comentario"
        />
        <button onClick={handleAddComment}>Agregar comentario</button>
      </div>
    </div>
  );
};

export default ServiceComments;
