import React, {Component} from 'react';
import PetComponent from './PetComponent';
import axios from "axios";
const serverURL = "http://localhost:5000";


const APIKey = "hHU1MtX7PMLlBnjaE16jR77Kv5OVX4SVmWWnvKCM5SKILHSYgi";
const SECRET = "FhaZVEb2BQ3ZQ8C9Xt27uaPEuw1PlJ4oFmBjVODX";

const COMPRISED = `grant_type=client_credentials&client_id=${APIKey}&client_secret=${SECRET}`;

const AnimalTypes = "https://api.petfinder.com/v2/types";
const PetFinderURL = "https://api.petfinder.com/v2";
const PetFinderAuthURL = "https://api.petfinder.com/v2/oauth2/token";

export default class PetGirdComponent extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);


        this.state = {
            listOfAnimals: [],
            searchParams: ''
        }

    }


    componentDidMount() {
        //TODO fix this so it works properly with server, current issue is the params in
        // the search

        const search = this.props.location.search;
        this.setState({searchParams:new URLSearchParams(search)});

        axios.get(`${serverURL}/api/petfinder/animals/&${handleSearch(new URLSearchParams(search))}`)
            .then(res => res.data)
            .then(listOfAnimals => {
                this.setState({
                                  listOfAnimals: listOfAnimals.animals
                              })
            });
    }

    componentDidUpdate(prevProps, prevState) {

        //TODO fix this so it works properly with server, current issue is the params in
        // the search
        // Move to server
        const searching = this.props.location.search;

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
                                          })
                        })

                })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
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
                                                                breed={animal.breeds}
                                                                location={animal.contact.address}/>)
                }
            </div>
        )
    }
}


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