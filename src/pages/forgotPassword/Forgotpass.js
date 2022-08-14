import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthButton from "../../component/Auth/authButton/AuthButton";
import AuthInput from "../../component/Auth/authInput/AuthInput";
import Timer from "../../component/Auth/timer/Timer";
import Nav from "../../component/Dashboard/DashboaedComponents/navMenu/Nav";
import { changePasswordAction, checkVerifyEmailForgotPasswordAction, sendForgotPasswordEmailCodeAction, setAuth1Redux, setAuth2Redux, setAuth3Redux, setAuth4Redux, setEmailRedux, setPasswordConfirmRedux, setPasswordRedux } from "../../component/Redux/Action";
import { TextButton } from "../register/Register";
import "./forgotpass.css";

export default function Forgetpass() {

  const { forgotPasswordStep, handleResendCode } = useSelector(state => state.userState)




  useEffect(() => {
    if (handleResendCode == false) {

      let myInterval = setTimeout(() => {
        if (seconds > 0) {
          // secondsTimerValue=secondsTimerValue-1;
          setSeconds(seconds - 1);
        }
        // console.log(seconds)
        // console.log(minutes)
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
            // clearInterval(forceUpdateInterval);
            setDisabledCodeButton(false);
            setMinutes(1);
            setSeconds(59);
          } else {
            minutesTimerValue = minutesTimerValue - 1;
            secondsTimerValue = 59;
            // setMinutes(minutes - 1);
            // setSeconds(59);
          }
        }
      }, 1000);
      // let forceUpdateInterval = setInterval(() => {
      //   setForceUpdate(forceUpdate+1)
      // }, 1000);
      // return () => {
      //   clearInterval(myInterval);
      // };
    }
  });

  const clearTimerValue = () => {
    if (minutes != 1 || seconds != 59) {

      setMinutes(1);
      setSeconds(59);
    }
  }

  // timer
  var minutesTimerValue = 1;
  var secondsTimerValue = 59;
  // const [forceUpdate, setForceUpdate] = useState(1);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  // value of input
  const [valusecode, setcode] = useState("");
  const [emailInputValue, setemailInputValue] = useState("");
  // enable codebox
  const [disabled, setDisabled] = useState(true);
  // enable pass
  const [disabledpass, setDisabledPass] = useState(true);
  const [chechvalue, setChechValue] = useState(false);
  // check email to be correct format
  const [chechValueEmail, setChechValueEmail] = useState(false);
  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  //display timer
  const [display, setDisplay] = useState("");
  // getTextButton accept code button
  const [getTextButton, setgetTextButton] = useState("دریافت کد");
  // get code disabled
  const [disabledcodeButton, setDisabledCodeButton] = useState(false);
  const handleChange = (e) => {
    let { id, value } = e.target;
    setcode(value);
    setemailInputValue(value);
  };
  //  active emailcode box
  const handlerClickButton = (e) => {
    if (emailInputValue.length > 10 && validateEmail(valusecode)) {
      setDisabled(false);
      setDisabledCodeButton(true);
      setgetTextButton("دریافت مجدد کد");
      setChechValueEmail(false);
    } else {
      setChechValueEmail(true);
    }
  };

  //  active passwordbox
  const handlerClickButtonAccept = (e) => {
    setDisabledCodeButton(true);
    // ? problemmmmmmmmmmmmmmmmmmmmmmmmmm
    if (valusecode.length) {
      setDisabledPass(false);
    }
    //none display timer
    setDisplay("none");
  };
  // check value to be not empty
  const checkInputValue = () => {
    if (!valusecode) {
      setChechValue(true);
    } else {
      setChechValue(false);
    }
  };


  return (
    <div className="flex flex-col items-center w-full justify-center overflow-hidden">
      <Nav path={"login"} />
      <div className="w-full mt-10 px-28">
        <div className="gap-10 items-center flex flex-row justify-between 2xl:py-5 md:py-5 min-w-full">
          <div className="flex flex-col justify-center w-6/12">
            <div className="flex flex-col gap-1">
              <span>
                برای بازیابی گذرواژه، نیاز به یک کد دارید که براتون ایمیل میشه.
              </span>
            </div>
            <div className="items-center flex justify-between mt-10 mb-5">
              <div className="w-50">
                <AuthInput
                  textLabelInput="ایمیل"
                  classes={`forgot_password_input`}
                  reduxHandleChange={setEmailRedux}
                  chechvalue={chechValueEmail}
                  disabled={forgotPasswordStep == 2 ? true : false}
                  errorTextId="errRejesterFormatEmail"
                />
              </div>
              <div className="flex items-center">
                {handleResendCode == true ? clearTimerValue() :

                  <Timer
                    display={display}
                    minutes={minutes}
                    seconds={seconds}
                  />
                }
                <TextButton.Provider value={getTextButton}>
                  <AuthButton
                    classes={forgotPasswordStep > 0 ? "btn_complete" : ""}
                    reduxHandleClick={sendForgotPasswordEmailCodeAction}
                    disabled={handleResendCode == true ? forgotPasswordStep == 2 ? true : false : true}
                  />
                </TextButton.Provider>
              </div>
            </div>
            <div className="flex items-center justify-between mt-5 relative">
              <div className="flex items-center gap-5 flex-col">
                <span className={forgotPasswordStep > 0 ? forgotPasswordStep == 2 ? "lockStyle" : "" : "lockStyle"}>کد فعال سازی</span>
                <div className="flex items-center gap-4">
                  <AuthInput
                    classes={"verify_email_cod input_selector_4"}
                    notCheckValue={true}
                    disable={forgotPasswordStep > 0 ? forgotPasswordStep == 2 ? true : false : true}
                    chechvalue={chechvalue}
                    reduxHandleChange={setAuth1Redux}
                    maxlength="1"
                    pressNumber={true}
                  />
                  <AuthInput
                    classes={"verify_email_cod input_selector_3"}
                    notCheckValue={true}
                    disable={forgotPasswordStep > 0 ? forgotPasswordStep == 2 ? true : false : true}
                    chechvalue={chechvalue}
                    reduxHandleChange={setAuth2Redux}
                    maxlength="1"
                    pressNumber={true}
                  />
                  <AuthInput
                    classes={"verify_email_cod input_selector_2"}
                    notCheckValue={true}
                    disable={forgotPasswordStep > 0 ? forgotPasswordStep == 2 ? true : false : true}
                    chechvalue={chechvalue}
                    reduxHandleChange={setAuth3Redux}
                    maxlength="1"
                    pressNumber={true}
                  />
                  <AuthInput
                    classes={"verify_email_cod"}
                    notCheckValue={true}
                    disable={forgotPasswordStep > 0 ? forgotPasswordStep == 2 ? true : false : true}
                    chechvalue={chechvalue}
                    reduxHandleChange={setAuth4Redux}
                    maxlength="1"
                    pressNumber={true}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 ">
                <TextButton.Provider value={"تایید کد"}>
                  <AuthButton
                    reduxHandleClick={checkVerifyEmailForgotPasswordAction}
                    disabled={forgotPasswordStep > 0 ? forgotPasswordStep == 2 ? true : false : true}
                    classes={forgotPasswordStep > 1 ? forgotPasswordStep == 2 ? "" : "btn_complete" : ""}
                    bgcolor={
                      !disabledpass
                        ? "#009FB9"
                        : disabled
                          ? "#D3D5E2"
                          : "#0A65CD"
                    }
                  />
                </TextButton.Provider>
              </div>
            </div>
            <div className="flex gap-4 justify-between my-10">
              <AuthInput
                textLabelInput="گذرواژه "
                classes={"forgot_password_input"}
                typeInput="password"
                isPassword={true}
                disable={forgotPasswordStep > 1 ? false : true}
                chechvalue={chechvalue}
                reduxHandleChange={setPasswordRedux}
              />
              <div className="flex flex-col items-start relative">
                <AuthInput
                  textLabelInput=" تکرار گذرواژه  "
                  classes={"forgot_password_input"}
                  typeInput="password"
                  isPassword={true}
                  disable={forgotPasswordStep > 1 ? false : true}
                  chechvalue={chechvalue}
                  reduxHandleChange={setPasswordConfirmRedux}
                  errorTextId="errRejesterPasswordConfirm"
                />
                <div className="ErrorBadgeBox">
                  <img
                    sdivrc="/img/ErrorBadge.svg"
                    alt="ErrorBadge"
                    className="bg[#C42B1C] p-1 rounded-full"
                  />
                  <h5>گذرواژه همخوانی ندارد</h5>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <TextButton.Provider value={"ذخیره گذرواژه و ورود"}>
                <AuthButton
                  bgcolor={disabledpass ? "#D3D5E2" : "#0A65CD"}
                  disabled={forgotPasswordStep > 1 ? false : true}
                  reduxHandleClick={changePasswordAction}
                />
              </TextButton.Provider>
              <div>
                <Link to={"/dashboard/accountOperations/login"}>
                  <span className="underline text-sm underline-offset-8">حساب کاربری ندارم!</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img className="w-100" src="/img/registerFrame.svg" alt="registerFrame" />
            <img className="w-100" src="/img/businessesIcon.png" alt="businessesIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}
