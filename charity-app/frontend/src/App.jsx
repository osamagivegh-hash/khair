import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Header />
                <main className="main-content">
                    <AppRouter />
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
