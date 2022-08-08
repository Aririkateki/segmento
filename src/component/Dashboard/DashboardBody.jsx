import React, { useEffect } from "react";
import DashboardHeader from "./DashboaedComponents/DashboardHeader";
import ItemSidebarHover from "./DashboaedComponents/SidebarComponents/ItemSidebarHover";
import Modal from "react-modal";
import PopUp from "../Utils/PopUp/PopUp";
import { useState } from "react";
import EasyStart from "./DashboaedComponents/EasyStart/EasyStart";
// import HandleModal from "./../Utils/handleModal";
import BuyPlan from "./DashboaedComponents/BuyPlan/BuyPlan";
import WorkSpace from "../Utils/workSpaceModal/workSpace";
import TabMenu from "./DashboaedComponents/tabMenu/TabMenu";
import IconsRight from "./DashboaedComponents/SidebarComponents/IconsRight";
import AcardionItem from "./DashboaedComponents/AcardionItem/AcardionItem";
import KeyWords from "./KeyWords/KeyWords";
import ContentpProduction from "./ContentProduction/ContentpProduction";
import MyList from "./KeyWords/MyList/MyList";
import WorkSpaceReport from "./DashboaedComponents/workSpace/workSpaceReport";
import AleartMessageBuyPlan from "./DashboaedComponents/BuyPlan/AleartMessageBuyPlan";
import { Outlet, Route, Routes, useNavigate } from "react-router";
import AuthButton from "../Auth/authButton/AuthButton";
import { useSelector } from "react-redux/es/exports";
import SidebarComponent from "./DashboaedComponents/SidebarComponents/SidebarComponent";
import MylistContentProduction from "./ContentProduction/MyListContentProduction/MyListContentProduction";
import BuyPlanEasyToStartModal from "../Utils/EasyToStartModal";
import TableFinancialReports from "./DashboaedComponents/FinancialReports/TableFinancialReports";
import EditUserProfile from "./pages/EditUserProfile/EditUserProfile";
import PlanStatus from "./DashboaedComponents/PlanStatus";

export default function DashboardBody() {
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.userState);
  const { resultSetWorkSpace, showWorkSpaceModal } = useSelector((state) => state.workSpaceState);

  const [showResultModal, setShowResultModal] = useState(true); //handle close buy plan result
  const [showModalBuyPlanResult, setShowModalBuyPlanResult] = useState(""); //handle buy plan type

  const [showWorkSpace, setShowWorkSpace] = useState(true); //handle close buy plan result
  const [showReportWorkSpace, setShowReportWorkSpace] = useState({ reportStatus: false, reportStep: 0 }); //handle buy plan type
  //check buy plan result
  useEffect(() => {
    const status_buy_plan = localStorage.getItem("statusBuyPlna");
    const buy_type = localStorage.getItem("buyType");
    // const response_new_workSpace = localStorage.getItem("modalWorkSpace").split(",");
    // if (response_new_workSpace.length!=0) {
    //   setShowReportWorkSpace({reportStatus:response_new_workSpace[0],reportStep:response_new_workSpace[1]})
    // }
    if (
      status_buy_plan &&
      status_buy_plan != undefined &&
      status_buy_plan != null &&
      status_buy_plan != ""
    ) {
      const title = userData.package.title;
      const type_plna = userData.package.type_text;
      if (buy_type == "modal") {
        if (status_buy_plan == true) {
          setShowWorkSpace(false);
          setShowModalBuyPlanResult({ type: "modal", result: true });
        } else {
          setShowModalBuyPlanResult({ type: "modal", result: false });
        }
      } else {
        navigate("dashboard/buyPlan/buyInfo");
      }
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  // const [showWorkSpaceModal, setShowWorkSpaceModal] = useState(true);me

  // DashboardHeader nav icon that close the left sidebar
  const [closeNav, setCloseNav] = useState(true);
  const closeNavItem = () => {
    setCloseNav(!closeNav);
  };

  // end
  // icon Handler  when click in navHover
  const iconClickHandler = () => {
    if (closeNav) setCloseNav(!closeNav);
  };
  // end
  // showing modal
  const startButtonClick = () => {
    setShowModal(true);
  };
  const resetHandleShowModal = () => {
    setShowModal(false);
  };
  // const closeWorkSpaceModal = () => { me
  //   setShowWorkSpaceModal(false);
  // };



  // var a = "setShowResultModal(false);"
  // if (showResultModal) {
  //   eval(a);
  //   console.log(showResultModal)
  // }
  // console.log(showResultModal)
  // alert( showResultModal)
  // console.log(window.location.pathname);
  return (
    <div id="DASHBOARD">
      <div className="w-full h-16 bg-[#fff] shadow-3xl">
        <DashboardHeader setCloseNav={closeNavItem} />
      </div>
      <div className="flex flex-row-reverse relative top-1 w-full h-screen body">
        <div className="bg-[#ffffff] overflow-y-scroll pb-14 relative h-full shadow-3xl mt-1 mx-2 rounded-md z-[1] grow main">
          {/* {resultSetWorkSpace.reportStatus == true ? <WorkSpaceReport stepWorkSpace={resultSetWorkSpace.reportStep} /> : null} */}
          {/* <PopUp title={"موفقیت آمیز"} text={"کار شما با موفقیت انجام شد !"} buttonText={"باشه، فهمیدم !"} type={"error"}/> */}












          {/* */}
          {/*  */}

          {/* <WorkSpaceReport/> */}
          {/* <BuyPlan title={"خرید اشتراک سگمنتو"}/> */}
          <Outlet />
          {/* <button onClick={}>click me!</button> */}
          <Routes>

            {/* <Route path="/dd" element={<WorkSpace />} /> */}
          </Routes>
          {/* {showWorkSpaceModal?<WorkSpace />:null} */}
          {
            // <WorkSpace handleClose={closeWorkSpaceModal} />

            // showModal ? <HandleModal show={true} handleClose={resetHandleShowModal} /> : ""
            // <HandleModal showModal={showModal} setShowModal={setShowModal}/>
            // showModal ? <BuyPlanEasyToStartModal  handleClose={resetHandleShowModal}/> : ""
            // <BuyPlanEasyToStartModal  handleClose={resetHandleShowModal}/>
          }

          {/* <AleartMessageBuyPlan /> */}
        </div>

        <SidebarComponent closeNav={closeNav} openMenu={() => setCloseNav(true)} />
      </div>
      {/* {showModalBuyPlanResult != "" && showModalBuyPlanResult == true ? ( */}
      {showModalBuyPlanResult != "" ? (
        "" // <BuyPlanEasyToStartModal checkBuyPlan={true} />
      ) : (
        // <Modal
        //   isOpen={showResultModal}
        //   parentSelector={() => document.querySelector(".app #DASHBOARD .body .main")}
        //   style={customStyles}
        //   contentLabel="Example Modal"
        // >
        //   <div className=' w-[907px]'>
        //     <body className='final_report_container p-5'>
        //       <div className='popup'>
        //         <div className='title_popup'>اشتراک فعال سازی شده برای شما: </div>
        //         {/* <div className='main_popup'>{planType}</div> */}
        //         <div className='main_popup'>اشتراک طلایی ، 3 ماهه</div>
        //       </div>
        //       <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته است . </p>
        //       <div className='support_container'>
        //         <p>تا اینجای کار اگر نیاز به راهنمایی و مشاوره داشتی میتونی از این طریق باهامون تماس بگیری</p>
        //         <AuthButton textButton={"مشاوره و تماس"} />
        //         <img src="/img/modal/body/report.svg" alt="" />
        //       </div>
        //     </body>
        //   </div>
        // </Modal>
        ""
      )}

    </div>
  );
}
