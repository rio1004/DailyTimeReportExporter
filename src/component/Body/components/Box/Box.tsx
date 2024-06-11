import { HiOutlineTrash } from "react-icons/hi2";
import "./Box.scss";
interface boxProps {
  title: string;
  id: number;
  deleteBoxChild: (id: number) => void;
}
const Box = (props: boxProps) => {
  const deleteBox = (id: number) => {
    props.deleteBoxChild(id);
  };
  return (
    <div className="box">
      <p>{props.title}</p>
      <HiOutlineTrash
        className="del-icon"
        onClick={() => deleteBox(props.id)}
      />
    </div>
  );
};
export default Box;
