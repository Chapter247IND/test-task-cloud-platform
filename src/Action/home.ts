import { createAction } from "redux-actions";

export const homeAction = {
  SATTELITE_DETAILS_REQUEST: "Sattelite details Requested!",
  SATTELITE_DETAILS_FAILED: "Sattelite details Failed",
  SATTELITE_DETAILS_SUCCESS: "Sattelite details Success",
};

export const satteliteDetailRequest = createAction(
  homeAction.SATTELITE_DETAILS_REQUEST
);
export const satteliteDetailSuccess = createAction(
  homeAction.SATTELITE_DETAILS_SUCCESS
);
export const satteliteDetailFailed = createAction(
  homeAction.SATTELITE_DETAILS_FAILED
);
