import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import MovieDetails from './components/MovieDetails/MovieDetails';
import ReservationList from './components/Admin/ReservationList/ReservationList';
import MovieList from './components/Admin/MovieList/MovieList';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/movies/:id" component={MovieDetails} />
          <Route exact path="/admin/reservations" component={ReservationList} />
          <Route exact path="/admin/movies" component={MovieList} />
        </Switch>
      </div>
      <div className="subContainer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
