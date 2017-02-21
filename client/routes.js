import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';

// import ReqContainer from './containers/ReqContainer'
import Req from './src/req';

// <<<<<<< dev
// import MapContainer from './containers/GoogleMapContainer';
// import LocationBar from './components/locationBar';
// import MenuContainer from './containers/sidebarContainer';
// =======
// import MapContainer from './containers/GoogleMapContainer';
import LocationBar from './components/locationBar';
import MenuContainer from './containers/sidebarContainer';
import MapContainer from './containers/GoogleMapContainer-v2';
// >>>>>>> dev
import News from './components/newsList';

  // <Route path="map" component={MapContainer} />
const home = function home() {
  return (<div>
    <h1>welcome to the home page!</h1>
    <Link to="/counter">Counter</Link>
    <br />
    <Link to="/req">Go to request</Link>
    <br />
    <Link to="/map">Google Map</Link>
    <br />
    <Link to="/location">Rep Lookup</Link>
    <br />
    <Link to="/menuAnd">Menu with header </Link>
    <br />
    <Link to="/header">Header</Link>
    <br />
    <Link to="/news">News</Link>
  </div>);
};


export default (
  <Route path="/">
    <IndexRoute component={home} />
    <Route path="req" component={Req} />
    <Route path="location" component={LocationBar} />
    <Route path="menuAnd" component={MenuContainer} />
    <Route path="news" component={News} />
    <Route path="map" component={MapContainer} />
  </Route>
);
