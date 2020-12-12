const APIKey = 'hHU1MtX7PMLlBnjaE16jR77Kv5OVX4SVmWWnvKCM5SKILHSYgi';
const SECRET = 'FhaZVEb2BQ3ZQ8C9Xt27uaPEuw1PlJ4oFmBjVODX';

const COMPRISED = `grant_type=client_credentials&client_id=${APIKey}&client_secret=${SECRET}`;

const AnimalTypes = 'https://api.petfinder.com/v2/types';
const PetFinderURL = 'https://api.petfinder.com/v2';
const PetFinderAuthURL = 'https://api.petfinder.com/v2/oauth2/token';

let animalTypes;
// old default data
let data = {
  token_type: 'Bearer',
  expires_in: 3600,
  access_token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJoSFUxTXRYN1BNTGxCbmphRTE2alI3N0t2NU9WWDRTVm1XV252S0NNNVNLSUxIU1lnaSIsImp0aSI6IjZmY2NiMDljYmQ5YjQ3ZmRhZDM3NzA4Zjk2ZjRiMjU5MjI3NmRjMjAxNDg5YWEyZDRlNDk2MTlhMzIzMzQ5NjgzMmY5ZTY0NzVlYTA1NDU4IiwiaWF0IjoxNjA0MjU2NzU5LCJuYmYiOjE2MDQyNTY3NTksImV4cCI6MTYwNDI2MDM1OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.UC4q9OWRtvj4bufRr0Lk10vdiix-RxNksRiD9RuOcpNwALU45xRE3Fm_YaP0bPYVf2_2xvxA3cjfZ_pmxt2l6SUtiLlBv4Z-x8wd8QVrZz7m7KoJuOe9NtZGhZKpMtuipCLInto83vVKs_vK0hItRjEfp4fNaT7pqgZYZQBTGD82TgZ9hiETSClqsW4HcGl-ENlFwhkU_nHN9AGXhxGC42FFy_xrueBp4RuwumsHSRx23sZm3vYhd60bi18D1v7jMk2TDYmN6pOtVtdJCZfyY4f1AQJQ7trcfLjzO75ZYJ95yhVI7ucw86Zf8q725ghKqoVgzem7VB1rFuFTbM5KIg',
};

/*
The purpose of this function is to update the access token and the expires_in.
 */
export const updateToken = () => {
  fetch(`${PetFinderAuthURL}`, {
    method: 'POST',
    body: `${COMPRISED}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((response) => response.json());
};

/*
The purpose of this function is to get all the animal type and put them into the animalTypes JSON
 */
export const getAnimalTypes = () => {
  // get auth token
  fetch(`${PetFinderAuthURL}`, {
    method: 'POST',
    body: `${COMPRISED}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => response.json())

    //get animal types
    .then((responsejson) => {
      fetch(`${AnimalTypes}`, {
        headers: {
          Authorization:
            responsejson.token_type + ' ' + responsejson.access_token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => response.json());
    });
};

/*
The purpose of this function is take an animal type and return 20.
 */
export const specificAnimalTypeDefault = (animalType) => {
  // get auth token
  fetch(`${PetFinderAuthURL}`, {
    method: 'POST',
    body: `${COMPRISED}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => response.json())

    //get animal types
    .then((responsejson) => {
      fetch(`${PetFinderURL}/animals?type=${animalType}`, {
        headers: {
          Authorization:
            responsejson.token_type + ' ' + responsejson.access_token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => response.json());
    });
};
