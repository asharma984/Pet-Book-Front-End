import React, { Component } from 'react';
import axios from "axios";
import {BASE_SERVER_URL} from "../urls";

class petContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 49667623,
      pet:{
        userId: '',
        type: '',
        species: '',
        breeds: { primary: '' },
        age: '',
        size: '',
        gender: '',
        name: '',
        description: '',
adoptable: false,
        photos: [],
        blogpostId: [],
        contact: {
          address: {
            location: {
              city: '',
              state: '',
            },
          },
        },
      }
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {

    axios
        .get(`${BASE_SERVER_URL}/api/petfinder/${this.props.match.params.animalId}`)
        .then((res) => res.data)
        .then((resPet) => {
          this.setState({
            pet: resPet.animal
                        })
        });

  }

  render() {
    return (
        <div className="container-fluid" style={{ background: '#EAE7DC' }}>
          {this.state.pet.photos.length>0 &&
                 <div style={{width: "100%"}} className='row'>
                   <div className={"col"}>
                     <img alt="" style={{ objectFit: "cover", width: "100%" }} src={this.state.pet.photos[0].full} />
                   </div>
                   <div className="col">
                     <ul className="list-group">
                       <li className="list-group-item">
                         <h1>{this.state.pet.name}</h1>
                         <h2 style={{ padding: '1rem 2rem', color: '#AC3B61' }}>
                           Age: {this.state.pet.age}
                         </h2>
                         <h2 style={{ padding: '1rem 2rem', color: '#123C69' }}>
                           Species: {this.state.pet.species}
                         </h2>
                         <a href={this.state.pet.url}>
                           <h2>View full profile</h2>
                         </a>
                       </li>
                       <li className="list-group-item">
                         <h3 style={{ padding: '1rem 2rem', color: '#123C69' }}>
                           Description: {this.state.pet.description}
                         </h3>
                       </li>
                     </ul>
                   </div>
                 </div>
             }
          }

          {this.state.pet.photos.length===0 &&
           <div style={{width: "100%"}} className='row'>
             <div className={"col"}>
               <img alt="" style={{ objectFit: "cover", width: "100%" }} src="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg" />
             </div>
             <div className={"col"}>
               <ul className="list-group">
                 <li className="list-group-item">
                   <h1>{this.state.pet.name}</h1>
                   <h2 style={{ padding: '1rem 2rem', color: '#AC3B61' }}>
                     Age: {this.state.pet.age}
                   </h2>
                   <h2 style={{ padding: '1rem 2rem', color: '#123C69' }}>
                     Species: {this.state.pet.species}
                   </h2>
                   <a href={this.state.pet.url}>
                     <h2>View full profile</h2>
                   </a>
                 </li>
                 <li className="list-group-item">
                   <h3 style={{ padding: '1rem 2rem', color: '#123C69' }}>
                     Description: {this.state.pet.description}
                   </h3>
                 </li>
               </ul>
             </div>
           </div>
          }
        </div>
    );
  }
}
export default petContainer;
