import { FaPlus } from "react-icons/fa6";
import Box from "../Box/Box";
import { ChangeEvent, useState } from "react";
import "./FormGroup.scss";
import { deleteDTR, postDTR } from "../../../../api";
import { useSelector } from "react-redux";
import { useGlobalFunction } from "../../../../context/getDTRContext";
import Loader from "../../../Loader";
interface FormProps {
  title: string;
  placeholder: string;
  group: string;
}
interface boxObjecs {
  id: number;
  data: string;
}
const FormGroup = (props: FormProps) => {
  const [inputVal, setInputVal] = useState<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);
  const { myGlobalFunction } = useGlobalFunction();
  const storeData = useSelector((state) => state.completed.data);
  const boxData = storeData.filter((item) => item.status == props.group);
  const [addLoader, setAddLoader] = useState<boolean>(false);
  const id = localStorage.getItem("id");

  const addBoxes = async (data: string) => {
    if (!data) {
      setIsErr(true);
      return;
    }
    setAddLoader(true);
    const res = await postDTR("/DTR", {
      desc: data,
      status: props.group,
      userId: id,
    });
    myGlobalFunction(id);
    setIsErr(false);
    setAddLoader(false);
  };
  const removeBox = async (sheesh: number) => {
    const res = await deleteDTR(sheesh);
    myGlobalFunction(id);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
  };
  const BoxItems = boxData.map((item) => {
    const title = item.description;
    return (
      <Box
        title={title}
        id={item._id}
        deleteBoxChild={removeBox}
        key={item.id}
      />
    );
  });

  const Add = () => {
    if (!addLoader) {
      return (
        <FaPlus
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => addBoxes(inputVal)}
        />
      );
    }
    return <Loader bgColor="white" />;
  };
  return (
    <div className="form-group">
      <p>
        {props.title} <span>*</span>
      </p>
      <div className="input-group">
        <input
          type="text"
          placeholder={props.placeholder}
          value={inputVal}
          onChange={handleChange}
          className={isErr ? "errInput" : ""}
        />
        <div className="plus-icons">
          <Add />
        </div>
      </div>
      {isErr && (
        <p className="err">Tanga parang hindi developer! lagyan mo laman!</p>
      )}
      <div className="boxes">{BoxItems}</div>
    </div>
  );
};
export default FormGroup;
