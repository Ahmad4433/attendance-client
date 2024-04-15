const apis = () => {
  const baseUrl = "http://localhost:8000/";
  return {
    markAttendance: `${baseUrl}user/attendance`,
    getLocation:`${baseUrl}get/location`
  };
};

export default apis
