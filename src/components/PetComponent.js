import React from 'react';
import { Link } from 'react-router-dom';

// This is almost a repeat of the PetComponent, but will be used for rendering profile.

class PetComponent extends React.Component {
  render() {
    const animal = this.props;
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
        {/* display this info if it's a pet on our site
                Old link/david route link                 <Link to={`/profile/${animalId}`}
                */}
        {userId && (
          <Link
            to={`/user/${userId}/profile/${animalId}`}
            className="card headerBackgroundColor"
            style={{ padding: '1rem', margin: '1rem' }}
          >
            <img className="card-img-top" src={pictures} alt={name} />
            <div className="card-body tableRowHighlight">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">
                {age} {breed}
              </p>
              <p className="card-text">
                {city}, {state}
              </p>
            </div>
          </Link>
        )}

        {/* display this info if it's an outside our site pet */}
        {!userId && (
          <Link
            to={`/PetGridComponent/${animalType}/${animalId}`}
            className="card headerBackgroundColor"
            style={{ padding: '1rem', margin: '1rem' }}
          >
            <img className="card-img-top" src={pictures} alt={name} />
            <div className="card-body tableRowHighlight">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">
                {age} {breed}
              </p>
              <p className="card-text">
                {city}, {state}
              </p>
            </div>
          </Link>
        )}
      </div>
    );
  }
}

export default PetComponent;
