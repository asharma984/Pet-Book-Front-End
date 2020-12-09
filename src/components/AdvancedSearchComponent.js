import React, {Component} from 'react';

import axios from "axios";
import {Link} from "react-router-dom";

const serverURL = "https://radiant-ravine-41044.herokuapp.com";


export default class AdvancedSearchComponent extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);


        this.state = {
            typesOfAnimals: [],
            animalParams: 'testing',
            animalType: "dog",
            optionalParams:
                {
                    "location": null,
                    "distance": null
                }
        }

    }


    componentDidMount() {

        axios.get(`${serverURL}/api/petfinder/types/`)
            .then(res => res.data)
            .then(typesOfAnimals => {
                this.setState({
                                  typesOfAnimals: typesOfAnimals.types
                              })
            })

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div>
                {/* Create a select filled with the animal types */}
                <select onChange={
                    (event) =>
                        this.setState({animalType: event.target.value})

                }>
                    {this.state.typesOfAnimals.map(type =>
                                                       <option
                                                           value={type.name}
                                                           key={type.name}>{cutify(
                                                           type.name)}</option>)
                    };
                </select>
                {/* input for zipcode */}
                <input placeholder="Zip Code" id="zip" name="zip" type="text" inputMode="numeric"
                       pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$" onChange={
                    (event) =>
                        this.setState(prevState => ({
                            optionalParams: {
                                ...prevState.optionalParams,
                                "location": event.target.value
                            }
                        }))}

                />

                {/* input for distance dependant on having a zipcode */}
                {this.state.optionalParams["location"] &&
                 <input placeholder="Distance" max="500" inputMode="numeric" type="number"
                        step="10" onChange={
                     (event) =>
                         this.setState(prevState => ({
                             optionalParams: {
                                 ...prevState.optionalParams,
                                 "distance": event.target.value
                             }
                         }))}/>

                }

                {/* submit button */}
                <Link className="btn btn-primary"
                      to={`/AdvancedSearchComponent/search${prepareUrl(this.state.animalType, this.state.optionalParams)}`}
                      onClick={() => prepareUrl(this.state.animalType,
                                                this.state.optionalParams)}>{`Look for ${cutify(
                    this.state.animalType)}`}</Link>
            </div>
        )
    }
}

/*
The purpose of this function is to make a string that can be put into the URL.
TODO DO we want this to not have the null? if so we can reuse the builder function from petGrid
 */
const prepareUrl = (animalType, optionalParams) => {
    const realAnimalType = handleClick(animalType);
    let {location, distance} = optionalParams;

    // this is to fix an issue where putting in a zip code and then a distance causes an issue with
    //searching where the distance is kept but the zip code may be null. This works fine for a few
    // parameters but if we wish to expand we probably want a better way to handle this.
    // order matters for these NUll location we just search for type, null distance just location
    if(!location){
        return`?type=${realAnimalType}`
    }
    if(!distance){
        return`?type=${realAnimalType}&location=${location}`
    }
    if(distance < 10){
        return`?type=${realAnimalType}&location=${location}&distance=10`
    }
    return`?type=${realAnimalType}&location=${location}&distance=${distance}`
};
/*
The purpose of this function is to fix the type data so it actually is parsable in the URL
 */
const handleClick = (animalType) => {
    switch (animalType) {
        case "Scales, Fins & Other":
            return "scales-fins-other";
        case "Small & Furry":
            return "small-furry";
        default:
            return animalType;
    }
};

/*
The purpose of this function is to fix the grammar for plural animals and to cutify "Small & Furry"
 */
const cutify = (animalType) => {
    switch (animalType) {
        case "Barnyard":
            return "Barnyard Animals";
        case "Small & Furry":
            return "Smol & Furries";
        case "Bird":
            return "Birbs";
        default:
            return `${animalType}s`;
    }
};