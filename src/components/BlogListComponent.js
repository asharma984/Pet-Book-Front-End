import React, { Component } from 'react';
import BlogPost from './BlogPost';
import axios from 'axios';
import {BASE_SERVER_URL} from "../urls";


export default class BlogList extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      editing: false,
      editingId: '',
      listOfBlogPosts: [
        {
          _id: '',
          petId: '',
          type: '',
          content: '',
          date: '',
        },
      ],
    };
  }

refreshList() {
  axios
      .get(`${BASE_SERVER_URL}/blogposts/pet/${this.props.petId}`)
      .then((res) => res.data)
      .then((listOfBlogPosts) => {
        if (this._isMounted) {
          this.setState({
                          listOfBlogPosts: listOfBlogPosts,
                        });
        }
      });
  }

  componentDidMount() {
      axios
        .get(`${BASE_SERVER_URL}/blogposts/pet/${this.props.petId}`)
        .then((res) => res.data)
        .then((listOfBlogPosts) => {
          this.setState({
            listOfBlogPosts: listOfBlogPosts,
          });
        });
    }

  render() {
    return (
      <span>
        {this.state.listOfBlogPosts.map((blogpost) => (
          <BlogPost
            isOwner={this.props.isOwner}
            petId={this.props.petId}
            key={blogpost._id}
            blogpost={blogpost}
            onDelete={this.refreshList}
          />
        ))}
      </span>
    );
  }
}
