import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dropdown from "./Dropdown";
import PrivateRoute from "./PrivateRoute"
import Dashboard from "./Dashboard"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddQuestion from "./AddQuestion";
import Question from "./Question";
import LeaderBoard from "./LeaderBoard";

const App = ({ authedUser, dispatch }) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <Router>
    <Routes>
      <Route path="/" element={<PrivateRoute redirectTo="/login" authedUser={authedUser}/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddQuestion />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/questions/:question_id" element={<Question />} />
      </Route>
      <Route path="/login" element={<Dropdown />} />
      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  </Router>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
  authedUser
});

export default connect(mapStateToProps)(App);