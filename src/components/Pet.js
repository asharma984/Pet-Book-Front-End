import React, { Component } from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

class Pet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: props.animal,
    };
  }

  render() {
    return (
      <div className="container-fluid" style={{ background: '#EAE7DC' }}>
          {this.props.animal.animal.photos &&
            <Zoom scale={0.2}>
                {this.state.animal.photos.map((each, index) => (
                    <div key={index} style={{width: "100%"}} className='row'>
                        <div className={"col"}>
                            <img style={{ objectFit: "cover", width: "100%" }} src={each.full} />
                        </div>
                        <div className={"col"}>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <h1>{this.state.animal.name}</h1>
                                    <h2 style={{ padding: '1rem 2rem', color: '#AC3B61' }}>
                                        Age: {this.state.animal.age}
                                    </h2>
                                    <h2 style={{ padding: '1rem 2rem', color: '#123C69' }}>
                                        Species: {this.state.animal.species}
                                    </h2>
                                    <a href={this.state.animal.url}>
                                        <h2>View full profile</h2>
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <h3 style={{ padding: '1rem 2rem', color: '#123C69' }}>
                                        Description: {this.state.animal.description}
                                    </h3>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </Zoom>
          }

          {!this.props.animal.animal.photos &&
                    <div style={{width: "100%"}} className='row'>
                        <div className={"col"}>
                            <img style={{ objectFit: "cover", width: "100%" }} src="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg" />
                        </div>
                        <div className={"col"}>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <h1>{this.props.animal.animal.name}</h1>
                                    <h2 style={{ padding: '1rem 2rem', color: '#AC3B61' }}>
                                        Age: {this.props.animal.animal.age}
                                    </h2>
                                    <h2 style={{ padding: '1rem 2rem', color: '#123C69' }}>
                                        Species: {this.props.animal.animal.species}
                                    </h2>
                                    <a href={this.props.animal.animal.url}>
                                        <h2>View full profile</h2>
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <h3 style={{ padding: '1rem 2rem', color: '#123C69' }}>
                                        Description: {this.props.animal.animal.description}
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

export default Pet;
