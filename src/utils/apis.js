const apis = () => {
  const baseUrl = "https://attendance-server-029ac8e3ecf3.herokuapp.com/";
  const local = 'http://localhost:8000/'
  return {
    markAttendance: `${baseUrl}user/attendance`,
    getLocation:`${baseUrl}get/location`
  };
};

export default apis
