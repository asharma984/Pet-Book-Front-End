import React, {Component} from 'react';
import PetComponent from './PetComponent';
import axios from "axios";
const serverURL = "http://localhost:5000";


export default class PetGirdComponent extends Component {
    constructor(props) {
        super(props);


        this.state = {
            listOfAnimals: [],
            listOfUserAnimals: [],
            searchParams: '',
            search: this.props.location.search,
            petType: ''
        }

    }


    componentDidMount() {

        this.setState({
                          search:this.props.location.search
                      }
        )
        this.setState({searchParams:new URLSearchParams(this.search)});

        axios.get(`${serverURL}/api/petfinder/animals/&${handleSearch(new URLSearchParams(this.state.search))}`)
            .then(res => res.data)
            .then(listOfAnimals => {
                this.setState({
                                  listOfAnimals: listOfAnimals.animals
                              })
            });

        axios.get(`${serverURL}/pets/type/${getType(new URLSearchParams(this.state.search))}`)
            .then(res => res.data)
            .then(listOfAnimals => {
                this.setState({
                                  listOfUserAnimals: listOfAnimals
                              }
                )
            });
    }

    componentDidUpdate(prevProps, prevState) {
    }


    render() {
        return (
            <div className="card-group">
                {this.state.listOfUserAnimals.map((animal) =>
                                                  <PetComponent key={animal._id}
                                                                animalType={getType(new URLSearchParams(this.state.search))}
                                                                name={animal.name}
                                                                age={animal.age}
                                                                animalId={animal._id}
                                                                pictures={animal.photos}
                                                                breed={animal.breeds}
                                                                userId={animal.userId}
                                                                location={animal.contact.address.location}/>)
                }
                {this.state.listOfAnimals.map((animal) =>
                                                  <PetComponent key={animal.id}
                                                                animalType={getType(new URLSearchParams(this.state.search))}
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

const getType=(searchParams)=>{
    let temp = "";
    searchParams.forEach((value,key) => {
        temp = value
    });
    return temp
};
