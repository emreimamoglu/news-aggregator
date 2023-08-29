import './styles/reset.scss';
import './styles/globals.scss';
import Login from './views/Login';
import Layout from './components/Layout';
import Register from './views/Register';

function App() {

  return (
    <Layout>
      <Register/>
    </Layout>
  )
}

export default App
