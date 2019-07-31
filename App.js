import React from 'react';
import Header from './components/header'
import Footer from './components/footer.jsx'
import PageContent from './components/content.jsx'

class App extends React.Component {
   render() {
      return (
         <div>
            <Header/>
            <PageContent/>
            <Footer/>
         </div>
      );
   }
}
export default App;