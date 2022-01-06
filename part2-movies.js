// Part Two - Movies App!
/** Build an application that uses jQuery to do the following: */
// Contains a form with two inputs for a title and rating along with a button to submit the form.
// When the form is submitted, capture the values for each of the inputs and append them to the DOM along with a button to remove each title and rating from the DOM.

// id to keep track of which element to remove (this would be better not in global scope)
let currentId = 0;

// list of all of movies in memory for sorting / repainting
let moviesList = [];

$(() => {
  // when you click the delete button, remove the closest parent tr

  $('#rate-movie-form').on('submit', e => {
    e.preventDefault();
    const title = $('#textInput').val();
    const rating = $('#ratingInput').val();

    const movieData = { title, rating, currentId };
    const addToList = combineData(movieData);

    currentId++;
    moviesList.push(movieData);

    $('#movie-table-body').append(addToList);
    $('#rate-movie-form').trigger('reset');
  });

  // when the delete button is clicked, remove the closest parent tr and remove from the array of movies
  $('#movie-table-body').on('click', 'button', e => {
    // find the index where this movie is
    let indexToRemoveAt = moviesList.findIndex(
      movie => movie.currentId === +$(e.target).data('deleteId')
    );

    // remove it from the array of movies
    moviesList.splice(indexToRemoveAt, 1);

    // remove it from the DOM
    $(e.target).closest('tr').remove();
  });

  // when an arrow is clicked,
  $('.fas').on('click', function (e) {
    // figure out what direction we are sorting and the key to sort by
    let direction = $(e.target).hasClass('fa-sort-down') ? 'down' : 'up';
    let keyToSortBy = $(e.target).attr('id');
    let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

    // empty the table
    $('#movie-table-body').empty();

    // loop over our object of sortedMovies and append a new row
    for (let movie of sortedMovies) {
      const HTMLtoAppend = combineData(movie);
      $('#movie-table-body').append(HTMLtoAppend);
    }

    // toggle the arrow
    $(e.target).toggleClass('fa-sort-down');
    $(e.target).toggleClass('fa-sort-up');
  });
});

/* accepts an array of objects and a key and sorts by that key */
sortBy = (array, keyToSortBy, direction) => {
  return array.sort(function (a, b) {
    // since rating is a number, we have to convert these strings to numbers
    if (keyToSortBy === 'rating') {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === 'up' ? 1 : -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === 'up' ? -1 : 1;
    }
    return 0;
  });
};

/* createMovieDataHTML accepts an object with title and rating keys and returns a string of HTML */
combineData = data => {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    <tr>
  `;
};

/* Further Study */
// Ensure that the rating of a movie can only be between 0 and 10.
// Ensure that a title has at least 2 characters in it.
// Allow users to sort alphabetically by the title of the movie or by the rating of the movie from lowest to highest and vice versa.
