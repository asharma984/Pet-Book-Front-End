import React, {Component} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios";
const serverURL = "http://localhost:5000"

export default class CreateBlogPost extends Component {
    constructor(props) {
        super(props);

        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            petId: this.props.match.params.petId,
            title: '',
            date: new Date(),
            content: '',
            type: 'text',

            pet : {
                userId: "",
                type: "",
                species: "",
                breeds: {primary:""} ,
                age: "",
                size: "",
                gender: "",
                name: "",
                description: "",

                // since they are only making one photo
                // we can just create an array with the photo in it
                photos: [],
                blogpostId: [],
                contact: {
                    address: {
                        location: {
                            city: "",
                            state: ""
                        }
                    }
                }
            }
        }
    }

    componentDidMount() {
        axios.get(`${serverURL}/pets/${this.state.petId}`)
            .then(res => res.data)
            .then(pet =>{
                this.setState({
                                  pet: pet
                              })
            });
    }

    onChangeContent(e) {
        this.setState({
                          content: e.target.value
                      });
    }

    onChangeTitle(e) {
        this.setState({
                          title: e.target.value
                      });
    }
    onChangeDate(date) {
        this.setState({
                          date: date
                      });
    }

    onSubmit(e) {
        e.preventDefault();
        const blogpost = {
            petId: this.state.petId,
            title: this.state.title,
            type: this.state.type,
            content: this.state.content,
            date: this.state.date
        };

        axios.post(`${serverURL}/blogposts/add`, blogpost)
            .then(res => console.log(res));
        // this sends ups back to the list of exercises(this might be unnecessary
        window.location=`/profile/${this.state.petId}`
    }

    render() {
        return (
            <div>
                <h3>Create New Post For {this.state.pet.name}</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.title}
                               onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content: </label>
                        <textarea
                               required
                               className="form-control"
                               value={this.state.content}
                               onChange={this.onChangeContent}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Post" className="btn btn-primary"/>
                        <a className='btn btn-danger' href={`/profile/${this.state.petId}`}>Go Back</a>
                    </div>
                </form>
            </div>
        )
    }
}
