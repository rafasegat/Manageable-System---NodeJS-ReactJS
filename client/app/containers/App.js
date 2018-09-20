import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router';
import { getFromStorage, setInStorage } from '../utils/Storage';
import PropTypes from 'prop-types';
import Sidebar from '../components/Common/Sidebar'; 
import Footer from '../components/Common/Footer';
import HeaderMain from '../components/Common/Header/HeaderMain';
import HeaderLogin from '../components/Common/Header/HeaderLogin';
import LoadingProvider from '../context/Loading.context';
import Loading from '../components/Common/Loading';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentPathname: '',
      headerType: this.getHeader(this.props.location.pathname),
      showSidebar: false
    };
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  componentDidMount(){
    this.checkSidebar();
  }

  componentDidUpdate(){
    const { headerType, currentPathname } = this.state;
    const { pathname } = this.props.location;
    const currentHeader = this.getHeader(pathname);
    
    // Just enter here if it's a new page
    if( currentPathname !== pathname){
      this.setState({ currentPathname: pathname });
      this.checkSidebar();
      if(headerType != currentHeader)
        this.setState({ headerType: currentHeader });
    }
    
  }

  getHeader(pathname){
    if(pathname==='/')
      return 'login';
    else
      return 'general';
  }

  checkSidebar(){
    const { pathname } = this.props.location;
    if(pathname.indexOf('organizations') > 0 || 
       pathname.indexOf('projects') > 0 ||
       pathname==='/'){
        this.setState({ showSidebar: false });
        document.body.classList.remove('has-sidebar');
    } else {
      this.setState({ showSidebar: true });
      document.body.classList.add('has-sidebar');
    }
  }

  onClickLogout() {
    setInStorage('FB360_Token', "");
    setInStorage('FB360_Project', "");
    setInStorage('FB360_Organization', "");
    this.props.history.push('/');
  }

  render() {
    const { 
      headerType,
      showSidebar
    } = this.state;
    const { children } = this.props;
    return (
      <>
        <LoadingProvider>
          {  headerType=='login' ? <HeaderLogin/> : 
              <HeaderMain onClickLogout={this.onClickLogout}/> 
          }
          <main className="main">
            { showSidebar && <Sidebar /> }
            {children}
          </main>
          <Footer />
        </LoadingProvider>
      </>
    );
  }

}

export default withRouter(App);