import Header from "../components/Header";
import { ChildrenProps } from "../utils/childrenProps";

const DefaultLayout = ({ children }: ChildrenProps) => {
  return (
    <div className="wrapper">
      <Header />
      <>{children}</>
    </div>
  );
};

export default DefaultLayout;
