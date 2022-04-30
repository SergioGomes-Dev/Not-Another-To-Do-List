import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import ItemScreen from "./screens/ItemScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import VerifyScreen from "./screens/VerifyScreen";
import EmailScreen from "./screens/EmailScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/verify" element={<VerifyScreen />} />
            <Route path="/verify/:emailtoken" element={<EmailScreen />} />
            <Route path="/profile" exact element={<ProfileScreen />} />
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/list/:id" element={<ListScreen />} />
            <Route path="/list/:id/:itemid" element={<ItemScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
