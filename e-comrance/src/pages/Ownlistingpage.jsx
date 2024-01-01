import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { initializeUserListing } from "../../reducer/ownlistingReducer";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../../reducer/notificationReducer";
import OwnListingCard from "../components/ownListingCard.jsx";
import Spinner from "../components/LoadSpinner.jsx";

const Ownlistings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState("");

  document.title = "Own Listings";

  useEffect(() => {
    const fetchData = async () => {
      setSpinTip("Loading user listings...");
      try {
        setLoading(true);
        dispatch(initializeUserListing());
        setLoading(false);
      } catch (error) {
        if (error.status === 401) {
          navigate("/login");
          dispatch(
            addNotification(
              "Please login first your session has expired so we can keep your favorites stored",
              "error"
            )
          );
        }
        setLoading(false);
        console.error("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <OwnListingCard />
      <Spinner loading={loading} tip={spinTip} />
    </div>
  );
};

export default Ownlistings;
