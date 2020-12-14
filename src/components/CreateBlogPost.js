import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { BASE_SERVER_URL } from '../urls';

function CreateBlogPost({ match }) {
  const history = useHistory();
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [pet, setPet] = useState({
    userId: '',
    type: '',
    species: '',
    breeds: { primary: '' },
    age: '',
    size: '',
    gender: '',
    name: '',
    description: '',

    photos: [],
    blogpostId: [],
    contact: {
      address: {
        location: {
          city: '',
          state: '',
          email: '',
        },
      },
    },
  });

  useEffect(() => {
      axios
          .get(`${BASE_SERVER_URL}/pets/${match.params.petId}`)
          .then((res) => res.data)
          .then((resPet) => {
            setPet(resPet);
          });
    },[]);

  return (
    <div>
      <h3>Create New Post For {pet.name}</h3>
      <form>
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            required
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Content: </label>
          <textarea
            required
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <DatePicker
            selected={date}
            onSelect={date => setDate(date)}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            value="Create Post"
            className="btn btn-outline-success"
            onClick={() => {
              const blogpost = {
                petId: match.params.petId,
                title,
                type: 'text',
                content,
                date,
              };
              axios
                .post(`${BASE_SERVER_URL}/blogposts/add`, blogpost)
                .then((res) => res)
                            history.replace(
                                `/user/${pet.userId}/profile/${match.params.petId}`,
                            )
            }}
          >Create Post</button>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              history.replace(
                  `/user/${pet.userId}/profile/${match.params.petId}`,
              )
            }
            }
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlogPost;
