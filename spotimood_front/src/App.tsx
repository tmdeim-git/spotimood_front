import Navigation from './components/Navigation';
import Input from './components/Input';
import Loading from './components/Loading';
//import bgVideo from './assets/backgroundvideo.mp4';
import Spline from '@splinetool/react-spline';

export default function App() {
  return (
    <>
    <Loading />
    <Navigation />
      <div className='scene'> 
        {/*<video src={bgVideo} autoPlay loop muted/>*/}

        <div className='interactive'>
        <div className='home_text'>
          <Input />
        </div>
        <Spline scene="https://prod.spline.design/YoQByJBAq8JIoq4S/scene.splinecode" />
        </div>
      </div>
    </>
  );
}
