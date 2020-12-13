import {Link, useHistory} from 'react-router-dom';
import React, {useState, useContext,} from 'react';
import UserContext from "../contex/UserContext";

const serverURL = 'http://localhost:5000';

function PetComponent(props) {
    const history = useHistory();
    const {userData} = useContext(UserContext);
    const animal = props;
    const animalType = animal.animalType;
    const name = animal.name;
    const age = animal.age;
    const animalId = animal.animalId;
    const breed = animal.breed['primary'];
    const city = animal.location.city;
    const state = animal.location.state;
    const userId = animal.userId;
    let pictures =
        'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'; // image not found

    const isOwner = userData.user && userData.user.id === props.userId

    // check if there are pictures
    if (animal.pictures[0]) {
        // check if the pictures are from us or petfinder
        if (!animal.pictures[0]['full']) {
            pictures = animal.pictures[0];
        } else {
            pictures = animal.pictures[0]['full'];
        }
    }

    return (
        <div className="col">
            {!isOwner && userId &&
             <span className="card headerBackgroundColor"
                   style={{padding: '1rem', margin: '1rem'}}>
          <Link
              to={`/user/${userId}/profile/${animalId}`}
          >
            <img className="card-img-top" src={pictures} alt={name}/>
          </Link>
            <div className="card-body tableRowHighlight">
                {props.isFollowed &&
                 <h5 className="card-title">{name}
                     <button className="btn"
                             onClick={() => {

                             }}>Unfollow Me
                     </button>
                 </h5>
                }

                {!props.isFollowed &&
                 <h5 className="card-title">{name}
                     <button className="btn"
                             onClick={() => {

                             }}>Follow Me!
                     </button>
                 </h5>
                }
                <p className="card-text">
                {age} {breed}
              </p>
              <p className="card-text">
                {city}, {state}
              </p>
            </div>
            </span>
            }

            {isOwner  &&
             <span className="card headerBackgroundColor"
                   style={{padding: '1rem', margin: '1rem'}}>
          <Link
              to={`/user/${userId}/profile/${animalId}`}
          >
            <img className="card-img-top" src={pictures} alt={name}/>
          </Link>
            <div className="card-body tableRowHighlight">
                 <h5 className="card-title">{name}
                 </h5>
                <p className="card-text">
                {age} {breed}
              </p>
              <p className="card-text">
                {city}, {state}
              </p>
            </div>
            </span>
            }

            {/* display this info if it's an outside our site pet */}
            {!userId &&
             <span className="card headerBackgroundColor"
                   style={{padding: '1rem', margin: '1rem'}}>
                                  <Link
                                      to={`/PetGridComponent/${animalType}/${animalId}`}

                                  >
                    <img className="card-img-top" src={pictures} alt={name}/>
                                    </Link>
                    <div className="card-body tableRowHighlight">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">
                            {age} {breed}
                        </p>
                        <p className="card-text">
                            {city}, {state}
                        </p>
                    </div>

                </span>
            }
        </div>
    );
}

export default PetComponent;
