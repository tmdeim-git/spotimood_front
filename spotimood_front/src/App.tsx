import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
//import bgVideo from './assets/backgroundvideo.mp4';
import Spline from "@splinetool/react-spline";
import { Spotify } from "react-spotify-embed";
import axios from "axios";
import { useState } from "react";
import Slider from "@mui/material/Slider";

interface Playlist {
  songs: string[];
  name: string;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [received, setReceived] = useState(false);
  const playlist: Playlist = {
    songs: [],
    name: "",
  };
  const [link, setLink] = useState("");
  const [buttonVis, setButtonVis] = useState(false);

  async function generatePlaylist(mood: string, songs: string) {
    setIsLoading(true);
    await axios
      .post(
        "http://172.30.182.167:8080/generate",
        {
          mood: mood,
          nb_songs: songs,
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
        setTimeout(() => {
          setLink(response.data.playlistUrl);
        }, 2000);
        setTimeout(() => {
          setButtonVis(true);
        }
        , 3000);
      });
    setIsLoading(false);
    setReceived(true);
  }
  const marks = [
    {
      value: 10,
      label: '10'
    },
    {
      value: 30,
      label: '30',
    },
  ];
  return (
    <>
      <Loading />
      <Navigation />
      <div className="scene">
        {/*<video src={bgVideo} autoPlay loop muted/>*/}
        <div className="interactive">
          {link ? <Spotify className="spotify_player" link={link} /> : <></>}
          <div className="home_text">
            <form
              className="card"
              onSubmit={(e) => {
                e.preventDefault();
                generatePlaylist(e.target[0].value, e.target[1].value);
                console.log(e.target[0].value, e.target[1].value);
                e.target[1].value = "";
              }}
            >
              {isLoading && !received && buttonVis ? (
                <div className="loading_gpt">
                  Your playlist is being generated...
                </div>
              ) : !isLoading && !received ? (
                <>
                  <h2>How is your mood today?</h2>

                  <label className="input">
                    <input
                      className="input__field"
                      type="text"
                      placeholder=" "
                    />
                  </label>
                  <div className="slider-title">Number of songs in your playlist</div>
                  <Slider
                    aria-label="Always visible"
                    defaultValue={10}
                    min={10}
                    max={30}
                    step={1}
                    marks={marks}
                    valueLabelDisplay="auto"
                    style={{ width: "80%", color: "var(--primary-color)", margin: "5px"}}
                  />
                  <div className="button-group">
                    <button>Send</button>
                  </div>
                </>
              ) : (
                buttonVis &&                 
                  <>
                  <a className="playlist" href={link} target="_blank">
                    Open in Spotify
                  </a>
                  <div
                    className="generate_playlist"
                    onClick={() => {
                      setReceived(false);
                      setLink("");
                    }}
                  >
                    &#60;Generate another playlist
                  </div>
                </>

              )}
            </form>
          </div>
          {link ? (
            <div className="prop"></div>
          ) : (
            <Spline scene="https://prod.spline.design/YoQByJBAq8JIoq4S/scene.splinecode" />
          )}
        </div>
      </div>
    </>
  );
}
