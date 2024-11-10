import React, { useState, createContext, useContext } from "react";
const BookContext = createContext();
import axiosInstance from "../config/axios";

export const useBooks = () => {
  return useContext(BookContext);
};

// const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [scienceBooks, setScienceBooks] = useState([]);
  const [inspirationalBooks, setInspirationalBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getAllBooks = () => {
    setLoading(true);
    axiosInstance
      .get("/books")
      .then((res) => {
        // console.log(res.data.data);
        setBooks(res.data.data.books);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
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

  const getBookDetails = (id) => {
    setLoading(true);
    axiosInstance
      .get("/books/" + id)
      .then((res) => {
        // console.log(res.data.data);
        setBookDetails(res.data.data.book);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const values = {
    books,
    loading,
    bookDetails,
    scienceBooks,
    getScienceBooks,
    inspirationalBooks,
    getInspirationalBooks,
    getBookDetails,
    getAllBooks,
  };
  return <BookContext.Provider value={values}>{children}</BookContext.Provider>;
};

export default BookProvider;
