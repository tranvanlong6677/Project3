import { Card } from "react-bootstrap";
import { ImLocation2 } from "react-icons/im";
import { FaChartColumn } from "react-icons/fa6";
import { IDataCarItem } from "../../../utils/childrenProps";

const CarItem = ({ data }: { data: IDataCarItem }) => {
  if (!data) {
    console.log(data);
  }
  return (
    <div className="col-12 col-sm-6 col-lg-3 mb-3">
      <Card className="w-90 mx-auto">
        <Card.Img
          variant="top"
          src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hanoi/toyota_innova_2016/p/g/2022/05/01/11/qxiMOsObX7BjyyC6fVlcjA.jpg"
        />
        <Card.Body>
          <Card.Title>TOYOTA INNOVA 2016</Card.Title>
          <Card.Text>
            <ImLocation2 />
            <span className="location">Quận Ba Đình, Hà Nội</span>
          </Card.Text>
          <hr />
          <Card.Text>
            <FaChartColumn />
            <span className="trips-quantity mx-2">27 chuyến </span>
            <span className="price mx-4 mx-sm-2 mx-lg-0">
              <b>800K</b>/ngày
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CarItem;
