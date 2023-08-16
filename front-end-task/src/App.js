import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CardHolder } from "./CardHolder";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div id="App">
        <CardHolder />
      </div>
    </QueryClientProvider>
  );
}

export default App;
