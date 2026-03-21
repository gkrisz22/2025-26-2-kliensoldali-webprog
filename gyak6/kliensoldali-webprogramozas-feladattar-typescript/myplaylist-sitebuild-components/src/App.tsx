import Navbar from "./components/Navbar";
import Playlists from "./components/Playlists";
import SongCard from "./components/SongCard";
import SongList from "./components/SongList";

function App() {
  return (
    <div>
      <Navbar />
      <div className="ui container">
        <h1>My Playlists</h1>
        <div className="ui stackable two column grid">
          <Playlists />
          <SongList />
        </div>
        <div className="ui divider"></div>
        <SongCard />
      </div>

      <div className="ui modal">
        <i className="close icon"></i>
        <div className="header">Add new Playlist</div>
        <div className="image content">
          <div className="description">
            <div className="ui form">
              <div className="field">
                <label>Name</label>
                <input required type="text" placeholder="My Playlist" />
              </div>
            </div>
          </div>
        </div>
        <div className="actions">
          <div className="ui black deny button">Cancel</div>
          <div className="ui positive right labeled icon button">
            Add
            <i className="plus icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
