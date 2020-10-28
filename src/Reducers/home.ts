import { handleActions } from "redux-actions";
import { homeAction } from "../Action";
import { IHomeInterface } from "../Interface";

const initialState: IHomeInterface = {
  satelliteData: [],
  isSatteliteRequest: false,
};

export const homeReducer = handleActions(
  {
    [homeAction.SATTELITE_DETAILS_REQUEST]: (state: any, { payload }: any) => ({
      ...state,
      isSatteliteRequest: true,
    }),
    [homeAction.SATTELITE_DETAILS_SUCCESS]: (state: any, { payload }: any) => ({
      ...state,
      isSatteliteRequest: false,
      satelliteData: payload,
    }),
    [homeAction.SATTELITE_DETAILS_FAILED]: (state: any, { payload }: any) => ({
      ...state,
      isSatteliteRequest: false,
      satelliteData: payload,
    }),
  },
  initialState
);
