import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./Home";
import {
  AddCourses,
  AddModules,
  AddStudent,
  AddTrainer,
  Categories,
  Courses,
  Dashboard,
  EditCategories,
  EditCourses,
  EditHomeSlider,
  EditStudentInfo,
  EditTrainerInfo,
  HomeSlider,
  LocationCity,
  LocationCountry,
  LocationState,
  Students,
  Trainers,
  ViewCategories,
  ViewCourses,
  ViewHomeSlider,
  ViewStudentInfo,
  ViewTrainerInfo,
} from "./layout";
import EditModule from "./layout/CourseDetails/EditModule";
import SubModule from "./layout/CourseDetails/SubModule";
import EditSubModule from "./layout/CourseDetails/EditSubModule";
import SubCategories from "./layout/Categories/Subcategories/Subcategories";
import SubcatList from "./layout/Categories/Subcategories/SubcatList";
import EditSubcategories from "./layout/Categories/Subcategories/EditSubcategories";
import Enrollment from "./layout/Enrollment/Enrollment";
import CreateEnrollment from "./layout/Enrollment/CreateEnrollment";
import EnrollDetails from "./layout/Enrollment/EnrollDetails";
import Batches from "./layout/Batches/Batches";
import CreateBatches from "./layout/Batches/CreateBatches";
import BatchesDetails from "./layout/Batches/BatchesDetails";
import EditBatch from "./layout/Batches/EditBatch";
import AddBatchesStudent from "./layout/Batches/AddBatchesStudent";
import EditCountry from "./layout/Location/Country/EditCountry";
import EditLocationState from "./layout/Location/State/EditState";
import EditCity from "./layout/Location/City/EditCity";
import Subscription from "./layout/Subscription/Subscription";
import EditSubscription from "./layout/Subscription/EditSubscription";
import Position from "./layout/Position/Position";
import Notification from "./layout/Notification/Notification";
import Login from "./layout/Login/Login";
import AdminRoute from "./context/routes/adminRoute";
import AddCoupon from "./layout/Coupon/AddCupon";
import CouponsView from "./layout/Coupon/CouponsView";
import EditCoupon from "./layout/Coupon/EditCupon";
import EnquiryView from "./layout/Enquiry/EnquiryView";
import BlogsView from "./layout/Blog/BlogsView";
import EditBlog from "./layout/Blog/EditBlog";
import AddBlog from "./layout/Blog/AddBlog";
import OffersList from "./layout/Offers/OfferList";
import CreateOfferList from "./layout/Offers/NewOfferList";
import EditOfferList from "./layout/Offers/EditOfferList";
import ConcernList from "./layout/concern/ConcernList";
import EditNotification from "./layout/Notification/EditNotification";
import AddSubscription from "./layout/Subscription/AddSubscription";
import CreateSubscription from "./layout/Subscription/CreatSubscription";
import TrainersSubscribed from "./layout/Trainers/TrainersSubscribed";
import Withdraws from "./layout/WithdrawRequests/WithDraws";
import TransactionView from "./layout/Transactions/TransactionsView";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AdminRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="trainers-subscribed" element={<TrainersSubscribed />} />
          <Route path="trainers/view/:id" element={<ViewTrainerInfo />} />
          <Route path="trainers/edit/:id" element={<EditTrainerInfo />} />
          <Route path="trainers/add" element={<AddTrainer />} />

          {/* student crud */}
          <Route path="students" element={<Students />} />
          <Route path="students/view/:id" element={<ViewStudentInfo />} />
          <Route path="students/edit/:id" element={<EditStudentInfo />} />
          <Route path="students/add" element={<AddStudent />} />

          {/* course crud */}
          <Route path="courses" element={<Courses />} />
          <Route path="courses/view/:id" element={<ViewCourses />} />
          <Route path="courses/edit/:id" element={<EditCourses />} />
          <Route path="courses/add" element={<AddCourses />} />
          <Route path="courses/:id/module" element={<AddModules />} />
          <Route path="courses/:id/module/edit/:id" element={<EditModule />} />
          <Route
            path="courses/:id/module/:id/sub-module"
            element={<SubModule />}
          />
          <Route
            path="courses/:id/module/:id/sub-module/edit/:id"
            element={<EditSubModule />}
          />

          {/* categories crud */}
          <Route path="categories" element={<Categories />} />
          <Route
            path="categories/:id/subcategories"
            element={<SubCategories />}
          />
          <Route
            path="categories/:id/subcategories/list"
            element={<SubcatList />}
          />
          <Route
            path="categories/:id/subcategories/edit/:id"
            element={<EditSubcategories />}
          />
          <Route path="categories/view/:id" element={<ViewCategories />} />
          <Route path="categories/edit/:id" element={<EditCategories />} />

          {/* home slider crud */}
          <Route path="home-slider" element={<HomeSlider />} />
          <Route path="home-slider/view/:id" element={<ViewHomeSlider />} />
          <Route path="home-slider/edit/:id" element={<EditHomeSlider />} />

          {/* enrollment crud */}

          <Route path="enrollment" element={<Enrollment />} />
          <Route path="enrollment/create" element={<CreateEnrollment />} />
          <Route path="enrollment/view/:id" element={<EnrollDetails />} />

          {/* batches crud */}
          <Route path="batches" element={<Batches />} />
          <Route path="batches/create" element={<CreateBatches />} />
          <Route path="batches/view/:id" element={<BatchesDetails />} />
          <Route path="batches/edit/:id" element={<EditBatch />} />
          <Route
            path="batches/add-student/:id"
            element={<AddBatchesStudent />}
          />

          {/* address crud */}
          <Route path="/country" element={<LocationCountry />} />
          <Route path="/country/edit/:id" element={<EditCountry />} />
          <Route path="/state" element={<LocationState />} />
          <Route path="/state/edit/:id" element={<EditLocationState />} />
          <Route path="/city" element={<LocationCity />} />
          <Route path="/city/edit/:id" element={<EditCity />} />

          {/* subscription crud  */}
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/subscription/add" element={<CreateSubscription />} />
          <Route path="/subscription/edit/:id" element={<EditSubscription />} />

          {/* position crud */}
          <Route path="/position" element={<Position />} />

          {/* notification crud  */}
          <Route path="/notification" element={<Notification />} />
          <Route path="/notification/edit" element={<EditNotification />} />

          {/*Coupon Crud*/}
          <Route path="/coupon" element={<CouponsView />} />
          <Route path="/coupon/add" element={<AddCoupon />} />
          <Route path="/coupon/edit/:id" element={<EditCoupon />} />

          <Route path="/enquiries" element={<EnquiryView />} />

          {/*Blog Crud*/}
          <Route path="/blogs" element={<BlogsView />} />
          <Route path="/blog/edit/:id" element={<EditBlog />} />
          <Route path="/blog/add" element={<AddBlog />} />

          {/*Offers List */}
          <Route path="/offerList" element={<OffersList />} />
          <Route path="/edit-offerList/:id" element={<EditOfferList />} />
          <Route path="/add-offer-list" element={<CreateOfferList />} />

          {/*Concern List */}
          <Route path="/concern-list" element={<ConcernList />} />

          {/*Withdraws route*/}
          <Route path="/withdraws" element={<Withdraws />} />
          <Route path="/transactions" element={<TransactionView />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
