
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/header';
import Sidebar from './components/layout/sidebar';
import MainContent from './components/layout/main-content';

function App() {
  return (
    <div className="App">
      <Header />
      <section class="main">
        <Sidebar />
        <MainContent />
      </section>
      <Toaster/>
    </div>
  );
}

export default App;
