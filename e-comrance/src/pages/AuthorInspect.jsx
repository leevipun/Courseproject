import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuthor } from "../services/Services.js";
import { addNotification } from "../../reducer/notificationReducer.js";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { clearAuthor, setAuthor } from "../../reducer/authorReducer.js";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import Spinner from "../components/LoadSpinner";

const AuthorInspect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState("");
  const author = useSelector((state) => state.author);
  const id = window.location.pathname.split("/")[2];
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setSpinTip("Loading author...");
      try {
        dispatch(clearAuthor());
        const response = await getAuthor(id);
        dispatch(setAuthor(response));
        console.log("response", response);
      } catch (error) {
        dispatch(addNotification(error));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBack = () => {
    navigate("/authors");
  };

  return (
    <div>
      <h1>AuthorInspect</h1>
      <Button onClick={() => handleBack()}>Back</Button>

      <div>
        <p>{`Name: ${author.firstname} ${author.lastname}`}</p>
      </div>
      <Spinner loading={loading} tip={spinTip} />
    </div>
  );
};

export default AuthorInspect;
