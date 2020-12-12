import React, {Component} from 'react';
import axios from "axios";
const serverURL = "http://localhost:5000";

export default class BlogPost extends Component {
    constructor(props) {
        super(props);

        this.editBlogPost = this.editBlogPost.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            editing: false,
            isOwner: this.props.isOwner,

            petId: this.props.petId,
            title: this.props.blogpost.title,
            _id: this.props.blogpost._id,
            type: this.props.blogpost.type,
            content: this.props.blogpost.content,
            date: this.props.blogpost.date,

        }
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

    editBlogPost(e) {
        this.setState({
                          editing: true
                      });
        this.setState({
                          editingId: e
                      });
    };

    submitBlogPost(e) {
        this.setState({
                          editing: false
                      });
        this.setState({
                          editingId: ""
                      });
        this.onSubmit(e)
    };

    deleteBlogPost(e) {
        axios.delete(`${serverURL}/blogposts/${e}`)
            .then(res => console.log(res));

    }
    onSubmit(e) {
        const blogpost = {
            petId: this.state.petId,
            title: this.state.title,
            type: this.state.type,
            content: this.state.content,
            date: this.state.date
        };
        axios.put(`${serverURL}/blogposts/update/${e}`, blogpost)
            .then(res => console.log(res));
    }


    render() {
        return (
            <span>
                {this.state.isOwner &&
                 <div className="card">
                     <div className="card-header">
                         <span className="float-right">{this.state.date.split('T')[0]}</span>
                         {!this.state.editing &&
                          <span>
                            <span className="float-left"><h5>{this.state.title}</h5></span>
                              <button className="float-right btn btn-outline-warning"
                                      value={this.state._id}
                                      onClick={() => {
                                          this.editBlogPost(
                                              this.state._id)
                                      }}>Edit</button>
                          </span>
                         }

                         {this.state.editing &&
                          <span>
                              <input className="float-left"
                                     onChange={this.onChangeTitle}
                                     defaultValue={this.state.title}/>

                                     <button className="float-right"
                                             value={this.state._id}
                                             onClick={() => {
                                                 this.submitBlogPost(this.state._id)
                                             }}>Finished</button>

                                     <button className="float-right"
                                             value={this.state._id}
                                             onClick={() => {
                                                 this.deleteBlogPost(this.state._id)
                                             }}>Delete</button>

                          </span>
                         }

                     </div>

                     {!this.state.editing &&
                      <div className="card-body">
                          <p className="card-text">{this.state.content}</p>
                      </div>
                     }
                     {this.state.editing &&
                      <div className="card-body">
                          <textarea className="card-text"
                                    defaultValue={this.state.content}
                                    onChange={this.onChangeContent}/>
                      </div>
                     }
                 </div>
                }

                {!this.state.isOwner &&
                 <div className="card">
                     <div className="card-header">
                                                            <span
                                                                className="float-left"><h5>{this.state.title}</h5></span>
                         <h5 className="float-left"
                                defaultValue={this.state.title}/>
                         <span
                             className="float-right">{this.state.date.split(
                             'T')[0]}</span>
                     </div>
                     <div className="card-body">
                         <p className="card-text">{this.state.content}</p>
                     </div>
                 </div>
                }
            </span>
        )
    }
}
