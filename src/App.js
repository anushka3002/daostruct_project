import './App.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import Router from './Router/router';

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
