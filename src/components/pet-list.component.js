import React, { Component } from 'react';
import PetComponent from './PetComponent';
import axios from 'axios';
import { BASE_SERVER_URL } from '../urls';
import UserContext from '../contex/UserContext';

export default class PetList extends Component {
  static contextType = UserContext;

  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      listOfAnimals: [],
      listOfFollowedPets: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;

    if (this.props.followed) {
      // TODO link this to the user page that has who they are following.
    } else {
      if (this.context.userData.user.id) {
        axios
          .get(`${BASE_SERVER_URL}/pets/user/${this.context.userData.user.id}`)
          .then((res) => res.data)
          .then((listOfAnimals) => {
            this.setState({
              listOfAnimals: listOfAnimals,
            });
          });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="card-deck">
        {this.state.listOfAnimals.map((animal) => (
          <PetComponent
            key={animal._id}
            animalType={animal.type}
            name={animal.name}
            age={animal.age}
            animalId={animal._id}
            pictures={animal.photos}
            userId={animal.userId}
            breed={animal.breeds}
            location={animal.contact.address.location}
          />
        ))}
      </div>
    );
  }
}
