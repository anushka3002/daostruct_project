import "./App.css";
import { SkeletonTheme } from "react-loading-skeleton";
import Router from "./Router/router";
import { ChakraProvider } from "@chakra-ui/react";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <div className="App">
      <SkeletonTheme
        baseColor="#262734"
        highlightColor="#323340"
        duration={0.7}
      >
        <ChakraProvider>
          <Router />
        </ChakraProvider>
      </SkeletonTheme>
    </div>
  );
}

export default App;
