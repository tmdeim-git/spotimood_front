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
  let link = "";

  async function generatePlaylist(mood: string) {
    setIsLoading(true);
    await axios
      .post(
        "http://192.168.68.122:8080/generate",
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
        "http://192.168.68.147:3000/generatePlaylist",
        {
          ...playlist,
        },
        { timeout: 30000 }
      )
      .then((response) => {
        console.log(response.data);
        link = response.data.link;
      });
    setIsLoading(false);
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
        {!isLoading && received ? (
            link )}
      {isLoading ? (
        <div className="loading_gpt">
            Your playlist is being generated...
        </div>
      ) : (
        <>
          <h2>How is your mood today?</h2>
          <label className="input">
            <input className="input__field" type="text" placeholder=" " />
          </label>
          <div className="button-group">
            <button>Send</button>
          </div>
        </>
      )}
    </form>
  );
}
