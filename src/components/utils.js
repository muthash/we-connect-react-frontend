export function loggedIn() {
    const token = localStorage.getItem('wcToken');
    if (token === null) {
      this.props.history.push({
        pathname: '/login',
        state: {
          'success': "Please log in to continue",
        }
      });
      } else{
          return token;
      }
  }