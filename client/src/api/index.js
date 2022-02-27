import axios from "axios";

export const getData = async ({ cities }) => {
  try {
    const { data: { data }} = await axios.get(`https://localhost:5000`);
    
    console.log(data);
    return data;
  
  } catch (error) {
    console.log(error);
  }
};
