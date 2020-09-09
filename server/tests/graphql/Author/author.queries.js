const gql = require('graphql-tag');

const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    getAuthor(input: {id: $id}) {
      id
      name
      description
    }
  }
`;

const GET_AUTHORS = gql`
  query GetAuthors($limit: Int, $page: Int, $search: String) {
    getAuthors(input: {limit: $limit, page: $page, search: $search}) {
      id
      name
      description
    }
  }
`;

const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!, $description: String!, $topGenres: [ID]) {
    addAuthor(input: {name: $name, description: $description, topGenres: $topGenres}) {
      id
      name
      description
    }
  }
`;

const EDIT_AUTHOR = gql`
mutation EditAuthor($id: ID!, $name: String, $description: String, $topGenres: [ID]) {
  editAuthor(input: {id: $id, name: $name, description: $description, topGenres: $topGenres}) {
    id
    name
    description
  }
}
`;

const EDIT_AUTHOR_GENRES = gql`
mutation EditAuthorGenres($id: ID!, $topGenres: [ID]!) {
  editAuthorGenres(input: {id: $id, topGenres: $topGenres}) {
    id
    name
    description
  }
}
`;

const AUTHOR_BOOKS_FIELD = gql`
  query GetAuthor($id: ID!, $limit: Int, $page: Int, $genres: [ID], $sort: SortBooksInput) {
    getAuthor(input: {id: $id}) {
      books(input: {limit: $limit, page: $page, genres: $genres, sort: $sort}) {
        id
      }
    }
  }
`;

const AUTHOR_BOOK_COUNTER_FIELD = gql`
  query GetAuthor($id: ID!) {
    getAuthor(input: {id: $id}) {
      bookCounter
    }
  }
`;

const AUTHOR_TOP_GENRES_FIELD = gql`
  query GetAuthor($id: ID!) {
    getAuthor(input: {id: $id}) {
      topGenres {
        id
      }
    }
  }
`;

module.exports = {
  GET_AUTHOR,
  GET_AUTHORS,
  ADD_AUTHOR,
  EDIT_AUTHOR,
  EDIT_AUTHOR_GENRES,
  AUTHOR_BOOKS_FIELD,
  AUTHOR_BOOK_COUNTER_FIELD,
  AUTHOR_TOP_GENRES_FIELD
};