import React, { useRef, useState } from "react";
import style from "./register.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";
const Register = () => {
  const fileRef = useRef();
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const fileClickHandler = () => {
    fileRef.current.click();
  };

  const fileChange = (event) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      setPreview(event.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div className={style.main}>
      <div className={style.form}>
        <form type="submit">
          <div className={style.formControles}>
            <div className={style.item}>
              <div onClick={fileClickHandler} className={style.file}>
                <input
                  onChange={fileChange}
                  ref={fileRef}
                  type="file"
                  style={{ display: "none" }}
                />
                {preview ? (
                  <img src={preview} className={style.img} />
                ) : (
                  <div className={style.uploader} >
                    <IoCloudUploadOutline className={style.upload} />
                    <span>Picture</span>
                  </div>
                )}
              </div>
            </div>
            <div className={style.item}>
              <input
                required
                type="text"
                placeholder="enter your name"
                className={style.input}
              />
              <input
                type="email"
                required
                placeholder="enter your email"
                className={style.input}
              />
            </div>
            <div className={style.item}>
              <button type="submit" className={style.btn}>
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
