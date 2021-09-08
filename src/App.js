import MainTweet from "./MainTweet";
import Sidebar from './Sidebar'

function App(){
  return(
    <section className='container'>
      <Sidebar/>
      <MainTweet/>
    </section>
  )
}

export default App