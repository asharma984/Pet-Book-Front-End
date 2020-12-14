import React, {Component, useState} from 'react';
import axios from 'axios';
import {BASE_SERVER_URL} from "../urls";

function Blog_Post(props) {

  const [editing, setEditing] = useState(false)
  const [isOwner, setIsOwner] = useState(props.isOwner)
  const [petId, setPetId] = useState(props.petId)
  const [title, setTitle] = useState(props.blogpost.title)
  const [_id, set_id] = useState(props.blogpost._id)
  const [type, setType] = useState(props.blogpost.type)
  const [date, setDate] = useState(props.blogpost.date)
  const [content, setContent] = useState(props.blogpost.content)


return (
    <span>
        {props.isOwner && (
            <div className="card">
              <div className="card-header">
              <span className="float-right">
                {date.split('T')[0]}
              </span>
                {!editing && (
                    <span>
                  <span className="float-left">
                    <h5>{title}</h5>
                  </span>
                  <button
                      className="float-right btn btn-outline-warning"
                      value={_id}
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
                      className="float-right"
                      value={_id}
                      onClick={() => {
                                        setEditing(false);
                        const blogpost = {
                          petId,
                          title,
                          type,
                          content,
                          date,
                        };
                        axios
                            .put(`${BASE_SERVER_URL}/blogposts/update/${_id}`, blogpost)
                            .then((res) => console.log(res));

                      }}
                  >
                    Finished
                  </button>

                  <button
                      className="float-right"
                      value={_id}
                      onClick={(e) => {
                        axios.delete(`${BASE_SERVER_URL}/blogposts/${_id}`).then((res) => {
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
                {date.split('T')[0]}
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
export default Blog_Post