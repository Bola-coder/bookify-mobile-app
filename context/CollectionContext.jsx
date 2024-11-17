import React, { useState, createContext, useContext } from "react";
const CollectionContext = createContext();
import axiosInstance from "../config/axios";
import Toast from "react-native-root-toast";

export const useCollections = () => {
  return useContext(CollectionContext);
};

const CollectionProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [collectionDetails, setCollectionDetails] = useState({});
  const [collectionError, setCollectionError] = useState("");

  const handleError = (error) => {
    let errorMessage = "Something went wrong. Please try again later.";

    if (error.response) {
      errorMessage = error.response.data.message;
    } else {
      console.log(error.message);
    }

    setCollectionError(errorMessage);

    // Show the toast immediately
    Toast.show(errorMessage, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      animation: true,
      hideOnPress: true,
    });
  };
  const getAllCollections = () => {
    setLoading(true);
    setCollectionError("");
    axiosInstance
      .get("/collections")
      .then((res) => {
        // console.log(res.data.data);
        setCollections(res.data.data.collections);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getCollectionDetails = (id) => {
    setCollectionDetails({});
    setLoading(true);
    setCollectionError("");
    axiosInstance
      .get("/collections/" + id)
      .then((res) => {
        setCollectionDetails(res.data.data.collection);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createCollection = (data) => {
    setLoading(true);
    setCollectionError("");
    axiosInstance
      .post("/collections", data)
      .then((res) => {
        console.log(res.data.data);
        getAllCollections();
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addBookToCollection = (collectionId, bookId) => {
    setLoading(true);
    setCollectionError("");
    axiosInstance
      .post(`/collections/add-book`, { collectionId, bookId })
      .then((res) => {
        getAllCollections();
        getCollectionDetails(collectionId);
        Toast.show("Book added to collection", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          animation: true,
          hideOnPress: true,
        });
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const removeBookFromCollection = (collectionId, bookId) => {
    setLoading(true);
    setCollectionError("");
    axiosInstance
      .patch(`/collections/remove-book`, { collectionId, bookId })
      .then((res) => {
        getAllCollections();
        getCollectionDetails(collectionId);
        Toast.show("Book removed from collection", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          animation: true,
          hideOnPress: true,
        });
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const emptyCollection = (id) => {
    setLoading(true);
    axiosInstance
      .patch(`/collections/empty/${id}`)
      .then((res) => {
        getAllCollections();
        getCollectionDetails(id);
        Toast.show("Collection emptied", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          animation: true,
          hideOnPress: true,
        });
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteCollection = (id) => {
    setLoading(true);
    axiosInstance
      .delete(`/collections/${id}`)
      .then((res) => {
        getAllCollections();
        Toast.show("Collection deleted", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          animation: true,
          hideOnPress: true,
        });
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
    collections,
    collectionDetails,
    collectionError,
    getAllCollections,
    getCollectionDetails,
    createCollection,
    addBookToCollection,
    removeBookFromCollection,
    emptyCollection,
    deleteCollection,
  };

  return (
    <CollectionContext.Provider value={values}>
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
