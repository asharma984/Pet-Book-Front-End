import React from 'react';
import PetGridComponent from './PetGridComponent'
import {specificAnimalTypeDefault} from "../Helpers/APIRequest";
import {Link} from "react-router-dom";

const APIKey = "hHU1MtX7PMLlBnjaE16jR77Kv5OVX4SVmWWnvKCM5SKILHSYgi";
const SECRET = "FhaZVEb2BQ3ZQ8C9Xt27uaPEuw1PlJ4oFmBjVODX";

const COMPRISED = `grant_type=client_credentials&client_id=${APIKey}&client_secret=${SECRET}`;

const AnimalTypes = "https://api.petfinder.com/v2/types";
const PetFinderURL = "https://api.petfinder.com/v2";
const PetFinderAuthURL = "https://api.petfinder.com/v2/oauth2/token";

class AdvancedSearchComponent extends React.Component {
    state = {
        typesOfAnimals: [],
        animalParams: 'testing',
        animalType: "dog",
        optionalParams:
            {
                "location": null,
                "distance": null
            }
    };

    componentDidMount() {
        /* Purpose is to dynamically populate typesOfAnimals and get auth token */
        fetch(`${PetFinderAuthURL}`, {
            method: 'POST',
            body: `${COMPRISED}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => response.json())

            //get animal types
            .then(responsejson => {
                fetch(`${AnimalTypes}`, {
                    headers: {
                        'Authorization': responsejson.token_type + ' ' + responsejson.access_token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => response.json())
                    .then(typesOfAnimals => {
                        this.setState({
                                          typesOfAnimals: typesOfAnimals.types
                                      })
                    })
            });
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
                     (event) => {
                         let tempDistance = event.target.value;
                         console.log(event.target.value);
                         if(event.target.value < 10 && event.target.value !== ""){
                             tempDistance = 10;
                         }
                         this.setState(prevState => ({
                             optionalParams: {
                                 ...prevState.optionalParams,
                                 "distance": tempDistance
                             }
                         }))
                     }}/>

                }

                {/* submit button */}
                <Link className="btn btn-primary"
                      to={`/PetGridComponent/search${prepareUrl(this.state.animalType, this.state.optionalParams)}`}
                      onClick={() => prepareUrl(this.state.animalType,
                                                this.state.optionalParams)}>{`Look for ${cutify(
                    this.state.animalType)}`}</Link>
            </div>)

    }
}
/*
The purpose of this function is to make a string that can be put into the URL.
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
export default AdvancedSearchComponent;
