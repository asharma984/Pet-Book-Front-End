import React from 'react';
import PetComponent from './PetComponent';

const APIKey = "hHU1MtX7PMLlBnjaE16jR77Kv5OVX4SVmWWnvKCM5SKILHSYgi";
const SECRET = "FhaZVEb2BQ3ZQ8C9Xt27uaPEuw1PlJ4oFmBjVODX";

const COMPRISED = `grant_type=client_credentials&client_id=${APIKey}&client_secret=${SECRET}`;

const AnimalTypes = "https://api.petfinder.com/v2/types";
const PetFinderURL = "https://api.petfinder.com/v2";
const PetFinderAuthURL = "https://api.petfinder.com/v2/oauth2/token";

class PetGridComponent extends React.Component {
    state = {
        listOfAnimals: [],
        searchParams: ''
    };

    componentDidMount() {
        const search = this.props.location.search;
        this.setState({searchParams:new URLSearchParams(search)});

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
                fetch(`${PetFinderURL}/animals${handleSearch(this.state.searchParams)}`, {
                    headers: {
                        'Authorization': responsejson.token_type + ' ' + responsejson.access_token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => response.json())
                    .then(listOfAnimals => {
                        this.setState({

                                          listOfAnimals: listOfAnimals.animals

                                      });
                    })

            })

    }

    componentDidUpdate(prevProps, prevState) {
        const searching = this.props.location.search;
        console.log(`current props ${searching}`);
        console.log(`prevprops ${prevProps.location.search}`);
        if (searching !== prevProps.location.search) {
            fetch(`${PetFinderAuthURL}`, {
                method: 'POST',
                body: `${COMPRISED}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => response.json())

                //get animal types
                .then(responsejson => {
                    fetch(`${PetFinderURL}/animals${handleSearch(new URLSearchParams(searching))}`, {
                        headers: {
                            'Authorization': responsejson.token_type + ' '
                                             + responsejson.access_token,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(response => response.json())
                        .then(listOfAnimals => {
                            this.setState({
                                              listOfAnimals: listOfAnimals.animals
                                          });
                        })

                })
        }
    }

    render() {
        return (
            <div className="card-group">
                {this.state.listOfAnimals.map((animal) =>
                                                  <PetComponent key={animal.id}
                                                                animalType={this.state.searchParams.get('type')}
                                                                name={animal.name} age={animal.age}
                                                                animalId={animal.id}
                                                                pictures={animal.photos}
                                                                userId={animal.userId}
                                                                breed={animal.breeds}
                                                  location={animal.contact.address}/>)
                }
            </div>
        )
    }
}

export default PetGridComponent;

/*
The purpose of this function is to handle the search string for our requests, it take a URLSearchParams
 */
const handleSearch=(searchParams)=>{
    let temp = "?";
    searchParams.forEach((value,key) => {
        if(value !== 'null'){
            temp=(`${temp}${key}=${value}&`);
        }
    });
    return temp
};
