const createTestServer = require('../../utils/testServer');
const queries = require('./author.queries');

const authorObject = {
  id: "author1",
  name: "John Doe",
  description: "Simple text",
  topGenres: []
};

describe('graphql: Author type', () => {
  describe('getAuthor query', () => {
    test('with input', async () => {
      const input = { id: authorObject.id };
      const loader = jest.fn((id) => authorObject);
      const { query } = createTestServer({
        loaders: { author: { load: loader } }
      });
      const { data, errors } = await query({
        query: queries.GET_AUTHOR,
        variables: input
      });

      expect(errors).toBeUndefined();
      expect(loader).toBeCalledWith(input.id);
      expect(data).toMatchSnapshot();
    });

    test('without input', async () => {
      const loader = jest.fn((id) => authorObject);
      const { query } = createTestServer({
        loaders: { author: { load: loader } }
      });
      const { data, errors } = await query({
        query: queries.GET_AUTHOR,
      });

      expect(errors).toHaveLength(1);
      expect(data).toBeUndefined();
    });
  });

  describe('getAuthors query', () => {
    test('with input', async () => {
      const input = { limit: 1, page: 1, search: "test" };
      const offset = input.limit * input.page;

      const getList = jest.fn((limit, offset, search) => [authorObject]);
      const { query } = createTestServer({
        db: { author: { getList } }
      });
      const { data, errors } = await query({
        query: queries.GET_AUTHORS,
        variables: input
      });

      expect(errors).toBeUndefined();
      expect(getList).toBeCalledWith(input.limit, offset, input.search);
      expect(data).toMatchSnapshot();
    });

    test('without input', async () => {
      const getList = jest.fn((limit, offset, search) => [authorObject]);
      const { query } = createTestServer({
        db: { author: { getList } }
      });
      const { data, errors } = await query({
        query: queries.GET_AUTHORS
      });

      expect(errors).toBeUndefined();
      expect(getList).toBeCalledWith(0, 0, undefined);
      expect(data).toMatchSnapshot();
    });
  });

  describe('addAuthor mutation', () => {
    test('with input', async () => {
      const add = jest.fn((object) => authorObject);
      const { query } = createTestServer({
        db: { author: { add } }
      });
      const { data, errors } = await query({
        query: queries.ADD_AUTHOR,
        variables: authorObject
      });

      expect(errors).toBeUndefined();
      expect(add).toBeCalledWith({
        name: authorObject.name,
        description: authorObject.description,
        topGenres: authorObject.topGenres
      });
      expect(data).toMatchSnapshot();
    });

    test('without input', async () => {
      const add = jest.fn((object) => authorObject);
      const { query } = createTestServer({
        db: { author: { add } }
      });
      const { data, errors } = await query({
        query: queries.ADD_AUTHOR
      });

      expect(errors).toHaveLength(2);
      expect(data).toBeUndefined();
    });
  });

  describe('editAuthor mutation', () => {
    test('with input', async () => {
      const { id, ...rest } = authorObject;
      const edit = jest.fn((object) => authorObject);
      const { query } = createTestServer({
        db: { author: { edit } }
      });
      const { data, errors } = await query({
        query: queries.EDIT_AUTHOR,
        variables: authorObject
      });

      expect(errors).toBeUndefined();
      expect(edit).toBeCalledWith(id, rest);
      expect(data).toMatchSnapshot();
    });

    test('without input', async () => {
      const edit = jest.fn((object) => authorObject);
      const { query } = createTestServer({
        db: { author: { edit } }
      });
      const { data, errors } = await query({
        query: queries.EDIT_AUTHOR
      });

      expect(errors).toHaveLength(1);
      expect(data).toBeUndefined();
    });
  });

  describe('editAuthorGenres mutation', () => {
    test('with input', async () => {
      const { id, topGenres } = authorObject;
      const editGenres = jest.fn((object) => authorObject);
      const { query } = createTestServer({
        db: { author: { editGenres } }
      });
      const { data, errors } = await query({
        query: queries.EDIT_AUTHOR_GENRES,
        variables: { id, topGenres }
      });

      expect(errors).toBeUndefined();
      expect(editGenres).toBeCalledWith(id, topGenres);
      expect(data).toMatchSnapshot();
    });

    test('without input', async () => {
      const editGenres = jest.fn((object) => authorObject);
      const { query } = createTestServer({
        db: { author: { editGenres } }
      });
      const { data, errors } = await query({
        query: queries.EDIT_AUTHOR_GENRES
      });

      expect(errors).toHaveLength(2);
      expect(data).toBeUndefined();
    });
  });

  describe('fields', () => {
    describe('books', () => {
      test('with input', async () => {
        const input = {
          id: authorObject.id,
          limit: 1,
          page: 1,
          genres: [],
          sort: {
            sortField: "date",
            sortValue: -1
          }
        };
        const offset = input.page * input.limit;
        const getAuthor = jest.fn(() => authorObject);
        const getList = jest.fn(() => []);
        const { query } = createTestServer({
          loaders: { author: { load: getAuthor } },
          db: { book: { getList } }
        });
        const { data, errors } = await query({
          query: queries.AUTHOR_BOOKS_FIELD,
          variables: input
        });

        expect(errors).toBeUndefined();
        expect(getList).toBeCalledWith({
          limit: input.limit,
          offset,
          authorIds: [input.id],
          genreIds: input.genres,
          sortField: input.sort.sortField,
          sortValue: input.sort.sortValue
        });
        expect(data).toMatchSnapshot();
      });

      test('without input', async () => {
        const getAuthor = jest.fn(() => authorObject);
        const getList = jest.fn(() => []);
        const { query } = createTestServer({
          loaders: { author: { load: getAuthor } },
          db: { book: { getList } }
        });
        const { data, errors } = await query({
          query: queries.AUTHOR_BOOKS_FIELD
        });

        expect(errors).toHaveLength(1);
        expect(data).toBeUndefined();
      });
    });

    describe('bookCounter', () => {
      test('with input', async () => {
        const input = { id: authorObject.id };
        const getAuthor = jest.fn(() => authorObject);
        const getAuthorBooks = jest.fn(() => []);
        const { query } = createTestServer({
          loaders: {
            author: { load: getAuthor },
            authorBooks: { load: getAuthorBooks }
          }
        });
        const { data, errors } = await query({
          query: queries.AUTHOR_BOOK_COUNTER_FIELD,
          variables: input
        });

        expect(errors).toBeUndefined();
        expect(getAuthorBooks).toBeCalledWith(input.id);
        expect(data).toMatchSnapshot();
      });

      test('without input', async () => {
        const getAuthor = jest.fn(() => authorObject);
        const getAuthorBooks = jest.fn(() => []);
        const { query } = createTestServer({
          loaders: {
            author: { load: getAuthor },
            authorBooks: { load: getAuthorBooks }
          }
        });
        const { data, errors } = await query({
          query: queries.AUTHOR_BOOK_COUNTER_FIELD
        });

        expect(errors).toHaveLength(1);
        expect(data).toBeUndefined();
      });
    });

    describe('topGenres', () => {
      test('with input', async () => {
        const input = { id: authorObject.id };
        const output = { ...authorObject, topGenres: ["test"] };
        const getAuthor = jest.fn(() => output);
        const getGenresByIds = jest.fn(() => []);
        const { query } = createTestServer({
          loaders: { author: { load: getAuthor } },
          db: { genre: { getGenresByIds } }
        });
        const { data, errors } = await query({
          query: queries.AUTHOR_TOP_GENRES_FIELD,
          variables: input
        });

        expect(errors).toBeUndefined();
        expect(getGenresByIds).toBeCalledWith(output.topGenres);
        expect(data).toMatchSnapshot();
      });

      test('without input', async () => {
        const { query } = createTestServer({
          loaders: { author: { load: () => authorObject } },
          db: { genre: { getGenresByIds: () => [] } }
        });
        const { data, errors } = await query({
          query: queries.AUTHOR_TOP_GENRES_FIELD
        });

        expect(errors).toHaveLength(1);
        expect(data).toBeUndefined();
      });
    });
  });
});
