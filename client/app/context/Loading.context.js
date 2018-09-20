import React from 'react';
import Loading from '../components/Common/Loading';

export const LoadingContext = React.createContext();

class LoadingProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false
    };

    this.show = () => {
      this.setState({
          isLoading: true
      });
    }

    this.hide = () => {
      this.setState({
          isLoading: false
      });
    }

  }

  render() {
    const {
        isLoading
    } = this.state;

    return (
      <LoadingContext.Provider value={{ 
          show: this.show,
          hide: this.hide
      }}>
        {isLoading && <Loading /> }
        { this.props.children }
      </LoadingContext.Provider>
    );
  }
}

export default LoadingProvider;