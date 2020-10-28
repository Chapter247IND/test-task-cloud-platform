import React, { useState } from "react";
import { Container, Button, Col, Card, Table, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { satteliteDetailRequest } from "../Action";

const Home = () => {
  //State for sattellite number
  const [satteliteNumber, setSatteliteNumber] = useState(10000);

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

  return (
    <section className="banner-wrap">
      <div className="img-block">
        <img
          src={"../images/home-background.jpg"}
          alt=""
          className="img-responsive"
        />
      </div>
      <div className={"caption-block-content"}>
        <Container>
          <h5>
            New ways to get GP data now available! Up until now, we've used the
            TLE format to ingest data into SGP4. With the growth of the catalog
            soon to exceed the current range of 5-digit catalog numbers, you may
            be wondering how we will handle that.{" "}
          </h5>
        </Container>
      </div>
      <div className="caption-block">
        <Container>
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
              onClick={() => handleSatelliteDetails()}
              size={"sm"}
            >
              Check Sattelite
            </Button>
          </div>
          {satteliteError ? (
            <div className={"text-danger"}>
              <b>{satteliteError}</b>
            </div>
          ) : null}
        </Container>
      </div>
      <div className="caption-block-left">
        <Container>
          <Card className={"height-auto"}>
            <Card.Header>
              <Row>
                <Col md={6}>
                  <h3 className="your-card">Satellite List</h3>
                </Col>
              </Row>
            </Card.Header>
            {/* <div className="form-wrap animated fadeIn"> */}
            <Card.Body className={"overflow-auto"}>
              <Col md={"12"}>
                <Table responsive bordered>
                  <thead>
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
                                <Button size={"sm"}>View</Button>
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      <tr className="text-center">
                        <div>No data found</div>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </section>
  );
};

export default Home;
