import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_SERVER_URL } from '../urls';
import UserContext from "../contex/UserContext";
import BlogList from "../components/BlogListComponent";



function PetProfileContainer({ match }) {
  const history = useHistory();
  const { userData } = useContext(UserContext);

  const [remove, setRemove] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState('');
  const [petId, setPetId] = useState(match.params.petId);
  const [pet, setPet] = useState({
                                   userId: '',
                                   type: '',
                                   species: '',
                                   breeds: {primary: ''},
                                   age: '',
                                   size: '',
                                   gender: '',
                                   name: '',
                                   description: '',

                                   photos: [],
                                   blogpostId: [],
                                   contact: {
                                     address: {
                                       location: {
                                         city: '',
                                         state: '',
                                       },
                                     },
                                   },
                                 });

  const isOwner = userData.user && userData.user.id === pet.userId

  useEffect(() => {
      if (!userData.user) {history.replace('/login');}
      axios
          .get(`${BASE_SERVER_URL}/pets/${petId}`)
          .then((res) => res.data)
          .then((resPet) => {
            setPet(resPet)
          });
  },[]);

    return (
      <div className="container-fluid">
        <h1>{pet.name}</h1>
        <div className="card-deck">
          {pet.photos.map((photo) => (
            <div className="card" key={`${photo}`}>
              <img className="card-img-top" src={`${photo}`} alt={`${photo}`} />

              {isOwner && (
                <button
                  onClick={() => {
                    let oldPhotos = pet.photos;
                    let newPhotos = oldPhotos.filter((removedPhoto) => removedPhoto !== photo);
                    let newPet = pet;
                    newPet.photos = newPhotos;

                    axios
                        .put(`${BASE_SERVER_URL}/pets/update/${petId}`, newPet)
                        .then((res) => console.log(res));

                    setPet({...newPet})
                  }}
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          <div className="card">
            <div className="card-header">
              <p>Facts about {pet.name}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Species: {pet.species}
              </li>
              <li className="list-group-item">
                Breed: {pet.breeds.primary}
              </li>
              <li className="list-group-item">
                Gender: {pet.gender}
              </li>
              <li className="list-group-item">Age: {pet.age}</li>
              <li className="list-group-item">
                From: {pet.contact.address.location.city},{' '}
                {pet.contact.address.location.state}
              </li>
            </ul>
          </div>

          {isOwner && (
            <div className="card">
              <div className="card-header">Owner Features</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  {!addPhoto && (
                    <span
                      className="nav-link btn btn-outline-primary"
                      onClick={() => {      setAddPhoto(true)}}
                    >
                      Add new Photo
                    </span>
                  )}
                  {addPhoto && (
                    <span>
                      <input
                        placeholder="site link"
                        className="nav-link"
                        value={newPhoto}
                        onChange={(e)=>{setNewPhoto(e.target.value)}}
                      />
                      <button
                        className="nav-link btn btn-outline-primary"
                        onClick={() =>{
                          let oldPhotos = pet.photos;
                          let newPhotos = oldPhotos.concat(newPhoto);
                          let newPet = pet;
                          newPet.photos = newPhotos;

                          axios
                          .put(`${BASE_SERVER_URL}/pets/update/${petId}`, newPet)
                          .then((res) => console.log(res));
                          setAddPhoto(false);}}>
                        Submit
                      </button>
                      <button
                        className="nav-link btn btn-outline-danger"
                        onClick={() => setAddPhoto(false)}
                      >
                        Never Mind
                      </button>
                    </span>
                  )}
                </li>
                <li className="list-group-item">
                  <Link
                    to={`/blog/${petId}`}
                    className="nav-link btn btn-outline-success"
                  >
                    Create BlogPost
                  </Link>
                </li>
                <li className="list-group-item">
                  {!remove && (
                    <span
                      className="nav-link btn btn-outline-danger"
                      onClick={() => {
                          setRemove(true);}}
                    >
                      Remove {pet.name}
                    </span>
                  )}
                  {remove && (
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <span
                          className="nav-link btn btn-outline-primary"
                          onClick={() => setRemove(false)}
                        >
                          Never Mind
                        </span>
                      </li>
                      <li className="list-group-item">
                        <span
                          className="nav-link btn btn-outline-danger"
                          onClick={() => {
                              pet.blogpostId.forEach((post) => {
                                axios
                                    .delete(`${BASE_SERVER_URL}/blogposts/${post}`)
                                    .then((res) => console.log(res));
                              });

                              axios
                                  .delete(`${BASE_SERVER_URL}/pets/${petId}`)
                                  .then((res) => (history.replace('/')));
                            }
                          }
                        >
                          Confirm Removal
                        </span>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
        <p>{pet.description}</p>
        <BlogList
          isOwner={isOwner}
          petId={petId}
        />
      </div>
    );
  }

  export default PetProfileContainer