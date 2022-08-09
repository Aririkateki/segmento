import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AuthButton from "../../component/Auth/authButton/AuthButton";
import AuthInput from "../../component/Auth/authInput/AuthInput";
import Nav from "../../component/Dashboard/DashboaedComponents/navMenu/Nav";
import {
  checkVerifyEmailAction,
  sendCodEmailAction,
  setAuth1Redux,
  setAuth2Redux,
  setAuth3Redux,
  setAuth4Redux,
} from "../../component/Redux/Action";
import { TextButton } from "../register/Register";
// css
import "./validateEmail.css";

export default function ValidateEmail() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center w-full justify-center overflow-hidden">
      <Nav path={"login"} />
      <div className="registerContainer 	">
        <div className="mt-14">
          <div className="leading-8">
            <p className="text-lg m-auto w-7/12 text-justify ">
              خیلی خوشحالیم که از امروز برای خلق ارزش همراه «سگمنتو» هستید، تلاش
              ما این هست که در کنار رشد کسب‌و‌کارتان، از محصولات ما حس خوبی دریافت
              کنید. برای آغاز ماجراجویی‌ در سگمنتو همین حالا کدی که از طریق ایمیل
              دریافت کردید رو در کادر زیر بنویسید. اگر ایمیلی دریافت نکردید، روی
              گزینه دریافت مجدد کد، کلیک کنید. کامپیوترها خیلی هم باهوش نیستن و
              ممکنه اشتباه کرده باشن :{")"}
            </p>
          </div>
          <div className="flex flex-col justify-cneter items-center gap-3 mt-20 mb-7">
            <span>کد فعال سازی</span>
            <div className="flex gap-5">
              <AuthInput
                classes={"verify_email_cod input_selector_4"}
                notCheckValue={true}
                maxlength="1"
                pressNumber={true}
                reduxHandleChange={setAuth1Redux}
              />
              <AuthInput
                classes={"verify_email_cod input_selector_3"}
                notCheckValue={true}
                maxlength="1"
                pressNumber={true}
                reduxHandleChange={setAuth2Redux}
              />
              <AuthInput
                classes={"verify_email_cod input_selector_2"}
                notCheckValue={true}
                maxlength="1"
                pressNumber={true}
                reduxHandleChange={setAuth3Redux}
              />
              <AuthInput
                classes={"verify_email_cod"}
                notCheckValue={true}
                maxlength="1"
                pressNumber={true}
                reduxHandleChange={setAuth4Redux}
              />
            </div>
          </div>
          <div className="h-10 w-7/12 m-auto text-center relative">
            <Link to={"/dashboard/accountOperations/login"}>
              <img
                src="/img/back.svg"
                alt="back"
                className="absolute py-2 top-0 right-0"
              />
            </Link>
            <div className="m-auto">
              <TextButton.Provider value={"تایید ایمیل"}>
                <AuthButton
                  bgcolor={"#0A65CD"}
                  reduxHandleClick={checkVerifyEmailAction}
                  classes="m-auto"
                />
              </TextButton.Provider>
            </div>
            <Link
              to={"#"}
              onClick={() => dispatch(sendCodEmailAction())}
              className="underline underline-offset-4 absolute top-0 left-0 py-2"
            >
              دریافت مجدد کد
            </Link>
          </div>
        </div>
        <div className="w-full flex gap-4 justify-center absolute bottom-5">
          <img src="/img/contactUs.svg" alt="contactUs" />
          <img src="/img/fi-rr-life-ring.svg" alt="fi-rr-life-ring.svg" />
        </div>
      </div>
    </div>
  );
}
