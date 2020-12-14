
import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { BASE_SERVER_URL } from '../urls';
import UserContext from "../contex/UserContext";
const serverURL = 'http://localhost:5000';

function CreatePetComponent({ match }) {
  const history = useHistory();
  const { userData } = useContext(UserContext);

  const [type, setType] = useState('');
  const [types, setTypes] = useState([]);
  const [species, setSpecies] = useState('');
  const [primary, setPrimary] = useState('');
  const [breedes, setBreedes] = useState([])
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [adoptable, setAdoptable] = useState(false);
  const [name, setName] = useState('Default');
  const [description, setDescription] = useState('A lovely pet.');
  const [photo, setPhoto] = useState(
      "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg");
  const [city, setCity] = useState('');
  const [theState, setTheState] = useState('');
  const [cities, setCities] = useState([{city_name: ''}]);

  useEffect(() => {
    if(userData.user.type === "pet-shelter"){
      setAdoptable(true)
    }
      axios
          .get(`${BASE_SERVER_URL}/api/petfinder/types/`)
          .then((res) => res.data)
          .then((typesOfAnimals) => {
            setTypes(typesOfAnimals.types)
          });
    },[]);

  return (
      <div>
        {console.log(userData)}
        <h3>Add New Pet</h3>
        <form>
          <div className="form-group">
            <label>Pet Type</label>
            <select
                required
                className="form-control"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  axios
                      .get(`${BASE_SERVER_URL}/api/petfinder/breeds/${handleTypes(e.target.value)}`)
                      .then((res) => res.data)
                      .then((restypesOfBreeds) => {
                        setBreedes(restypesOfBreeds.breeds)
                      });

                }}>
              <option value="" disabled selected>
                Type
              </option>
              {
                types.map((type) => {
                  return (
                      <option key={type.name} value={type.name}>
                        {type.name}
                      </option>
                  )
                })}
            </select>
          </div>
          {/* The API uses scales-fins-other, small-furry, barnyard as
                    if they are one species like cat, when in fact they are made up of many species*/}
          {type && (
              <span>
              {(type === 'Scales, Fins & Other' ||
                type === 'Small & Furry' ||
                type === 'Barnyard') && (
                   <div className="form-group">
                     <label>Species</label>
                     <select
                         required
                         className="form-control"
                         value={species}
                         onChange={(e) => {
                           setSpecies(e.target.value);
                           setPrimary(e.target.value);
                         }}>
                       <option value="" disabled selected>
                         Species
                       </option>
                       {breedes.map((breed) => {
                         return (
                             <option key={breed.name} value={breed.name}>
                               {breed.name}
                             </option>
                         );
                       })}
                     </select>
                   </div>
               )}
                {type !== 'Scales, Fins & Other' &&
                 type !== 'Small & Furry' &&
                 type !== 'Barnyard' && (
                     <div className="form-group">
                       <label>Primary Breed</label>
                       <select
                           required
                           className="form-control"
                           value={primary}
                           onChange={(e) => {
                             setPrimary(e.target.value);
                             setSpecies(e.target.value);
                           }}
                       >
                         <option value="" disabled selected>
                           Primary Breed
                         </option>
                         {breedes.map((breed) => {
                           return (
                               <option key={breed.name} value={breed.name}>
                                 {breed.name}
                               </option>
                           );
                         })}
                       </select>
                     </div>
                 )}
            </span>
          )}
          <div className="form-group">
            <label>Pet's Name</label>
            <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Pet's Age</label>
            <select
                required
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            >
              <option value="" disabled selected>
                Age
              </option>
              <option value="Baby">Baby</option>
              <option value="Young">Young</option>
              <option value="Adult">Adult</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <div className="form-group">
            <label>Pet's Size</label>
            <select
                required
                className="form-control"
                value={size}
                onChange={(e) => setSize(e.target.value)}
            >
              <option value="" disabled selected>
                Size
              </option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xlarge">Xlarge</option>
            </select>
          </div>
          <div className="form-group">
            <label>Pet's Gender</label>
            <select
                required
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled selected>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="form-group">
            <label>What State Does the pet live in</label>
            <select
                required
                className="form-control"
                value={theState}
                onChange={(e) => {
                  axios
                      .get(`${BASE_SERVER_URL}/api/location/cities/${e.target.value}`)
                      .then((res) => res.data)
                      .then((listOfCities) => {
                        setCities(listOfCities)
                      });
                  setTheState(e.target.value)
                }
                }
            >
              <option value="" disabled selected>
                State
              </option>
              <option value="Alabama">Alabama</option>
              <option value="Alaska">Alaska</option>
              <option value="Arizona">Arizona</option>
              <option value="Arkansas">Arkansas</option>
              <option value="California">California</option>
              <option value="Colorado">Colorado</option>
              <option value="Connecticut">Connecticut</option>
              <option value="Delaware">Delaware</option>
              <option value="District Of Columbia">District Of Columbia</option>
              <option value="Florida">Florida</option>
              <option value="Georgia">Georgia</option>
              <option value="Hawaii">Hawaii</option>
              <option value="Idaho">Idaho</option>
              <option value="Illinois">Illinois</option>
              <option value="Indiana">Indiana</option>
              <option value="Iowa">Iowa</option>
              <option value="Kansas">Kansas</option>
              <option value="Kentucky">Kentucky</option>
              <option value="Louisiana">Louisiana</option>
              <option value="Maine">Maine</option>
              <option value="Maryland">Maryland</option>
              <option value="Massachusetts">Massachusetts</option>
              <option value="Michigan">Michigan</option>
              <option value="Minnesota">Minnesota</option>
              <option value="Mississippi">Mississippi</option>
              <option value="Missouri">Missouri</option>
              <option value="Montana">Montana</option>
              <option value="Nebraska">Nebraska</option>
              <option value="Nevada">Nevada</option>
              <option value="New Hampshire">New Hampshire</option>
              <option value="New Jersey">New Jersey</option>
              <option value="New Mexico">New Mexico</option>
              <option value="New York">New York</option>
              <option value="North Carolina">North Carolina</option>
              <option value="North Dakota">North Dakota</option>
              <option value="Ohio">Ohio</option>
              <option value="Oklahoma">Oklahoma</option>
              <option value="Oregon">Oregon</option>
              <option value="Pennsylvania">Pennsylvania</option>
              <option value="Rhode Island">Rhode Island</option>
              <option value="South Carolina">South Carolina</option>
              <option value="South Dakota">South Dakota</option>
              <option value="Tennessee">Tennessee</option>
              <option value="Texas">Texas</option>
              <option value="Utah">Utah</option>
              <option value="Vermont">Vermont</option>
              <option value="Virginia">Virginia</option>
              <option value="Washington">Washington</option>
              <option value="West Virginia">West Virginia</option>
              <option value="Wisconsin">Wisconsin</option>
              <option value="Wyoming">Wyoming</option>
            </select>
          </div>

          {theState && (
              <div className="form-group">
                <label>City </label>
                <select
                    required
                    value={city}
                    className="form-control"
                    onChange={(e) => setCity(e.target.value)}
                >
                  <option value="" disabled selected>
                    City
                  </option>
                  {cities.map((city) => {
                    return (
                        <option key={city.city_name} value={city.city_name}>
                          {city.city_name}
                        </option>
                    );
                  })}
                </select>
              </div>
          )}
          <div className="form-group">
            <label>Small Description of your pet</label>
            <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A small description of your pet"
                rows="3"
            />
          </div>
          <div className="form-group">
            <label>Pet Photo</label>
            <input
                type="text"
                className="form-control"
                placeholder="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                required
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
            />
            <small className="form-text text-muted">
              Only one for now, but don't worry you can add more later
            </small>
          </div>
          <div className="form-group">
            <input
                type="submit"
                value="Add New Pet"
                className="btn btn-primary"
                onClick={() => {

                  const pet = {
                    userId: match.params.userId,
                    type,
                    species,
                    breeds: {primary},
                    age,
                    size,
                    gender,
                    name,
                    description,
                    adoptable,

                    // since they are only making one photo
                    // we can just create an array with the photo in it
                    photos: [photo],
                    blogpostId: [],
                    contact: {
                      address: {
                        location: {
                          city: city,
                          state: theState,
                          email: userData.user.email
                        },
                      },
                    },
                  };
                  // add the pet to the database
                  axios.post(`${serverURL}/pets/add`, pet).then((res) => console.log(res));
                  // this sends ups back to the list of exercises(this might be unnecessary
                  history.replace(`/`);

                }
                }
            />
            <a className="btn btn-danger"
               onClick={() => {history.replace(`/`)}}
               href={`/`}>
              Cancel
            </a>
          </div>
        </form>
      </div>
  );
}

const handleTypes = (animalType) => {
  switch (animalType) {
    case 'Scales, Fins & Other':
      return 'scales-fins-other';
    case 'Small & Furry':
      return 'small-furry';
    default:
      return animalType;
  }
};
export default CreatePetComponent