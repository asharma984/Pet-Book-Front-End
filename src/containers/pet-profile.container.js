import React, { Component } from 'react';
import BlogList from '../components/blog-list.component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_SERVER_URL } from '../urls';

export default class PetProfile extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.editing = this.editing.bind(this);
    this.removePet = this.removePet.bind(this);
    this.neverMind = this.neverMind.bind(this);
    this.addNewPhoto = this.addNewPhoto.bind(this);
    this.cancelAddNewPhoto = this.cancelAddNewPhoto.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.sendPetToServer = this.sendPetToServer.bind(this);
    this.sendPetToServer = this.sendPetToServer.bind(this);

    this.state = {
      isOwner: false,
      editing: false,
      remove: false,
      addPhoto: false,
      newPhoto: '',
      petId: this.props.match.params.petId,
      pet: {
        userId: '',
        type: '',
        species: '',
        breeds: { primary: '' },
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
      },
    };
  }

  // we need to ensure they are owners
  editing() {
    this.setState({
      editing: true,
    });
  }

  onChangePhoto(e) {
    this.setState({
      newPhoto: e.target.value,
    });
  }
  addNewPhoto() {
    this.setState({
      addPhoto: true,
    });
  }

  cancelAddNewPhoto() {
    this.setState({
      addPhoto: false,
    });
  }

  removePhoto(removedPhoto) {
    let oldPhotos = this.state.pet.photos;
    let newPhotos = oldPhotos.filter((photo) => photo !== removedPhoto);

    this.setState((previousState) => ({
      pet: { ...previousState.pet, photos: newPhotos },
    }));

    // since setState is async
    let newPet = this.state.pet;
    newPet.photos = newPhotos;

    axios
      .put(`${BASE_SERVER_URL}/pets/update/${this.state.petId}`, newPet)
      .then((res) => console.log(res));
  }

  sendPetToServer() {
    let oldPhotos = this.state.pet.photos;
    let newPhotos = oldPhotos.concat(this.state.newPhoto);

    this.setState((previousState) => ({
      pet: { ...previousState.pet, photos: newPhotos },
    }));

    // since setState is async
    let newPet = this.state.pet;
    newPet.photos = newPhotos;

    axios
      .put(`${BASE_SERVER_URL}/pets/update/${this.state.petId}`, newPet)
      .then((res) => console.log(res));

    this.setState({
      addPhoto: false,
    });
  }

  neverMind() {
    this.setState({
      remove: false,
    });
  }

  removePet() {
    if (this.state.remove) {
      this.state.pet.blogpostId.forEach((post) => {
        axios
          .delete(`${BASE_SERVER_URL}/blogposts/${post}`)
          .then((res) => console.log(res));
      });

      axios
        .delete(`${BASE_SERVER_URL}/pets/${this.state.petId}`)
        .then((res) => (window.location = `/`));
    } else {
      this.setState({
        remove: true,
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`${BASE_SERVER_URL}/pets/${this.state.petId}`)
      .then((res) => res.data)
      .then((pet) => {
        if (this._isMounted) {
          this.setState({
            pet: pet,
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>{this.state.pet.name}</h1>
        <div className="card-deck">
          {this.state.pet.photos.map((photo) => (
            <div className="card" key={`${photo}`}>
              <img className="card-img-top" src={`${photo}`} alt={`${photo}`} />
              {this.state.pet.userId === this.props.match.params.userId && (
                <button
                  onClick={() => this.removePhoto(photo)}
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          <div className="card">
            <div className="card-header">
              <p>Facts about {this.state.pet.name}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Species: {this.state.pet.species}
              </li>
              <li className="list-group-item">
                Breed: {this.state.pet.breeds.primary}
              </li>
              <li className="list-group-item">
                Gender: {this.state.pet.gender}
              </li>
              <li className="list-group-item">Age: {this.state.pet.age}</li>
              <li className="list-group-item">
                From: {this.state.pet.contact.address.location.city},{' '}
                {this.state.pet.contact.address.location.state}
              </li>
            </ul>
          </div>

          {this.state.pet.userId === this.props.match.params.userId && (
            <div className="card">
              <div className="card-header">Owner Features</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  {!this.state.addPhoto && (
                    <span
                      className="nav-link btn btn-outline-primary"
                      onClick={this.addNewPhoto}
                    >
                      Add new Photo
                    </span>
                  )}
                  {this.state.addPhoto && (
                    <span>
                      <input
                        placeholder="site link"
                        className="nav-link"
                        onChange={this.onChangePhoto}
                      />
                      <button
                        className="nav-link btn btn-outline-primary"
                        onClick={this.sendPetToServer}
                      >
                        Submit
                      </button>
                      <button
                        className="nav-link btn btn-outline-danger"
                        onClick={this.cancelAddNewPhoto}
                      >
                        Never Mind
                      </button>
                    </span>
                  )}
                </li>
                <li className="list-group-item">
                  <Link
                    to={`/blog/${this.state.petId}`}
                    className="nav-link btn btn-outline-success"
                  >
                    Create BlogPost
                  </Link>
                </li>
                <li className="list-group-item">
                  {!this.state.remove && (
                    <span
                      className="nav-link btn btn-outline-danger"
                      onClick={this.removePet}
                    >
                      Remove {this.state.pet.name}
                    </span>
                  )}
                  {this.state.remove && (
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <span
                          className="nav-link btn btn-outline-primary"
                          onClick={this.neverMind}
                        >
                          Never Mind
                        </span>
                      </li>
                      <li className="list-group-item">
                        <span
                          className="nav-link btn btn-outline-danger"
                          onClick={this.removePet}
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
        <p>{this.state.pet.description}</p>
        <BlogList
          isOwner={this.state.pet.userId === this.props.match.params.userId}
          petId={this.state.petId}
        />
      </div>
    );
  }
}
