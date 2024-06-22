import { HiOutlineTrash } from "react-icons/hi2";
import "./Box.scss";
import Loader from "../../../Loader";
import { useState } from "react";
interface boxProps {
  title: string;
  id: number;
  deleteBoxChild: (id: number) => void;
}
const Box = (props: boxProps) => {
  const [delLoader, setDelLoader] = useState<boolean>(false);
  const deleteBox = async (id: number) => {
    setDelLoader(true);
    await props.deleteBoxChild(id);
    setDelLoader(false);
  };
  const Delete = () => {
    if (!delLoader) {
      return (
        <HiOutlineTrash
          className="del-icon"
          onClick={() => deleteBox(props.id)}
        />
      );
    } else {
      return <Loader bgColor={"black"} />;
    }
  };

  return (
    <div className="box">
      <p>{props.title}</p>
      <Delete />
    </div>
  );
};
export default Box;
