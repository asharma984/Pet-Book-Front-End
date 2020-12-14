import React, { Component } from 'react';
import PetList from '../components/pet-list.component';
import { Link } from 'react-router-dom';
import axios from "axios";
import {BASE_SERVER_URL} from "../urls";


export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteProfile: false
        };

        this.deleteUser = this.deleteUser.bind(this);
        this.clearBlogPosts = this.clearBlogPosts.bind(this);
    }

    deleteUser() {
        axios
            .get(`${BASE_SERVER_URL}/pets/user/${this.props.userData.user.id}`)
            .then((res) => res.data)
            .then((listOfAnimals) => {
                if(listOfAnimals.length > 0) {
                    listOfAnimals.map((pet) => {
                        this.clearBlogPosts(pet)
                    })
                }
            }).then(
        axios
            .delete(`${BASE_SERVER_URL}/users/delete`, {
                headers: {
                    Authorization: this.props.userData.token
                },
                data: {
                    source: this.props.userData.user
                }
            }).then( res => {
            window.location.replace('/')
        })
        )
    }

    clearBlogPosts (pet){
            pet.blogpostId.forEach((post) => {
                axios
                    .delete(`${BASE_SERVER_URL}/blogposts/${post}`)
                    .then((res) => console.log(res));
            })
                axios
                    .delete(`${BASE_SERVER_URL}/pets/${pet._id}`)
                    .then((res) => (res.json()))
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

              {!this.state.deleteProfile &&
               <span className="btn btn-outline-danger"
                     onClick={() => {
                         this.setState({
                                           deleteProfile: true
                                       })
                     }}>
                  Delete Profile
              </span>
              }
              {this.state.deleteProfile &&
               <span className="btn btn-outline-danger"
                     onClick={this.deleteUser}>
                  Confirm Delete
              </span>
              }
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
