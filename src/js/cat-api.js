const KEY =
  'live_fdUmRSVKk3ZMvlbIOrvlg19BfDZlbr3aO4J8izvDzoJT1DATpEaKyq1EQ33vzRdh';
const URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return fetch(`${URL}/breeds?api_key=${KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${URL}/images/search?breed_ids=${breedId}&api_key=${KEY}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}
