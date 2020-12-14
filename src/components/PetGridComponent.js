import React, { Component } from 'react';
import PetComponent from './PetComponent';
import axios from 'axios';
import {BASE_SERVER_URL} from "../urls";


export default class PetGirdComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfAnimals: [],
      listOfUserAnimals: [],
      searchParams: '',
      search: this.props.location.search,
      petType: '',
    };
  }

  componentDidMount() {
    this.setState({
      search: this.props.location.search,
    });

    axios
      .get(
        `${BASE_SERVER_URL}/api/petfinder/animals/&${handleSearch(
          new URLSearchParams(this.state.search),
        )}`,
      )
      .then((res) => res.data)
      .then((listOfAnimals) => {
        this.setState({
          listOfAnimals: listOfAnimals.animals,
        });
      });

    axios
      .get(
        `${BASE_SERVER_URL}/pets/type/${getType(
          new URLSearchParams(this.state.search),
        )}`,
      )
      .then((res) => res.data)
      .then((listOfAnimals) => {
        this.setState({
          listOfUserAnimals: listOfAnimals,
        });
      });
  }

  render() {
    return (
      <div className="card-group">
        {/* This is pets from our database */}
        {this.state.listOfUserAnimals.map((animal) => (
          <PetComponent
            key={animal._id}
            animalType={getType(new URLSearchParams(this.state.search))}
            name={animal.name}
            age={animal.age}
            animalId={animal._id}
            pictures={animal.photos}
            breed={animal.breeds}
            userId={animal.userId}
            location={animal.contact.address.location}
          />
        ))}

        {/* This is pets from petfinder */}
        {this.state.listOfAnimals.map((animal) => (
          <PetComponent
            key={animal.id}
            animalType={getType(new URLSearchParams(this.state.search))}
            name={animal.name}
            age={animal.age}
            animalId={animal.id}
            pictures={animal.photos}
            breed={animal.breeds}
            location={animal.contact.address}
          />
        ))}
      </div>
    );
  }
}

/*
The purpose of this function is to handle the search string for our requests, it take a URLSearchParams
 */
const handleSearch = (searchParams) => {
  let temp = '?';
  searchParams.forEach((value, key) => {
    if (value !== 'null') {
      temp = `${temp}${key}=${value}&`;
    }
  });
  return temp;
};

const getType = (searchParams) => {
  let temp = '';
  searchParams.forEach((value, key) => {
    temp = value;
  });
  return temp;
};
