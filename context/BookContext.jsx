import React, { useState, createContext, useContext } from "react";
const BookContext = createContext();
import axiosInstance from "../config/axios";

export const useBooks = () => {
  return useContext(BookContext);
};

// const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [likeMessage, setLikeMessage] = useState("");

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

  const getBookDetails = (id) => {
    setBookDetails({});
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

  const searchBooks = (query) => {
    setSearchMessage("");
    setSearchResults([]);
    setLoading(true);
    axiosInstance
      .get("/books/search", {
        params: {
          query,
        },
      })
      .then((res) => {
        if (!res.data.data) {
          setSearchMessage("No results found");
          return;
        }
        setSearchResults(res.data.data.books);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const likeBook = (id) => {
    setLikeMessage("");
    axiosInstance
      .post("/books/like/" + id)
      .then((res) => {
        setLikeMessage(res.data.message);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setLikeMessage(err.response.data.message);
          return;
        }
        console.log(err.message);
      })
      .finally(() => {
        getBookDetails(id);
      });
  };

  const unlikeBook = (id) => {
    setLikeMessage("");
    axiosInstance
      .post("/books/unlike/" + id)
      .then((res) => {
        setLikeMessage(res.data.message);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setLikeMessage(err.response.data.message);
          return;
        }
        console.log(err.message);
      })
      .finally(() => {
        getBookDetails(id);
      });
  };

  const values = {
    books,
    loading,
    bookDetails,
    searchResults,
    searchMessage,
    likeMessage,
    setSearchResults,
    getAllBooks,
    getBookDetails,
    searchBooks,
    likeBook,
    unlikeBook,
  };
  return <BookContext.Provider value={values}>{children}</BookContext.Provider>;
};

export default BookProvider;
