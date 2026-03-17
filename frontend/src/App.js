import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import ServicesScreen from './screens/ServicesScreen';
import LoginScreen from './screens/LoginScreen';
import ApplySeller from './screens/ApplySeller';
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/home' element={<HomeScreen />} />
            <Route path='/' element={<LoginScreen />} />
            <Route path='/services/:id' element={<ServicesScreen />} />
            <Route path='/apply-seller' element={<ApplySeller />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
