import React, {Component} from 'react';
import BlogPost from "./blogpost";
import axios from "axios";
const serverURL = "https://radiant-ravine-41044.herokuapp.com"

export default class BlogList extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            editingId: "",
            isOwner: this.props.isOwner,

            petId: this.props.petId,
            listOfBlogPosts: [
                {
                    _id: "",
                    petId: "",
                    type: "",
                    content: "",
                    date: ""
                }
            ],

        }
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            axios.get(`${serverURL}/blogposts/pet/${this.state.petId}`)
                .then(res => res.data)
                .then(listOfBlogPosts => {
                    this.setState({
                                      listOfBlogPosts: listOfBlogPosts
                                  })
                });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this._isMounted) {
            axios.get(`${serverURL}/blogposts/pet/${this.state.petId}`)
                .then(res => res.data)
                .then(listOfBlogPosts => {
                    if (this._isMounted) {
                    this.setState({

                                      listOfBlogPosts: listOfBlogPosts
                                  })
                }});
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <span>
                {this.state.listOfBlogPosts.map((blogpost) =>
                                                    <BlogPost isOwner={this.state.isOwner}
                                                              petId={this.state.petId}
                                                              key={blogpost._id}
                                                              blogpost={blogpost}/>
                )
                }
            </span>
        )
    }
}
