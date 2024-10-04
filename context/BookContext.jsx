import { View, Text } from "react-native";
import React, { useState, createContext, useContext } from "react";
const BookContext = createContext();

export const useBooks = () => {
  return useContext(BookContext);
};

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [scienceBooks, setScienceBooks] = useState([]);
  const [inspirationalBooks, setInspirationalBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getBooks = () => {
    setLoading(true);
    fetch("https://openlibrary.org/subjects/general.json?ebooks=true")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // console.log(data.works);
        setBooks(data.works?.slice(0, 10));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const getScienceBooks = () => {
    setLoading(true);
    fetch("https://openlibrary.org/subjects/science.json?ebooks=true")
      .then((response) => response.json())
      .then((data) => {
        setScienceBooks(data.works?.slice(0, 10));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const getInspirationalBooks = () => {
    setLoading(true);
    fetch("https://openlibrary.org/subjects/inspiration.json?ebooks=true")
      .then((response) => response.json())
      .then((data) => {
        setInspirationalBooks(data.works?.slice(0, 10));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const getBookDetails = (query) => {
    setLoading(true);
    fetch(`https://openlibrary.org/search.json?title=${query}?ebooks=true`)
      .then((response) => response.json())
      .then((data) => setBookDetails(data.docs[0]))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const values = {
    books,
    loading,
    getBooks,
    bookDetails,
    scienceBooks,
    getScienceBooks,
    inspirationalBooks,
    getInspirationalBooks,
    getBookDetails,
  };
  return <BookContext.Provider value={values}>{children}</BookContext.Provider>;
};

export default BookProvider;
