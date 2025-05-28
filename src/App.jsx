import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Public Page
import Error from "./pages/ErrorPage";
import AppLayout from "./pages/AppLayout";
import BusinessLayout from "./pages/BusinessLayout";
import Loader from "./Shared/Loader/Loader";
import UserPrivateRoute from "./pages/UserDashboard/UserPrivateLayout";
import RedirectIfAuthenticated from "./pages/UserDashboard/RedirectLogin";
import HomePage from "./pages/UserDashboard/BusinessDashboard/HomePage";
import ForgetPassword from "./pages/Auth/ForgetPassword/ForgetPassword";
import BusinessBlog from "./pages/Business/Blog/BusinessBlogDetail/BusinessBlog";
import GeoLocationComponent from "../GeoLocation";
import { REACT_APP_API_URL } from "./constants/constants";
import { apiGet } from "./services/userAuth";
import DynamicPages from "./pages/DynamicPages/DynamicPages";
import UserPricing from "./pages/Business/Pricing/UserPricing";
import ContactUs from "./pages/ContactUs/ContactUs";

// Public Page
const Home = lazy(() => import("./pages/Home/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const BlogDetail = lazy(() => import("./pages/Blog/BlogDetail/BlogDetail"));
const ListingDetail = lazy(() => import("./pages/Listing/ListingDetail/ListingDetail"));
const Category = lazy(() => import("./pages/Category/Category"));
const ReviewsDetail = lazy(() => import("./pages/Reviews/ReviewsDetail/ReviewsDetail"));
const Login = lazy(() => import("./pages/Auth/Login/Login"));
const UserSignup = lazy(() => import("./pages/Auth/Signup/Signup"));
const WriteReview = lazy(() => import("./pages/Reviews/WriteReviews"));
const HowItsWork = lazy(() => import("./pages/HowItsWork/HowItsWork"));
const SingleCategoryConsumer = lazy(() => import("./pages/SingleCategoryConsumer/SingleCategoryConsumer"));
const NewWriteReveiw = lazy(() => import("./pages/Listing/ListingDetail/Components/WriteReview/WriteReview"));
const VerifyLogin = lazy(() => import("./pages/VerifyOTP/VerifyOTP"));
// Business
const BusinessHome = lazy(() => import("./pages/Business/Home/Home"));
const SignUp = lazy(() => import("./pages/Business/SingUp/SingUp"));
const LogIn = lazy(() => import("./pages/Business/LogIn/LogIn"));
const Enterprice = lazy(() => import("./pages/Business/Enterprice/Enterprice"));
const Pricing = lazy(() => import("./pages/Business/Pricing/Pricing"));
const Integrations = lazy(() => import("./pages/Business/Integrations/Integrations"));
const AttractNewCustomers = lazy(() => import("./pages/Business/AttractNewCustomers/AttractNewCustomers"));
const HelpCenter = lazy(() => import("./pages/Business/HelpCenter/HelpCenter"));
const ServicesReviews = lazy(() => import("./pages/Business/ServicesReviews/ServicesReviews"));
const BlogBuss = lazy(() => import("./pages/Business/Blog/Blog"));
const Industries = lazy(() => import("./pages/Business/Industries/Industries"));
const BlogBussDetail = lazy(() => import("./pages/Business/Blog/BlogDetail/BlogDetail"));
const Stories = lazy(() => import("./pages/Business/Stories/Stories"));
const StoriesDetail = lazy(() => import("./pages/Business/Stories/StoriesDetail/StoriesDetail"));
const BusinesHome = lazy(() => import("./pages/Business/Home/BuninessHome/BusinessHome"));
// User Dashboard
const UserLayout = lazy(() => import("./pages/UserDashboard/Layout/Layout"));
const UserDashboard = lazy(() => import("./pages/UserDashboard/Home/Home"));
const BookMark = lazy(() => import("./pages/UserDashboard/Bookmark/Bookmark"));
const UserProfile = lazy(() => import("./pages/UserDashboard/UserProfile/UserProfile"));
const MyAccount = lazy(() => import("./pages/UserDashboard/MyAccount/MyAccount"));
const MyReviews = lazy(() => import("./pages/UserDashboard/MyReviews/MyReviews"));
const MyReviewsDetail = lazy(() => import("./pages/UserDashboard/MyReviews/DetailReview"));
const CompanyDetails = lazy(() => import("./pages/UserDashboard/CompanyDetails/CompanyDetails"));
const DashboardAllBusiness = lazy(() => import("./pages/UserDashboard/Home/Components/DashboardAllBusiness"));
const MyResponds = lazy(() => import("./pages/UserDashboard/MyResponds/MyResponds"));
const BillingInfo = lazy(() => import("./pages/UserDashboard/BillingInfo/BillingInfo"));
const DashboardStories = lazy(() => import("./pages/UserDashboard/DashboardStories/DashboardStories"));

function App() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);

  const getPageData = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}page`;
      const params = {
        type: "static",
      };
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response.data.payload.records;
        setData(dbValues);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPageData();
  }, []);

  const router = createBrowserRouter([
    // Main Application Routes under AppLayout
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "about-us", element: <AboutUs /> },
        { path: "blog", element: <Blog /> },
        { path: "blog/blog-detail/:id/:title?", element: <BlogDetail /> },
        {
          path: "listing/listing-detail/:id/:name?",
          element: <ListingDetail />,
        },
        { path: "categories", element: <Category /> },
        { path: "reviews/review-detail/:id", element: <ReviewsDetail /> },
        {
          path: "auth/login",
          element: (
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          ),
        },
        { path: "auth/signup", element: <UserSignup /> },
        { path: "write-a-review", element: <WriteReview /> },
        { path: "evaluate/:business_id/:category_id/:rating?", element: <NewWriteReveiw /> },
        { path: "how-it-works", element: <HowItsWork /> },
        { path: "pricing", element: <UserPricing /> },
        { path: "verify-otp", element: <VerifyLogin /> },
        { path: "contact", element: <ContactUs /> },

        {
          path: "listing",
          element: <SingleCategoryConsumer />,
        },
        {
          path: "listing/:id/:name",
          element: <SingleCategoryConsumer />,
        },
        // dynamic pages
        ...(loading
          ? [] // If loading, no dynamic routes are added
          : data
              ?.filter((i) => i.type === "static")
              .map((i) => ({
                path: i.slug,
                element: <DynamicPages loading={loading} data={i} />,
              })) || []),
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "*", element: <Error /> },
      ],
    },
    // User Dashboard
    {
      path: "/dashboard",
      element: <UserPrivateRoute element={<UserLayout />} />,
      children: [
        { index: true, element: <UserDashboard /> }, // Default child route
        { path: "bookmark", element: <BookMark /> },
        { path: "profile", element: <UserProfile /> },
        { path: "my-account", element: <MyAccount /> },
        { path: "my-reviews", element: <MyReviews /> },
        { path: "my-reviews/detail/:id", element: <MyReviewsDetail /> },
        { path: "company-details/:id/:name?", element: <CompanyDetails /> },
        { path: "business-home", element: <HomePage /> },
        { path: "my-responds", element: <MyResponds /> },
        { path: "billing-info", element: <BillingInfo /> },
        { path: "customer-story", element: <DashboardStories /> },
        {
          path: "listing/:id/:name?",
          element: <DashboardAllBusiness />,
        },
      ],
    },

    // Business Routes under BusinessLayout
    {
      path: "/business",
      element: <BusinessLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <BusinessHome /> },
        { path: "sign-up", element: <SignUp /> },
        { path: "log-in", element: <LogIn /> },
        { path: "enterprise", element: <Enterprice /> },
        { path: "pricing", element: <Pricing /> },
        { path: "integrations", element: <Integrations /> },
        { path: "attract-new-customers", element: <AttractNewCustomers /> },
        { path: "help-center", element: <HelpCenter /> },
        { path: "services-reviews", element: <ServicesReviews /> },
        { path: "stories", element: <Stories /> },
        { path: "write-a-review", element: <WriteReview /> },
        {
          path: "stories/stories-detail/:id/:title?",
          element: <StoriesDetail />,
        },
        {
          path: "blogs/blogs-detail/:id",
          element: <BusinessBlog />,
        },
        { path: "blogs/:id?", element: <BlogBuss /> },
        { path: "blog/blog-detail", element: <BlogBussDetail /> },
        { path: "industries", element: <Industries /> },
        { path: "business-home", element: <BusinesHome /> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return (
    <Suspense
      fallback={
        <div className="p-5 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <Loader />
        </div>
      }
    >
      <GeoLocationComponent />
      {loading ? (
        <div className="container">
          <Loader />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </Suspense>
  );
}

export default App;
