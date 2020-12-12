import './App.css';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

// import components
import Account from "./containers/account.container";
import PetProfile from "./containers/pet-profile.container";
import CreateBlogPost from "./components/create-blogpost.component";
import CreatePet from "./components/create-pet.component";
import AdvancedSearchComponent from "./components/AdvancedSearchComponent";
import PetGridComponent from "./components/PetGridComponent";
import PetContainer from "./components/PetContainer";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App container-fluid">

                    <br/>
                    <Route path="/" exact component={Account}/>
                    <Route path="user/:userId/profile/:petId" exact component={PetProfile}/>
                    <Route path="/blog/:petId" exact component={CreateBlogPost}/>
                    <Route path="/pet/:userId" exact component={CreatePet}/>
                    <Route path="/AdvancedSearchComponent" exact component={AdvancedSearchComponent}/>
                    <Route path={["/PetGridComponent/search"]} exact component={PetGridComponent}/>
                    <Route path="/PetGridComponent/:animalType/:animalId" exact component={PetContainer}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
