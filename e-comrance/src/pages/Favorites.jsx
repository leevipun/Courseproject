import { FaHeart } from "react-icons/fa";
import Navbar from "./../components/navbar";
import { useEffect } from "react";
import { getAllFavoriteItems } from "../services/Services";
import { useDispatch } from "react-redux";
import { initializefavorite } from "../../reducer/favoriteReducer";

const Favoritepage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'Favorites';
    const fetchData = async () => {
    const response = await getAllFavoriteItems()
    dispatch(initializefavorite(response))
    };
    fetchData()
  });

  return (
    <div>
      <Navbar />
      User Profile <FaHeart />
    </div>
  );
};

export default Favoritepage;
