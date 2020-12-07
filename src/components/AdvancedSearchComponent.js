import React from 'react';
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
                      to={`/PetGridComponent/search${prepareUrl(this.state.animalType, this.state.optionalParams)}`}
                      onClick={() => prepareUrl(this.state.animalType,
                                                this.state.optionalParams)}>{`Look for ${cutify(
                    this.state.animalType)}`}</Link>
            </div>)

    }
}
/*
The purpose of this function is to make a string that can be put into the URL.
TODO DO we want this to not have the null? if so we can reuse the builder function from petGrid
 */
const prepareUrl = (animalType, optionalParams) => {
    const realAnimalType = handleClick(animalType);
    const {location, distance} = optionalParams;

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