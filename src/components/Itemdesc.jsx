import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRecipesByMealId} from '../LogicHandles/Handlerecipes';
import '../Styles/itemdesc.css';

function Itemdesc() {
  const { id } = useParams(); 
  const [item, setItem] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMealDetails = async () => {
      await fetchRecipesByMealId(id, setItem, navigate);
    };

    fetchMealDetails();
  }, [id, navigate]); 

  if (!item) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="item-card">
        <img className="item-image" src={item.strMealThumb} alt={item.strMeal} />
        <div className="item-details">
          <h2 className="item-name">{item.strMeal}</h2>
          <p className="item-description">{item.strInstructions || "No description available."}</p>

          <h3>Ingredients:</h3>
          <ul>
            {Array.from({ length: 20 }).map((_, index) => {
              const ingredient = item[`strIngredient${index + 1}`];
              const measure = item[`strMeasure${index + 1}`];
              return ingredient ? (
                <li key={index}>{measure} {ingredient}</li>
              ) : null;
            })}
          </ul>
          <a href={item.strSource} target="_blank" rel="noopener noreferrer">Source</a>
          {item.strYoutube && (
            <div>
              <h3>Watch Video:</h3>
              <iframe
                width="560"
                height="315"
                src={item.strYoutube.replace("watch?v=", "embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Itemdesc;
