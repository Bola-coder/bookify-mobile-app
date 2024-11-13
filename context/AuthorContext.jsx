import React, { useState, createContext, useContext } from "react";
const AuthorContext = createContext();
import Toast from "react-native-root-toast";
import axiosInstance from "../config/axios";

export const useAuthorContext = () => {
  return useContext(AuthorContext);
};

// const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const AuthorProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorsBooks, setAuthorsBooks] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [error, setError] = useState("");

  const handleError = (error) => {
    let errorMessage = "Something went wrong. Please try again later.";

    if (error.response) {
      errorMessage = error.response.data.message;
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    setError(errorMessage);

    // Show the toast immediately
    Toast.show(errorMessage, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      animation: true,
      hideOnPress: true,
    });
  };

  const getAllBooksFromAuthor = async (authorId) => {
    setLoading(true);
    axiosInstance
      .get("/books/author/all")
      .then((res) => {
        // console.log(res.data);
        setAuthorsBooks(res.data.data.publishedBooks);
        setDrafts(res.data.data.drafts);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createNewBook = async (bookData) => {
    setLoading(true);
    axiosInstance
      .post("/books", bookData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        getAllBooksFromAuthor();
      })
      .catch((err) => {
        handleError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const values = {
    loading,
    authorsBooks,
    drafts,
    error,
    getAllBooksFromAuthor,
    createNewBook,
  };
  return (
    <AuthorContext.Provider value={values}>{children}</AuthorContext.Provider>
  );
};

export default AuthorProvider;
