import React from 'react'
import { examplePlaylists, type IPlaylist } from "../domain/playlist";

const add = (a,b) => a + b;
const add2 = (a,b) => {
  return a+b;
}
// className="active item"
const Playlist = () => {
  console.log(examplePlaylists);

  return (
    <div className="ui six wide column">
        <h3>Playlists</h3>
        <div className="ui very relaxed selection list">

          {
            examplePlaylists.sort((a, b) => a.title.localeCompare(b.title)).map((playlist:IPlaylist) => (
              <div className="item" key={playlist.id}>
                <i className="large compact disc middle aligned icon"></i>
                <div className="content">
                  <a className="header">{playlist.title}</a>
                  <div className="description">{playlist.tracks.length} songs</div>
                </div>
              </div>
            ))
          }

          
          


          <div className="item" id="newPlaylist">
            <i className="large green plus middle aligned icon"></i>
            <div className="content">
              <a className="header">New</a>
              <div className="description">Create a new playlist</div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Playlist