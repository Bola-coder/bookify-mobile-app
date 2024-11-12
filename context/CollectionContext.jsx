import React, { useState, createContext, useContext } from "react";
const CollectionContext = createContext();
import axiosInstance from "../config/axios";

export const useCollections = () => {
  return useContext(CollectionContext);
};

const CollectionProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [collectionDetails, setCollectionDetails] = useState({});

  const getAllCollections = () => {
    setLoading(true);
    axiosInstance
      .get("/collections")
      .then((res) => {
        // console.log(res.data.data);
        setCollections(res.data.data.collections);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getCollectionDetails = (id) => {
    setCollectionDetails({});
    setLoading(true);
    axiosInstance
      .get("/collections/" + id)
      .then((res) => {
        // console.log(res.data.data);
        setCollectionDetails(res.data.data.collection);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createCollection = (data) => {
    setLoading(true);
    axiosInstance
      .post("/collections", data)
      .then((res) => {
        console.log(res.data.data);
        getAllCollections();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const values = {
    loading,
    collections,
    collectionDetails,
    getAllCollections,
    getCollectionDetails,
    createCollection,
  };
  return (
    <CollectionContext.Provider value={values}>
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
