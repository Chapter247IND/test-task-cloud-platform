import axios from "axios";
import { createLogic } from "redux-logic";
import {
  homeAction,
  satteliteDetailSuccess,
  satteliteDetailFailed,
} from "../Action";
import { notification} from "antd";

const loginLogic = createLogic({
  type: homeAction.SATTELITE_DETAILS_REQUEST,
  async process({ action, getState }: any, dispatch: any, done: any) {
    const { satelitteNumber } = action.payload
    try {
      let prevListData = getState().homeReducer.satelliteData;
      const headers = {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      };
      const result = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://celestrak.com/NORAD/elements/gp.php?FORMAT=json&CATNR=${satelitteNumber}`,
        { headers }
      );
      if (result && result.data && Array.isArray(result.data)) {
        prevListData.push(...result.data);
        dispatch(satteliteDetailSuccess(prevListData));
        notification["success"]({
          message: "Success",
          description: "Details Fetched successfully!",
        });
      } else {
        notification["error"]({
          message: "Error",
          description: result.data,
        });
        dispatch(satteliteDetailFailed(prevListData));
      }
    } catch (error) {
      console.log("*******************Errrooo", error);
    }
  },
});

export const HomePageLogics = [loginLogic];
