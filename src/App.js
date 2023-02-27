import logo from './logo.svg';
import './App.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Router } from 'react-router';

function App() {
  return (
    <div className="App">
       <SkeletonTheme
        baseColor="#262734"
        highlightColor="#323340"
        duration={0.7}
      >
      <Router/>
      </SkeletonTheme>
    </div>
  );
}

export default App;
