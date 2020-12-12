import React from 'react';

class PetProfileComponent extends React.Component {
  state = {
    userId: '',
    type: '',
    species: '',
    breeds: {},
    age: '',
    size: '',
    gender: '',
    name: '',
    description: '',
    photos: [],
    blogpostid: [],
    contact: {},
  };

  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return <div>Hello World!</div>;
  }
}
export default PetProfileComponent;
