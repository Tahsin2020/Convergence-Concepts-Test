import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { CardHolder } from "./CardHolder";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div id="App">
        <CardHolder />
        <div className="container">
          <div className="Photo">
            dfgdfgdfgxfvsdfdsfsddfgdfgdfgdfgdfgdsfsdfsdfdsfsdfdsfsfsdffdsfsdfds
          </div>
          <div className="Photo">
            dfgdfgdfgsdfsdfdsfdsfddfgdfgdfgdfgdfgdsfsdfsdfdsfsdfdsfsfsdfs
          </div>
          <div className="Photo">
            dfgdfgdfgdsfsdfsdfdfgdfgdfgdfgdfgdsfsdfsdfdsfsdfdsfsfsdf
          </div>
          <div className="Photo">
            dfgdfgdfgdfgsdfsdfsdfsdfdfgdfgdfgdfgdfgdsfsdfsdfdsfsdfdsfsfsdf
          </div>
          <div className="Photo">
            dfgdfgdfgdfgdfsfsdfsdfsdfsdfsdffdfgdfgdfgdfgdfgdsfsdfsdfdsfsdfdsfsfsdf
          </div>
          <div className="Photo">
            dfgdfgdfgdfgdfgdsfsdfsdfdsfsdfdsfsfsdfdfgdfgdfgdfgdfgdsfsdfsdfdsfsdfdsfsfsdf
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
