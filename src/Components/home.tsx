import React, { useState } from "react";
import { Container, Button, Col, Card, Table, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { satteliteDetailRequest } from "../Action";

const Home = () => {
  //State for sattellite number
  const [satteliteNumber, setSatteliteNumber] = useState(10000);

  //State for sattellite detail view
  const [isDetailView, setisDetailView] = useState(false);

  //State for sattellite detail view
  const [detailsData, setDetailsData] = useState<any>({});

  // fetch data from reducer state
  const homeReducer = useSelector((state: any) => state.homeReducer);

  //State for sattellite number error
  const [satteliteError, setSatteliteError] = useState("");

  //dispatch methods
  const dispatch = useDispatch();

  //handle change and error handlling
  const handleChange = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    if (value && value.toString().length < 5) {
      setSatteliteError("Enter proper Sattelite number");
    } else {
      setSatteliteError("");
    }
    setSatteliteNumber(value);
  };

  const handleSatelliteDetails = () => {
    dispatch(satteliteDetailRequest({ satelitteNumber: satteliteNumber }));
  };

  const handleDetailView = (item: any) => {
    setDetailsData(item);
    setisDetailView(true);
  };

  return (
    <section className="banner-wrap">
      <Container>
        <div className={"caption-block-content"}>
          <h1 className={"main-title"}>Test UI Task</h1>
          <h5>
            New ways to get GP data now available! Up until now, we've used the
            TLE format to ingest data into SGP4. With the growth of the catalog
            soon to exceed the current range of 5-digit catalog numbers, you may
            be wondering how we will handle that.{" "}
          </h5>
        </div>
        <div className="caption-block">
          <h6 className={"form-label"}>Enter 5 Dight Satellite Number</h6>
          <div className={"text-center"}>
            <input
              className={"form-control"}
              value={satteliteNumber}
              maxLength={5}
              onChange={(e: any) => handleChange(e)}
              placeholder={"Enter 5 dight Stalitte number"}
            />
          </div>
          <div className={"text-right mt-2"}>
            <Button
              className={"btn-theme"}
              onClick={() => handleSatelliteDetails()}
              size={"sm"}
              variant={"link"}
            >
              {homeReducer.isSatteliteRequest
                ? "Please wait..."
                : "Check Satellite"}
            </Button>
          </div>
          {satteliteError ? (
            <div className={"text-danger"}>
              <b>{satteliteError}</b>
            </div>
          ) : null}
        </div>
        <div className="caption-block-left">
          <Card className={""}>
            <Card.Body className={""}>
              <div className={"card-title"}>Satellite List</div>
              {!isDetailView ? (
                <Table responsive>
                  <thead className={"thead-light"}>
                    <tr>
                      <th>Object Id</th>
                      <th>Object Name</th>
                      <th>Satellite Number</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {homeReducer &&
                    homeReducer.satelliteData &&
                    homeReducer.satelliteData.length ? (
                      homeReducer.satelliteData.map(
                        (item: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td>{item.OBJECT_ID ? item.OBJECT_ID : "-"}</td>
                              <td>
                                {item.OBJECT_NAME ? item.OBJECT_NAME : "-"}
                              </td>
                              <td>
                                {item.NORAD_CAT_ID ? item.NORAD_CAT_ID : "-"}
                              </td>
                              <td>
                                <Button
                                  size={"sm"}
                                  className={"btn-detail-view"}
                                  onClick={() => handleDetailView(item)}
                                  variant={"link"}
                                >
                                  View Details
                                </Button>
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      <tr className="text-center">
                        <td colSpan={4}>
                          <h5 className={"text-center"}>No data found</h5>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              ) : (
                <div>
                  <div
                    onClick={() => setisDetailView(false)}
                    className={"cursor-pointer"}
                  >
                    Back to list
                  </div>

                  <div className="detail-div">
                    <div className="item-list">
                      <span className="text-label">Object Id:</span>
                      <span className="text-value">
                        {detailsData.OBJECT_ID}
                      </span>
                    </div>
                    <div className="item-list">
                      <span className="text-label">Object Name:</span>
                      <span className="text-value">
                        {detailsData.OBJECT_NAME}
                      </span>
                    </div>
                    <div className="item-list">
                      <span className="text-label">Arg Of Pericenter:</span>
                      <span className="text-value">
                        {detailsData.ARG_OF_PERICENTER}
                      </span>
                    </div>
                    <div className="item-list">
                      <span className="text-label">BStar:</span>
                      <span className="text-value">{detailsData.BSTAR}</span>
                    </div>
                    <div className="item-list">
                      <span className="text-label">Classification Type:</span>
                      <span className="text-value">
                        {detailsData.CLASSIFICATION_TYPE}
                      </span>
                    </div>{" "}
                    <div className="item-list">
                      <span className="text-label">Eccentricity:</span>
                      <span className="text-value">
                        {detailsData.ECCENTRICITY}
                      </span>
                    </div>{" "}
                    <div className="item-list">
                      <span className="text-label">Eccentricity</span>
                      <span className="text-value">
                        {detailsData.ECCENTRICITY}
                      </span>
                    </div>{" "}
                    <div className="item-list">
                      <span className="text-label">Element Set No:</span>
                      <span className="text-value">
                        {detailsData.ELEMENT_SET_NO}
                      </span>
                    </div>{" "}
                    <div className="item-list">
                      <span className="text-label">Epoch:</span>
                      <span className="text-value">{detailsData.EPOCH}</span>
                    </div>
                    <div className="item-list">
                      <span className="text-label">Epoch:</span>
                      <span className="text-value">{detailsData.EPOCH}</span>
                    </div>
                    <div className="item-list">
                      <span className="text-label">Inclimanation:</span>
                      <span className="text-value">
                        {detailsData.INCLINATION}
                      </span>
                    </div>
                    <div className="item-list">
                      <span className="text-label">Mean Anomaly:</span>
                      <span className="text-value">
                        {detailsData.MEAN_ANOMALY}
                      </span>
                    </div>
                    <div className="item-list">
                      <span className="text-label">Mean Motion:</span>
                      <span className="text-value">
                        {detailsData.MEAN_MOTION}
                      </span>
                    </div>
                    <div className="item-list">
                      <span className="text-label">Mean Motion Ddot:</span>
                      <span className="text-value">
                        {detailsData.MEAN_MOTION_DDOT}
                      </span>
                    </div>
                    <div className="item-list">
                      <span className="text-label">Mean Motion Dot:</span>
                      <span className="text-value">
                        {detailsData.MEAN_MOTION_DOT}
                      </span>
                    </div>
                    <div className="item-list">
                      <span className="text-label">Norad Cat Id:</span>
                      <span className="text-value">
                        {detailsData.NORAD_CAT_ID}
                      </span>
                    </div>
                    <div className="item-list">
                      <span className="text-label">Ra Of Asc Node:</span>
                      <span className="text-value">
                        {detailsData.RA_OF_ASC_NODE}
                      </span>
                    </div>
                    <div className="item-list">
                      <span className="text-label">Rev At Epoch:</span>
                      <span className="text-value">
                        {detailsData.REV_AT_EPOCH}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default Home;
