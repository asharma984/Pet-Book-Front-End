import './App.css';
import React from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';

// import components
import AdvancedSearchComponent from './components/AdvancedSearchComponent';
import PetGridComponent from './components/PetGridComponent';
import PetContainer from './components/PetContainer'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>

                <div className="App container-fluid">
                    {/* We are using a link here so we can get back to the main page whenever we
         click this. Probably want to update this to the user's homepage when we go live */}
                    <h1><Link to="/">Pet Search!</Link></h1>
                    {/* we are loading the AdvancedSearchComponent
                     since there's no 'landing page' in this incarnation */}
                    <AdvancedSearchComponent/>

                    {/* Routes for Navigation*/}
                    <Route path="/AdvancedSearchComponent" exact
                           component={AdvancedSearchComponent}/>
                    <Route path={["/PetGridComponent/search"]} exact component={PetGridComponent}/>
                    <Route path="/PetGridComponent/:animalType/:animalId" exact
                           component={PetContainer}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
