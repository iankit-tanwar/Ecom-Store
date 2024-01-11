
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './components/Category/Category';
import SingleProduct from './components/SingleProduct/SingleProduct';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Newsletter from './components/Footer/Newsletter/Newsletter';
import AppContext from './utils/context';


function App() {
    return (
        <BrowserRouter>
            <AppContext>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/category/:id' element={<Category />} />
                    <Route path='/products/:id' element={<SingleProduct />} />
                </Routes>
                <Newsletter />
                <Footer />
            </AppContext>
        </BrowserRouter>
    )
}

export default App;
