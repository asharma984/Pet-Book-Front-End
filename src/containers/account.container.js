import React, { Component } from 'react';
import PetList from '../components/pet-list.component';
import { Link } from 'react-router-dom';


export default class Account extends Component {
    constructor(props) {
        super(props);
    }


  render() {
    return (
      <div>
          <p>You are a {this.props.userData.user.type}</p>
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
          {this.props.userData.user.type === "pet-owner" &&
           <div className="row">
               <div className="col border-left">
                   <h3>Your Pets</h3>
                   <PetList fromProfile={true}/>
               </div>
               <div className="col border-left border-right">
                   <h3>Your Followed Pets</h3>
                   <PetList
                       fromProfile={true}
                       followed={true}
                   />
               </div>
           </div>
          }

          {this.props.userData.user.type !== "pet-owner" &&
           <div className="row">
               <div className="col border-left border-right">
                   <h3>Pets in your Shelter</h3>
                   <PetList fromProfile={true}/>
               </div>
           </div>
          }
      </div>
    );
  }
}
