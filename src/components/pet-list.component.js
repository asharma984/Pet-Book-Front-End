import React, {Component} from 'react';
import PetComponent from "./PetComponent";
import axios from 'axios';
const serverURL = "http://localhost:5000"

export default class PetList extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            // this is a dummy userID until we add in real users
            // in which case we should get that form the state
            // TODO replace this with this.params.match.userId when we have userIds in params
            userId: 'Admin024',
            listOfAnimals: [],
            listOfFollowedPets: []

        }
    }

    componentDidMount() {
        this._isMounted = true
        if(this.props.followed){
            // TODO link this to the user page that has who they are following.
        } else {
            axios.get(`${serverURL}/pets/user/${this.state.userId}`)
                .then(res => res.data)
                .then(listOfAnimals => {
                    this.setState({

                                      listOfAnimals: listOfAnimals

                                  });
                })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.followed){
            // TODO link this to the user page that has who they are following.
        } else {
            axios.get(`${serverURL}/pets/user/${this.state.userId}`)
                .then(res => res.data)
                .then(listOfAnimals => {
                    if (this._isMounted) {
                    this.setState({

                                      listOfAnimals: listOfAnimals

                                  });
                }})
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="card-deck">
                {this.state.listOfAnimals.map((animal) =>
                                                  <PetComponent key={animal._id}
                                                                animalType={animal.type}
                                                                name={animal.name}
                                                                age={animal.age}
                                                                animalId={animal._id}
                                                                pictures={animal.photos}
                                                                userId={animal.userId}
                                                                breed={animal.breeds}
                                                                location={animal.contact.address.location}/>)
                }
            </div>
        )
    }
}


