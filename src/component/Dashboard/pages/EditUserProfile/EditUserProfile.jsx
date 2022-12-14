import React, { useCallback, useEffect, useState } from "react";
import PageTitle from "../../DashboaedComponents/pageTitle/pageTitle";
import ProfileInformation from "./components/profileInfo/ProfileInformation";
import AuthInput from "../../../Auth/authInput/AuthInput";
// import {
//   EditorComposer,
//   Editor,
//   ToolbarPlugin,
//   InsertDropdown,
//   AlignDropdown,
// } from "verbum";

import SelectBox from "./components/selectBox/SelectBox";
import PopUp from "../../../Utils/PopUp/PopUp";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { coreUser, logoutAction } from "../../../Redux/Action";
import { getAllWorkSpace } from "../../../Redux/Action/workSpace";
import ChangeImageModal from "./components/changeImageModal/ChangeImageModal";
import {
  editPassword,
  editProfile,
  getPastDatas,
  getSelectBoxData,
} from "../../../service/editProfile";
import { EditorCustomizedToolbarOption } from "./components/Editor/Editor";
import { showToast } from "../../../Utils/toastifyPromise";
import SetTitleTabBrowser from "../../../Utils/SetTitleTabBrowser";
import AuthButton from "../../../Auth/authButton/AuthButton";
export default function EditUserProfile() {

  const { canRequest } = useSelector(state => state.loadingState)

  const [selectDatas, setSelectDtas] = useState([]);
  const [nameInputValue, setNameInputValue] = useState("");
  const [familyInputValue, setfamilyInputValue] = useState("");
  // user Image

  const [image, setUserImage] = useState([]);
  const userImageProf = image.map((file) => file.preview);


  //
  const [selectBoxValue1, setSelectBoxValue1] = useState("");
  const [selectBoxValue2, setSelectBoxValue2] = useState("");
  const [selectBoxValue3, setSelectBoxValue3] = useState("");
  const [selectBoxValue4, setSelectBoxValue4] = useState("");
  const [selectBoxValue5, setSelectBoxValue5] = useState("");
  const [selectBoxValue6, setSelectBoxValue6] = useState("");
  const [forceUpdates, setForceUpdate] = useState(false);
  const [changepassWord, setChangePassword] = useState(false);
  //password inputs
  const [currentPass, setcurrentPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [confrimPass, setconfrimPass] = useState("");
  //show success pop up for password
  const [updatePass, setUpdatePass] = useState(false);
  const [openChangeImageModal, setOpenChangeImageModal] = useState(false);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  var user_package_type_text = "";
  if (userState.userData.package) {

    user_package_type_text = userState.userData.package.type_text
      ? userState.userData.package.type_text
      : "";
  }
  var user_name = "";
  var user_email = "";
  const handleSelectBox1 = (e) => {
    setSelectBoxValue1(e.target.value);
 
  };
  const handleSelectBox2 = (e) => {
    setSelectBoxValue2(e.target.value);
  };
  const handleSelectBox3 = (e) => {
    setSelectBoxValue3(e.target.value);
  };
  const handleSelectBox4 = (e) => {
    setSelectBoxValue4(e.target.value);
  };
  const handleSelectBox5 = (e) => {
    setSelectBoxValue5(e.target.value);
  };
  const handleSelectBox6 = (e) => {
    setSelectBoxValue6(e.target.value);
  };

  const handleNameInput = (e) => {
    setNameInputValue(e.target.value);
  };
  const handlefamilyInput = (e) => {
    setfamilyInputValue(e.target.value);
  };
  // data of select box
  const selexboxData = async () => {
    try {
      const { data, status } = await getSelectBoxData();
      // setcontent(data.data); //5
      setSelectDtas(data.data);
 
    } catch (error) {
      // console.log(error);
    }
  };

  const loadingState = useSelector(state => state.loadingState)

  const handleSetNewProfile = async () => {

    var toastMessage = "";
    //handle show loadin
    {
      loadingState.ProcessingDelay.push("editProfile");
      loadingState.canRequest = false;
      await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
    }

    let family = "";
    try {
      let formdata = new FormData();
      if (nameInputValue && familyInputValue) {
        family = nameInputValue + " " + familyInputValue;
      } else {
        family = user_name;
      }
      // debugger
      // const [file] = acceptedFiles;
      const imgData = userState.image[0] != "" ? userState.image[0] : "";
      // const imgData1 = imgData != "" ? URL.revokeObjectURL(imgData) : "";

      formdata.append("name", family);
      formdata.append("bio", "???? ???? ???????????? ???????? ????????");
      formdata.append("avatar", imgData);
      formdata.append("website_type", selectBoxValue1);
      formdata.append("company_scale", selectBoxValue2);
      formdata.append("seo_experts", selectBoxValue3);
      formdata.append("website_traffic", selectBoxValue4);
      formdata.append("role_in_company", selectBoxValue5);
      formdata.append("dating_method", selectBoxValue6);
      // const { data, status } = await keywordService(searchBoxValue);
      const { data } = await editProfile(formdata);
      if (data.code == 200 & data.status == true) {
        dispatch(coreUser());
        // console.log(data)
        toast.success("?????????????? ?????? ???? ???????????? ???????????? ????");
        setForceUpdate(!forceUpdates);
      }
      // setcontent(data.data); //5
    } catch (error) {
      data.errors.forEach(element => {
        toastMessage += element + " / ";
      });
      showToast(toastMessage, "error");
      // console.log(error);
      // toast.error("?????????????? ?????? ?????????? ?????? !");
    }

    //handle hide loading
    {
      var removeProcessingItem = loadingState.ProcessingDelay.filter(item => item != "editProfile");
      loadingState.ProcessingDelay = removeProcessingItem;
      loadingState.canRequest = removeProcessingItem > 0 ? false : true;
      await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
    }
  }

    ;







  useEffect(() => {
    if (!pastData ) {

      pastSelexboxData();
    }
  });
  // data of select box thet is related to the past info
  const [pastData, setPastData] = useState("");
  const pastSelexboxData = async () => {
    // debugger
    if (userState.userData.user != undefined) {
      var uuidUser = userState.userData.user.uuid;

      // console.log(uuidUser);
      try {
        // const { data, status } = await getPastDatas(uuidUser); // --------- 
        const { data, status } = await getPastDatas(uuidUser); // --------- ?????????????? ????????????
        setPastData(data.data); //5
        // if(pastData){
        //   setSelectBoxValue1(pastData.website_type);
        //   setSelectBoxValue2(pastData.website_type);
        //   setSelectBoxValue3(pastData.seo_experts);
        //   setSelectBoxValue4(pastData.website_traffic);
        //   setSelectBoxValue5(pastData.role_in_company);
        //   setSelectBoxValue6(pastData.dating_method);
          
        // }
        
      } catch (error) {
        // console.log(error);
      }

    }
  };
  // select box data
  const data = [];
  // console.log(data)
  Object.keys(selectDatas).map((item) => {
    data.push(selectDatas[item]);
  });
  // edit password api
  const handleCurrentPass = (e) => {
    setcurrentPass(e.target.value);
  };
  const handleNewtPass = (e) => {
    setnewPass(e.target.value);
  };
  const handleConfrimationPass = (e) => {
    setconfrimPass(e.target.value);
  };
 
  const handleUpdatePassword = async () => {
    try {
      let formdata = new FormData();
      formdata.append("last_pass", currentPass);
      formdata.append("password", newPass);
      formdata.append("password_confirmation", confrimPass);
      // const { data, status } = await keywordService(searchBoxValue);
      const { data, status } = await editPassword(formdata);
      // setcontent(data.data); //5
      // console.log(data.errors);
      if (data.errors.length != 0) {
        toast.error(data.errors[0]);
      } else {
        setUpdatePass(true);
      }
      setForceUpdate(!forceUpdates);
    } catch (error) {
      // console.log(error);
      toast.error("???????? ???????? ???? ???? ???? ?????? ???? ????????");
    }
  };

  const userToken = localStorage.getItem("token");
  if (userState.userData.user) {
    user_name = userState.userData.user.name
      ? userState.userData.user.name
      : "";
    user_email = userState.userData.user.email
      ? userState.userData.user.email
      : "";
  }
  const forceUpdate = userState.forceUpdate;
  useEffect(() => {
    // pastSelexboxData();
    if (selectDatas.length == 0) {
      selexboxData();

    }
    // debugger
    // if (userToken) { ------------ ?????? ???????? ?????????? ???? ?????? ???????? ?? ?????????? ???????? ?????????? ???????? ?????? ?????????????? ?????? ??????
    // dispatch(coreUser());
    //   dispatch(getAllWorkSpace());
    // }

  }, [forceUpdate]);

  // 


  return (
    <>
      {openChangeImageModal && (
        <ChangeImageModal
          close={() => setOpenChangeImageModal(false)}
          isOpen={openChangeImageModal}
          setUserImage={setUserImage}
          userImage={userState.userData.user != undefined & userState.userData.user.img != "" ? userState.userData.user.img : "../img/dashboard/userProfile/profileImage.png"}
        />
      )}
      {updatePass && (
        <PopUp
          clickHandler={() => setUpdatePass(false)}
          image={"/img/popUp/tik.svg"}
          type={"sucsess"}
          buttonText={" ?????????? ?????? ????????"}
          text={" ???????? ??????????????????? ???????????? ???? ???????? ????????.   "}
          title={" ?????????????? ???????? ?????????? ????."}
        />
      )}
      <div className="">
        <PageTitle title={"???????? ????????????"} />
        {/* <AuthButton textButton={"test api"} handlerClick={pastSelexboxData()}/> */}
        <div className="w-full flex flex-col justify-center items-center">
          <div className="m-h-[650px] mb-9">
            <div className="mt-12 flex justify-between">
              <ProfileInformation
                userName={user_name}
                userType={user_package_type_text && user_package_type_text}
                email={user_email}
                changeUserImage={() => setOpenChangeImageModal(true)}

              // userState.image != "" ? userState.image : userState.userData.user.image 

              />
              {/* //  userState.userData.user.image != undefined ?userState.userData.user.image : */}
              <button
                className="btn-style h-10 rounded-lg text-[14px] mr-[181px] "
                onClick={() => dispatch(logoutAction())}
              >
                ????????{" "}
                <img
                  src="/img/dashboard/header/logoutProfile.svg"
                  alt="logout"
                  className="mr-3"
                />
              </button>
            </div>
            {!changepassWord ? (
              <>
                <div className="mt-14 mb-9">
                  <span className="text-[#002145]">?????????????? ???????? ???? </span>
                  <div className="flex gap-4 my-9 justify-between">
                    <AuthInput
                      textLabelInput="?????? "
                      classes={"w-[100%]"}
                      typeInput="text"
                      handleChange={handleNameInput}
                    />

                    <AuthInput
                      textLabelInput=" ?????? ????????????????"
                      classes={"w-[100%]"}
                      typeInput="text"
                      handleChange={handlefamilyInput}
                    />

                  </div>
                  <AuthInput
                    textLabelInput="???????? ?????????? "
                    width={"100%"}
                    errorTextId="errRejesterFormatEmail"
                    disabled={true}
                  />
                  <div className="w-full flex justify-end mt-7">
                    {" "}
                    <button
                      className="third-btn"
                      onClick={() => setChangePassword(true)}
                    >
                      ?????????? ??????????????
                    </button>
                  </div>
                </div>
                <div className="border-b border-lightGray w-full m-auto" />
                <div className="mt-7 mb-9">
                  <span className="text-[#002145] mb-7">
                    ?????????????? ?????? ?? ?????? ????
                  </span>
                  <div className="flex flex-col gap-4 mt-7">

                    <SelectBox
                      optionItems={data ? data[0] : []}
                      title={"?????????? ???????????? ?????? (?????? ????????)"}
                      handlechange={handleSelectBox1}
                      select={pastData ? pastData.website_type : 0}
                    />
                    <SelectBox
                      optionItems={data ? data[1] : []}
                      title={"?????????? ?????????? ????????"}
                      handlechange={handleSelectBox2}
                      select={pastData ? pastData.website_type : 0}
                    />
                    <SelectBox
                      optionItems={data ? data[2] : []}
                      title={" ?????????? ?????????? ?????? "}
                      handlechange={handleSelectBox3}
                      select={pastData ? pastData.seo_experts : 0}
                    />
                    <SelectBox
                      optionItems={data ? data[3] : []}
                      title={" ???????????? ???????????? ???? ???????? ?????? "}
                      handlechange={handleSelectBox4}
                      select={pastData ? pastData.website_traffic : 0}
                    />
                    <SelectBox
                      optionItems={data ? data[4] : []}
                      title={" ?????? ?????? ???? ?????? "}
                      handlechange={handleSelectBox5}
                      select={pastData ? pastData.role_in_company : 0}
                    />
                    <SelectBox
                      optionItems={data ? data[5] : []}
                      title={" ?????? ???????????? ???? ???????????? "}
                      handlechange={handleSelectBox6}
                      select={pastData ? pastData.dating_method : 0}
                    />{" "}
                    <div className="flex justify-end gap-7 mt-9">
                      <button className="btn-secondary">???????????? </button>
                      <AuthButton handlerClick={handleSetNewProfile} setOnclickValue={userState.image[0]} textButton={"?????????? ??????????????"}/>
                    </div>
                    <div className="border-b border-lightGray w-full m-auto mt-7" />
                  </div>
                </div>
                <div className=" mb-10">
                  <span className="text-[#002145] mb-7">
                    {" "}
                    ?????????? ???????? ?????? ????????????{" "}
                  </span>
                </div>

                <EditorCustomizedToolbarOption />

                <div className="w-full flex justify-end ">
                  <button className="btn-style mb-9 w-[101px]">
                    ?????????? ????????
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full flex flex-col mt-14 gap-7">
                <span>?????????? ??????????????</span>
                <AuthInput
                  textLabelInput=" ?????????????? ????????"
                  typeInput="text"
                  width={"100%"}
                  isPassword={true}
                  handleChange={handleCurrentPass}
                />
                <AuthInput
                  textLabelInput="?????????????? ????????"
                  typeInput="text"
                  width={"100%"}
                  isPassword={true}
                  handleChange={handleNewtPass}
                />
                <AuthInput
                  textLabelInput=" ?????????? ?????????????? ???????? "
                  typeInput="text"
                  width={"100%"}
                  isPassword={true}
                  errorTextId="errRejesterPasswordConfirm"
                  handleChange={handleConfrimationPass}
                />
                <div className="flex w-full justify-end gap-7">
                  <button
                    className="btn-secondary"
                    onClick={() => setChangePassword(false)}
                  >
                    ????????????{" "}
                  </button>
                  <button
                    disabled={!canRequest}
                    className="btn-style"
                    onClick={() => handleUpdatePassword()}
                  >
                    ?????????? ??????????????
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <SetTitleTabBrowser nameSection={"???????? ????????????"}/>
      {forceUpdates ? "" : ""}
    </>
  );
}
