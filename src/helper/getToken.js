const getToken = async () => {
    let accessToken = '';
    try {
      accessToken = await localStorage.getItem('token');
      return accessToken;
    } catch (error) {
      console.log('error ', error);
    }
  };
  
  export default getToken;
  