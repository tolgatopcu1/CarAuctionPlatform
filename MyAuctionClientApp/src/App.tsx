import Navbar from "./components/Navbar"
import VehicleList from "./features/vehicles/VehicleList"
import MainLayout from "./pages/MainLayout"
import { ToastContainer } from 'react-toastify';


function App() {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
          <div className="container mx-auto px-4 py-6">
            <MainLayout />
          </div>
        </div>
        <ToastContainer />
      </>
    )
  }
  
  
  export default App