import Spline from '@splinetool/react-spline';
import Navigation from './components/Navigation';
import Input from './components/Input';

export default function App() {
  return (
    <><div className='scene'>
      <Spline scene="https://prod.spline.design/d9uG9Zxzt9jeyAT5/scene.splinecode" />
    </div>
    <Navigation />
    <div className='home_text'>
      <Input />
    </div>
    </>
  );
}
