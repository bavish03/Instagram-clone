import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ViewStory() {
  const { id, tot } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      fetch('http://localhost:3001/story')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setStory(data);
          } else {
            console.error("Error:", data);
          }
        })
        .catch(err => {
          console.error("Fetch failed:", err);
        });
    }, [id]);

    if (id>tot || is<=0){
        Navigate('/');
    }

  return (
    <div>
      {story ? <div className="d-flex justify-content align-items-center">
        <Link to={`http://localhost:5173/story/${Number(id)-1}${tot}}`}><i className="bi bi-arrow-left-circle-fill"></i></Link> 
        <img className="vh-100" src={story.image} alt="story"/>
        <Link to={`http://localhost:5173/story/${Number(id)+1}/${tot}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>
         
    </div> :

        <div>Loading...</div>
      }
    </div>
  );
}

export default ViewStory;
