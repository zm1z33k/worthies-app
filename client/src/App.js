
import NavigationBar from './components/navigationBar';
import {
  BrowserRouter as Router,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import './App.css';
import Welcome from './routeComponents/welcome.js';

import UserProvider from './contexts/userProvider.js'; // Import UserProvider
import Recommendation from './routeComponents/recomendation.js';
import RecommendationSet from './routeComponents/recoSet.js';
import UserProfile from './routeComponents/userprofile.js';
import Watchlist from './routeComponents/watchlist.js';

function App() {
  return (
    <Router>
      <div className="App">
        <UserProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={ <Welcome />} />
            <Route path="/reco" element={<Recommendation />} />
            <Route path="/reco/set" element={<RecommendationSet />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
