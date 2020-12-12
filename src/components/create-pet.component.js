import React, { Component } from 'react';
import axios from 'axios';
const serverURL = 'http://localhost:5000';

export default class CreatePet extends Component {
  constructor(props) {
    super(props);

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePhotos = this.onChangePhotos.bind(this);
    this.onChangeSpecies = this.onChangeSpecies.bind(this);
    this.onChangeLocState = this.onChangeLocState.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      // this is a dummy userID until we add in real users
      // in which case we should get that form the state
      userId: '',
      type: '',
      types: [],
      species: '',
      specieses: [],

      // currently we are only supporting a primary breed
      breeds: { primary: '' },
      breedses: [],
      age: '',
      size: '',
      gender: '',
      name: 'Default',

      // We don't require a description so this is default text
      description: 'A lovely pet.',
      photos: [],
      photo: '',
      city: '',
      cities: [{ city_name: '' }],
      state: '',
    };
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
    this.onSetType(handleTypes(e.target.value));
  }

  onChangeBreed(e) {
    this.setState((prevState) => ({
      breeds: {
        ...prevState.breeds,
        primary: e.target.value,
      },
    }));

    // The API uses scales-fins-other, small-furry, barnyard as if they are one species
    // like cat, when in fact they are made up of many species this fixes that
    this.setState({
      species: this.state.type,
    });
  }

  onChangeSpecies(e) {
    this.setState({
      species: e.target.value,
    });

    // The API uses scales-fins-other, small-furry, barnyard as if they are one species
    // like cat, when in fact they are made up of many species this fixes that
    this.setState((prevState) => ({
      breeds: {
        ...prevState.breeds,
        primary: e.target.value,
      },
    }));
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value,
    });
  }

  onChangeSize(e) {
    this.setState({
      size: e.target.value,
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  // They are only adding one photo so we are just talking the url
  onChangePhotos(e) {
    this.setState({
      photo: e.target.value,
    });
  }

  onChangeLocState(e) {
    axios
      .get(`${serverURL}/api/location/cities/${e.target.value}`)
      .then((res) => res.data)
      .then((listOfCities) => {
        this.setState({
          cities: listOfCities,
        });
      });
    this.setState({
      state: e.target.value,
    });
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value,
    });
  }

  onSetType(animalType) {
    this.setState({
      userId: this.props.match.params.userId,
    });

    axios
      .get(`${serverURL}/api/petfinder/breeds/${animalType}`)
      .then((res) => res.data)
      .then((typesOfBreeds) => {
        this.setState({
          breedses: typesOfBreeds.breeds,
        });
      });
  }

  onSubmit(e) {
    e.preventDefault();

    const pet = {
      userId: this.state.userId,
      type: this.state.type,
      species: this.state.species,
      breeds: this.state.breeds,
      age: this.state.age,
      size: this.state.size,
      gender: this.state.gender,
      name: this.state.name,
      description: this.state.description,

      // since they are only making one photo
      // we can just create an array with the photo in it
      photos: [this.state.photo],
      blogpostId: [],
      contact: {
        address: {
          location: {
            city: this.state.city,
            state: this.state.state,
          },
        },
      },
    };

    // add the pet to the database
    axios.post(`${serverURL}/pets/add`, pet).then((res) => console.log(res));
    // this sends ups back to the list of exercises(this might be unnecessary
    window.location = '/';
  }

  componentDidMount() {
    axios
      .get(`${serverURL}/api/petfinder/types/`)
      .then((res) => res.data)
      .then((typesOfAnimals) => {
        this.setState({
          types: typesOfAnimals.types,
        });
      });
  }

  render() {
    return (
      <div>
        <h3>Add New Pet</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Pet Type</label>
            <select
              ref="userInput"
              required
              className="form-control"
              onChange={this.onChangeType}
            >
              <option value="" disabled selected>
                Type
              </option>
              {this.state.types.map((type) => {
                return (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* The API uses scales-fins-other, small-furry, barnyard as
                    if they are one species like cat, when in fact they are made up of many species*/}
          {this.state.type && (
            <span>
              {(this.state.type === 'Scales, Fins & Other' ||
                this.state.type === 'Small & Furry' ||
                this.state.type === 'Barnyard') && (
                <div className="form-group">
                  <label>Species</label>
                  <select
                    ref="userInput"
                    required
                    className="form-control"
                    onChange={this.onChangeSpecies}
                  >
                    <option value="" disabled selected>
                      Species
                    </option>
                    {this.state.breedses.map((breed) => {
                      return (
                        <option key={breed.name} value={breed.name}>
                          {breed.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
              {this.state.type !== 'Scales, Fins & Other' &&
                this.state.type !== 'Small & Furry' &&
                this.state.type !== 'Barnyard' && (
                  <div className="form-group">
                    <label>Primary Breed</label>
                    <select
                      ref="userInput"
                      required
                      className="form-control"
                      onChange={this.onChangeBreed}
                    >
                      <option value="" disabled selected>
                        Primary Breed
                      </option>
                      {this.state.breedses.map((breed) => {
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
              required
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Pet's Age</label>
            <select
              ref="userInput"
              required
              className="form-control"
              onChange={this.onChangeAge}
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
              ref="userInput"
              required
              className="form-control"
              onChange={this.onChangeSize}
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
              ref="userInput"
              required
              className="form-control"
              onChange={this.onChangeGender}
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
              ref="userInput"
              required
              className="form-control"
              onChange={this.onChangeLocState}
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

          {this.state.state && (
            <div className="form-group">
              <label>City </label>
              <select
                ref="userInput"
                required
                className="form-control"
                onChange={this.onChangeCity}
              >
                <option value="" disabled selected>
                  City
                </option>
                {this.state.cities.map((city) => {
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
              onChange={this.onChangeDescription}
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
              onChange={this.onChangePhotos}
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
            />
            <a className="btn btn-danger" href={`/`}>
              Cancel
            </a>
          </div>
        </form>
      </div>
    );
  }
}

/*
The purpose of this function is to fix the type data so it actually is parsable in the URL
 */
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
