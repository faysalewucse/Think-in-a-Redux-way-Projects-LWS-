import { Provider } from "react-redux";
import CompletedTodoList from "./components/CompletedTodoList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="grid place-items-center bg-blue-100 h-fit min-h-screen px-8 py-10 font-sans">
        <Navbar />

        <hr className="mb-20" />
        <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
          <Header />

          <hr className="mt-4" />

          <TodoList />
          <hr className="mt-4" />

          <Footer />
        </div>
        <hr className="mb-5" />
        <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
          <h1 className="font-bold text-center underline mb-5">
            Completed Tasks
          </h1>
          <CompletedTodoList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
