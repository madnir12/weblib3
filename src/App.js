import "./styles.scss";
import Editor from "./pages/Editor";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Protected from './comps/auth/Protected'
import Dashboard from "./pages/Dashboard";
import MyBooks from "./comps/layout/dashboardComponents/MyBooks";
import SingleBook from "./comps/layout/dashboardComponents/mybookComps/SingleBook";
import MainPage from "./pages/MainPage";
import StatesContext  from "./context/StatesContext";
import Book from './comps/layout/main_page/Book'
import SearchPage from "./comps/layout/main_page/SearchPage";
import BottomBar from "./comps/layout/BottomBar";
import EditDetails from "./comps/layout/dashboardComponents/mybookComps/EditDetails";
import AdminControls from "./comps/layout/dashboardComponents/AdminControls";
export default function App() {
  // all protected routes will store in this array
  const PROTECTED_ROUTES = [
    {
      path: "/dashboard",
      LMT: Dashboard
    },
    {
      path: "/editor/*",
      LMT: Editor
    },
    {
      path: "/admin-controls/*",
      LMT: AdminControls
    }

  ],
  DASHBOARD_ROUTES = [
    {
      path: "/dashboard/mybook",
      LMT: MyBooks
    }
  ], // ends dshboard_routes array
  MYBOOKS_ROUTES = [
    {
      path: "/dashboard/mybook/b/*",
      LMT: <SingleBook/>,
    },
    {
      path: "/dashboard/mybook/e/*",
      LMT: <EditDetails/>,
    },
  ],
  MAINPAGE_ROUTES = [
    {
      path: "/search/*",
      LMT: <SearchPage/>
    },
    {
      path: "/book/*",
      LMT: <Book/>,
    },
];
  return (
    <>
      <main>
      <StatesContext>
      <Router basename="/">
        <Routes>

          <Route path="/" element={<MainPage />} />
          <Route path="" element={<MainPage />} >
            {
              MAINPAGE_ROUTES.map((item)=>{ // all main page routes
                return <Route path={item.path} element={item.LMT}/>
              })
            }
          </Route>
          

          <Route path="/login" element={<Login />} />
          {PROTECTED_ROUTES.map((item) => {
            if (item.LMT === Dashboard) return <Route path={item.path} element={<Protected LMT={item.LMT} />}>
              {
                DASHBOARD_ROUTES.map((item) => {
                  return <Route path={item.path} element={<item.LMT />}>
                    {
                    item.LMT === MyBooks && MYBOOKS_ROUTES.map(item => <Route path={item.path} element={item.LMT} />)
                }
                  </Route>
                })

              }
             </Route>
            else return <Route path={item.path} element={<Protected LMT={item.LMT} />}/>
            }
          )}

        </Routes>
      <BottomBar/>
      
      </Router>
      </StatesContext>
      </main>
    </>
  );
}
