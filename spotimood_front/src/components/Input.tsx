import axios from "axios";
import { useState } from "react";

interface Playlist {
  songs: string[];
  name: string;
}

export default function Input() {
  const [isLoading, setIsLoading] = useState(false);
  const [received, setReceived] = useState(false);
  const playlist: Playlist = {
    songs: [],
    name: "",
  };
  const [link, setLink] = useState("");

  async function generatePlaylist(mood: string) {
    setIsLoading(true);
    await axios
      .post(
        "http://172.30.182.167:8080/generate",
        {
          mood: mood,
        },
        { timeout: 30000 }
      )
      .then((response) => {
        console.log(response);
        playlist.songs = response.data.songs;
        playlist.name = response.data.name;
      });

    await axios
      .post(
        "http://172.30.177.254:3000/generatePlaylist",
        {
          ...playlist,
        },
        { timeout: 30000 }
      )
      .then((response) => {
        console.log(response.data);
        setLink(response.data.playlistUrl);
      });
    setIsLoading(false);
    setReceived(true);
  }

  return (
    <form
      className="card"
      onSubmit={(e) => {
        e.preventDefault();
        generatePlaylist(e.target[0].value);
        console.log(e.target[0].value);
        e.target[0].value = "";
      }}
    >
      {isLoading && !received ? (
        <div className="loading_gpt">
            Your playlist is being generated...
        </div>
      ) : !isLoading && !received ? (
        <>
          <h2>How is your mood today?</h2>
          <label className="input">
            <input className="input__field" type="text" placeholder=" " />
          </label>
          <div className="button-group">
            <button>Send</button>
          </div>
        </>
      ) : (
          <><a className="playlist" href={link}>Your Playlist</a><div className="generate_playlist" onClick={() => setReceived(false)}>Generate another playlist</div></>
          )}
    </form>
  );
}
