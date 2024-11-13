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
  const [error, setError] = useState("");

  const handleError = (error) => {
    let errorMessage = "Something went wrong. Please try again later.";

    if (error.response) {
      errorMessage = error.response.data.message;
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
        setAuthorsBooks(res.data.data.books);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const values = {
    loading,
    authorsBooks,
    error,
    getAllBooksFromAuthor,
  };
  return (
    <AuthorContext.Provider value={values}>{children}</AuthorContext.Provider>
  );
};

export default AuthorProvider;
