import { useEffect } from "react";
import { connect } from "react-redux";

import { handleInitialData } from "../actions/shared";
import Dropdown from "./Dropdown/Dropdown";
import PrivateRoute from "./PrivateRoute"
import Dashboard from "./Dashboard/Dashboard"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddQuestions from "./AddQuestions/AddQuestions";
import Question from "./Question/Question";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import Error from "./Error/Error";

import './App.css'

const App = ({ authedUser, dispatch }) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Router>
      <div className="appContainer">
        <Routes>
        <Route path="/" element={<PrivateRoute redirectTo="/login" authedUser={authedUser}/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddQuestions />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/questions/:question_id" element={<Question />} />
        </Route>
        <Route path="/login" element={<Dropdown />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  </Router>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
  authedUser
});

export default connect(mapStateToProps)(App);