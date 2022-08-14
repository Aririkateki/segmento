import React, { Fragment, useEffect, useState } from 'react'
import AuthInput from '../../../Auth/authInput/AuthInput';
import { applyDiscountAction, getAllPlanData, setPackageUuid } from '../../../Redux/Action/plan';
import { useDispatch, useSelector } from 'react-redux';
import AuthButton from '../../../Auth/authButton/AuthButton';
import ReportBuyPlanSection from '../../../Utils/Modals/ReportBuyPlanSection';
import SetTitleTabBrowser from '../../../Utils/SetTitleTabBrowser';
import DiscountTagValue from '../../../Utils/buyPlanSection_UTILS/DiscountTagValue';
import HandleParagraphInfoPlan from '../../../Utils/buyPlanSection_UTILS/proposalPlanParagraph/HandleParagraphInfoPlan';
import PageTitle from '../pageTitle/pageTitle';
import CardPlans from '../../../Utils/buyPlanSection_UTILS/CardPlans';

export default function BuyPlan({ title }) {

  const { discount, discountStatus, allPackageData } = useSelector(state => state.planState);

  const { canRequest } = useSelector((state) => state.loadingState);
  const dispatch = useDispatch();

  // console.log(allPackageData)
  useEffect(() => {
    dispatch(getAllPlanData())
  }, [])

  const [showReportModal, setShowReportModal] = useState(false);


  // const [free, setFree] = useState(false);

  const [plan, setPlan] = useState({ uuid: "", type: "", planIndex: 0 });
  // 
  // const [showModal, setShowModal] = useState(true);










  const handleCloseReportModal = () => {
    setShowReportModal(false)
  }

  return (
    <div className='plans_body_container buy_plan_section'>
      <PageTitle title={title} />
      {/* <div className='badge_title'> */}
      {/* <div></div> */}
      {/* <p>خرید اشتراک سگمنتو</p> */}
      {/* </div> */}
      <div className='main_buy_plan_section overflow-visible max-w-7xl w-full'>


        <div className='section_title'>
          <div>
            <p>رایگان شروع کنید؛ قدرتمند ادامه دهید</p>
            <button className="btn_more_information_plan">توضیحات بیشتر</button>
          </div>
        </div>
        {/* <body className='plans_body_container'> */}

        <CardPlans plan={plan} setPlan={setPlan}/>


        <HandleParagraphInfoPlan typePlan={plan.type} indexPlan={plan.planIndex} />
        <AuthButton classes={"m-auto mt-4"} handlerClick={setShowReportModal} setOnclickValue={true} disabled={plan.uuid != "" ? false : true} onClick={() => setShowReportModal(true)} textButton={<Fragment>فعالسازی اشتراک<span className='forward-ico'></span></Fragment>}></AuthButton>
        {/* <AuthButton className='btn-style m-auto mt-4' handlerClick={setShowReportModal(true)} onClick={()=>setShowReportModal(true)}>فعالسازی اشتراک<span className='forward-ico'></span></AuthButton> */}
        {/* </body> */}
        <div className='footer_message'>
          <p>اگر بیزینس هستید یا به امکانات و منابع بیشتری نیاز دارید: </p>
          <button className="btn_more_information_plan">توضیحات بیشتر</button>
        </div>
      </div>
      <div className='report_buy_plan w-[500px]'>
        {showReportModal && <ReportBuyPlanSection handleClose={handleCloseReportModal} packageUuid={plan.uuid} />}
      </div>
      <SetTitleTabBrowser nameSection={"خرید اشتراک"} />
    </div>
  )
}