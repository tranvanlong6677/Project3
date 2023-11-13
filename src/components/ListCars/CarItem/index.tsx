import { Card } from "react-bootstrap";
import { ImLocation2 } from "react-icons/im";
import { FaChartColumn } from "react-icons/fa6";
import { IDataCarItem } from "../../../utils/childrenProps";
import { listDistricts } from "../../../utils/districts";
import { useEffect, useState } from "react";
const CarItem = ({ data }: { data: IDataCarItem }) => {
  const [addressString, setAddressString] = useState<string>();

  useEffect(() => {
    console.log(">>> check data car item", data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listDistricts?.forEach((item: any) => {
      if (item?.code === data?.address?.districtCode) {
        setAddressString(item?.path);
      }
    });
  }, []);
  return (
    <div className="col-12 col-sm-6 col-lg-3 mb-3">
      <Card className="w-90 mx-auto">
        <div
          className="img-container"
          style={{
            height: "200px",
          }}
        >
          <Card.Img
            variant="top"
            src={`http://localhost:8888/static/image/${data._id}.jpg`}
            className="mh-50"
            style={{
              height: "100%",
              objectFit: "cover",
              width: "100%",
              objectPosition: "center",
            }}
          />
        </div>
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text>
            <ImLocation2 />
            <span className="location">{addressString}</span>
          </Card.Text>
          <hr />
          <Card.Text>
            <FaChartColumn />
            <span className="trips-quantity mx-2">
              {data.quantity_of_trips}
              {" chuyến"}
            </span>
            <br />
            <span className="price mx-4 mx-sm-2 mx-lg-0">
              <b>{data.price_per_day / 1000}K</b>/ngày
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CarItem;
