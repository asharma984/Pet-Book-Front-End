import React, { Component } from 'react';
import PetList from '../components/pet-list.component';
import { Link } from 'react-router-dom';

export default class Account extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>You are: {this.props.userData.user.id}</li>
        </ul>
        <p> You are on the Account Component!</p>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              to={`/pet/${this.props.userData.user.id}`}
              className="btn btn-outline-success"
            >
              Add Pet
            </Link>
          </li>
        </ul>
        <div className="row">
          <div className="col">
            <h3>Your Pets</h3>
            <PetList fromProfile={true}/>
          </div>
          <div className="col">
            <h3>Your Followed Pets</h3>
            <PetList
                fromProfile={true}
                followed={true} />
          </div>
        </div>
      </div>
    );
  }
}
