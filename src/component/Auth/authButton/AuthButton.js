import React, { useContext } from "react";
import { TextButton } from "../../../pages/register/Register";
import "./authButton.css";
import { useDispatch, useSelector } from "react-redux";

export default function AuthButton({
  widthValue,
  style,
  handlerClick,
  reduxHandleClick,
  disabled,
  padding,
  classes,
  textButton,
  setOnclickValue
}) {
  const {canRequest}=useSelector(state=>state.loadingState)
  const value = useContext(TextButton);
  const dispatch = useDispatch()
  // debugger
  return (
    <button
      variant="contained"
      className={`btn-style ${classes!=undefined?classes:""}`}
      disabled={disabled!=undefined?disabled?true:!canRequest:!canRequest}

      style={style}
      onClick={handlerClick != undefined&handlerClick != "" & reduxHandleClick != undefined ? (
        (e) => {
          handlerClick()
          dispatch(reduxHandleClick(setOnclickValue!=""?setOnclickValue:null))
        }
      ) : handlerClick != undefined & handlerClick != "" ? (
        (e) => {
          handlerClick(setOnclickValue!=""&setOnclickValue!=undefined?setOnclickValue:null)
        }
      ) : (
        (e) => {
          dispatch(reduxHandleClick(setOnclickValue!=""&setOnclickValue!=undefined?setOnclickValue:null))
        }
      )}
    >
      {value != undefined ? value : textButton}
    </button>
  );
}
