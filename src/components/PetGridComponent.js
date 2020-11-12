import React from 'react';
import PetComponent from './PetComponent';
import {specificAnimalTypeDefault} from '../Helpers/APIRequest'

const APIKey = "hHU1MtX7PMLlBnjaE16jR77Kv5OVX4SVmWWnvKCM5SKILHSYgi";
const SECRET = "FhaZVEb2BQ3ZQ8C9Xt27uaPEuw1PlJ4oFmBjVODX";

const COMPRISED = `grant_type=client_credentials&client_id=${APIKey}&client_secret=${SECRET}`;

const AnimalTypes = "https://api.petfinder.com/v2/types";
const PetFinderURL = "https://api.petfinder.com/v2";
const PetFinderAuthURL = "https://api.petfinder.com/v2/oauth2/token";

class PetGridComponent extends React.Component {
    state = {
        listOfAnimals: []
    };

    componentDidMount() {
        const animalType = this.props.match.params.animalType;
        {console.log(this.props.match)}

        // get auth token
        fetch(`${PetFinderAuthURL}`, {
            method: 'POST',
            body: `${COMPRISED}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => response.json())

            //get animal types
            .then(responsejson => {
                fetch(`${PetFinderURL}/animals?type=${animalType}`, {
                    headers: {
                        'Authorization': responsejson.token_type + ' ' + responsejson.access_token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => response.json())
                    .then(listOfAnimals => {
                        this.setState({
                                          listOfAnimals: listOfAnimals.animals
                                      })
                    })

            })

    }

    componentDidUpdate(prevProps, prevState) {
        const animalType = this.props.match.params.animalType;

        if (animalType !== prevProps.match.params.animalType) {
            fetch(`${PetFinderAuthURL}`, {
                method: 'POST',
                body: `${COMPRISED}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => response.json())

                //get animal types
                .then(responsejson => {
                    fetch(`${PetFinderURL}/animals?type=${animalType}`, {
                        headers: {
                            'Authorization': responsejson.token_type + ' '
                                             + responsejson.access_token,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(response => response.json())
                        .then(listOfAnimals => {
                            this.setState({
                                              listOfAnimals: listOfAnimals.animals
                                          })
                        })

                })
        }
    }

    render() {
        const animalType = this.props.match.params.animalType;
        return (
            <div className="card-group">
                {this.state.listOfAnimals.map((animal) =>
                                                  <PetComponent key={animal.id}
                                                                animalType={animalType}
                                                                name={animal.name} age={animal.age}
                                                                animalId={animal.id}
                                                                pictures={animal.photos}
                                                                breed={animal.breeds}/>)
                }
            </div>
        )
    }
}

export default PetGridComponent;
