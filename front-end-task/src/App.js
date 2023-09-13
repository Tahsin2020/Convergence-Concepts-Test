import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CardHolder } from "./CardHolder";
import HoverCarousel from "./HoverCarousel";
const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      
      <div id="App">
        <HoverCarousel  />
      </div>
    </QueryClientProvider>
  );
}

export default App;
