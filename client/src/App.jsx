import AppContextProvider from "./context";
import AppRouter from "./routes";

const App = () => {
  return (
    <AppContextProvider>
      <AppRouter />
    </AppContextProvider>
  );
};

export default App;
