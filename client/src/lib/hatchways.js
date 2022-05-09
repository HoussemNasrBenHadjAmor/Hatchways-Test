import axios from "axios";

export const getStudents = async () => {
  try {
    const {
      data: { students },
    } = await axios.get(process.env.REACT_APP_API_URL);

    return students;
  } catch (error) {
    return error;
  }
};
