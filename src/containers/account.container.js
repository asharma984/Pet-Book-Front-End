import React, {Component} from 'react';
import PetList from "../components/pet-list.component";
import {Link} from "react-router-dom";

export default class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // this is a dummy userID until we add in real users
            // in which case we should get that form the state
            userId: 'Admin024',
        }
    }
    render() {
        return (
            <div>
                <ul>
                    <li>You are: {this.state.userId}</li>
                </ul>
                <p> You are on the Account Component!</p>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to={`/pet/${this.state.userId}`} className="btn btn-outline-success">Add Pet</Link>
                    </li>
                </ul>
                <div className="row">
                    <div className="col">
                        <h3>Your Pets</h3>
                        <PetList/>
                    </div>
                    <div className="col">
                        <h3>Your Followed Pets</h3>
                        <PetList followed={true}/>
                    </div>
                </div>

            </div>
        )
    }
}
