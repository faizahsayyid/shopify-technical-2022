import "./App.css";
import { IoMdPlanet } from "react-icons/io";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ImageFeed } from "./features/image-feed/ImageFeed";
import { ImageShare } from "./features/image-share/ImageShare";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <IoMdPlanet size="3em" />
        <h1
          className="text-warning app-title"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          NASA Explore
        </h1>
      </header>
      <Router>
        <Route exact path="/shopify-technical-2022">
          <ImageFeed />
        </Route>
        <Route exact path="/shopify-technical-2022/:id">
          <ImageShare />
        </Route>
      </Router>
    </div>
  );
}

export default App;
