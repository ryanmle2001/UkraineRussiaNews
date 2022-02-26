var axios = require("axios").default;

export const getData = async () => {
    var options = {
      params: {

      },
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": "b51d086105msh50ca0aa73611a01p10c4b8jsn910a1ef00f1f",
      },
    };
  
    try {
      const {
        data: { data },
      } = await axios.get(
        `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };