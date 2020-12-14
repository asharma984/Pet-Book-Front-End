import React, { useState} from 'react';
import axios from 'axios';
import {BASE_SERVER_URL} from "../urls";

function PostBlog(props) {

  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(props.blogpost.title)
  const [content, setContent] = useState(props.blogpost.content)


return (
    <span>
        {props.isOwner && (
            <div className="card">
              <div className="card-header">
              <span className="float-right">
                {props.blogpost.date.split('T')[0]}
              </span>
                {!editing && (
                    <span>
                  <span className="float-left">
                    <h5>{title}</h5>
                  </span>
                  <button
                      className="float-right btn btn-outline-warning"
                      value={props.blogpost._id}
                      onClick={() => {
                        setEditing(true)
                      }}
                  >
                    Edit
                  </button>
                </span>
                )}

                {editing && (
                    <span>
                  <input
                      className="float-left"
                      value={title}
                      onChange={(e) => {setTitle(e.target.value)}}
                      defaultValue={title}
                  />

                  <button
                      className="float-right btn-outline-success"
                      value={props.blogpost._id}
                      onClick={() => {
                                        setEditing(false);
                        const blogpost = {
                          petId:props.petId,
                          title,
                          type: props.blogpost.type,
                          content,
                          date: props.blogpost.date,
                        };
                        axios
                            .put(`${BASE_SERVER_URL}/blogposts/update/${props.blogpost._id}`, blogpost)
                            .then((res) => console.log(res));

                      }}
                  >
                    Finished
                  </button>

                  <button
                      className="float-right btn-outline-danger"
                      value={props.blogpost._id}
                      onClick={(e) => {
                        axios.delete(`${BASE_SERVER_URL}/blogposts/${props.blogpost._id}`).then((res) => {
                          console.log(res);
                          props.onDelete();
                        });
                      }}
                  >
                    Delete
                  </button>
                </span>
                )}
              </div>

              {!editing && (
                  <div className="card-body">
                    <p className="card-text">{content}</p>
                  </div>
              )}
              {editing && (
                  <div className="card-body">
                <textarea
                    className="card-text"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value)
                    }}
                />
                  </div>
              )}
            </div>
        )}

      {!props.isOwner && (
          <div className="card">
            <div className="card-header">
              <span className="float-left">
                <h5>{title}</h5>
              </span>
              <span className="float-right">
                {props.blogpost.date.split('T')[0]}
              </span>
            </div>
            <div className="card-body">
              <p className="card-text">{content}</p>
            </div>
          </div>
      )}
      </span>
);
}
export default PostBlog