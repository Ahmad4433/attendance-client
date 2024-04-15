import React, { useEffect, useState } from "react";
import style from "./attendanceprofile.module.css";
import userImg from "../../assets/user.jpg";
import { useDispatch, useSelector } from "react-redux";
import httpAction from "../../store/actions/httpAction";
import apis from "../../utils/apis";
import { FcBusinessman } from "react-icons/fc";
import { Alert, Snackbar } from "@mui/material";
import Loading from "../ui/Loading";
import { uiActions } from "../../store/slices/ui-slice";
import swl from "sweetalert2";

const AttendanceProfile = () => {
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");
  const [id3, setId3] = useState("");
  const [id4, setId4] = useState("");
  const [data, setData] = useState("");

  const [userLocation, setUserLocation] = useState(0);
  const [isAllow, setIsAllow] = useState(false);
  const [isLocationAvailabel,setIsLocationAvailable] = useState(false)

  const isLoading = useSelector((state) => state.ui.loading);
  const error = useSelector((state) => state.ui.error);
  const dispatch = useDispatch();
  const list = apis();

  const change1 = (event) => {
    setId1(event.target.value);
  };
  const change2 = (event) => {
    setId2(event.target.value);
  };
  const change3 = (event) => {
    setId3(event.target.value);
  };
  const change4 = (event) => {
    setId4(event.target.value);
  };

  // get calculated distance
  const getLocation = async () => {
    const data = {
      url: list.getLocation,
      method: "POST",
      body: {
        userLatitude: userLocation?.coords?.latitude,
        userLongitude: userLocation?.coords?.longitude,
      },
    };
    const result = await dispatch(httpAction(data));
    if (result?.status && result.distance <= 100) {
      setIsAllow(true);

    } else {
      setIsAllow(false);
    }
  };
  useEffect(() => {
    const watch =  navigator.geolocation.watchPosition((position, err) => {
      if (err) {
        dispatch(uiActions.setError("please turn on your location"));
        setUserLocation(null)
        setIsLocationAvailable(false)
      } else {
        if (position) {
          setUserLocation(position);
          setIsLocationAvailable(true)
        }
      }
    });

    return () => {
      if (watch !== null) {
        navigator.geolocation.clearWatch(watch);
      }
    };
  }, [isLocationAvailabel]);





  useEffect(() => {
    if (userLocation) {
      getLocation();
    }
  }, [userLocation]);






  const submitHandler = async (event) => {
    if (!id1 || !id2 || !id3 || !id4) {
      return;
    }
    event.preventDefault();


    if (!isAllow) {
      dispatch(uiActions.setError("you are not at office location"));
      return;
    }
    

    const data = {
      url: list.markAttendance,
      method: "POST",
      body: { id: id1 + id2 + id3 + id4, distance: "100" },
    };

const result = await dispatch(httpAction(data));
setData(result.status && result);
if (result.status && !isLoading) {
  swl.fire({
    icon: "success",
    title: "Success",
    text: result.mark,
  });
  setId1("");
  setId2("");
  setId3("");
  setId4("");
}

  };

  const handleErrorClose = () => {
    dispatch(uiActions.setError(null));
  };




  return (
    <div className={style.main}>
      {isLoading && <Loading />}
      <div className={style.card}>
        <div className={style.profile}>
          <div className={style.userImage}>
            {data ? (
              <img src={data.image} className={style.img} alt="user" />
            ) : (
              <FcBusinessman className={style.img} />
            )}
            {/**/}
          </div>
        </div>
        <p className={style.name}>{data ? data.name : null}</p>
        <div className={style.detail}>
          <div className={style.itemLeft}>
            <span className={style.date}>{data ? "time" : null}</span>
            <span className={style.time}>{data?.time}</span>
          </div>
          <div className={style.itemRight}>
            <span className={style.date}>{data ? "date" : null}</span>
            <span className={style.time}>{data?.date}</span>
          </div>
        </div>
        <form type="submit">
          <div className={style.attendanceControl}>
            <input
              value={id1}
              required
              onChange={change1}
              type="text"
              maxLength={1}
            />
            <input
              value={id2}
              required
              onChange={change2}
              type="text"
              maxLength={1}
            />
            <input
              value={id3}
              required
              onChange={change3}
              type="text"
              maxLength={1}
            />
            <input
              value={id4}
              required
              onChange={change4}
              type="text"
              maxLength={1}
            />
          </div>
          <div className={style.attendanceAction}>
            <button type="submit" onClick={submitHandler} className={style.btn}>
              mark attendance
            </button>
          </div>
        </form>
      </div>

      <Snackbar
        autoHideDuration={3000}
        open={error}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">
          <div className={style.error}> {error}</div>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AttendanceProfile;
