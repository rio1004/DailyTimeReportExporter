import { CiSquarePlus } from "react-icons/ci";
import Box from "../Box/Box";
import { ChangeEvent, useEffect, useState } from "react";
import "./FormGroup.scss";

import { deleteDTR, getDTR, postDTR } from "../../../../api";
import { useSelector } from "react-redux";
import { useGlobalFunction } from "../../../../context/getDTRContext";
// import Loader from "../../../Loader";
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
  const {myGlobalFunction} = useGlobalFunction();
  const storeData = useSelector(state => state.completed.data);
  const boxData = storeData.filter(item=> item.status == props.group)
  const addBoxes = async (data: string) => {
    if (!data) {
      setIsErr(true);
      return;
    }
    const res = await postDTR("/DTR", {
      description: data,
      status: props.group,
      userId: localStorage.getItem('id')
    });
    myGlobalFunction();
    setIsErr(false);
  };
  const removeBox = async (sheesh: number) => {
    const res = await deleteDTR(sheesh);
    myGlobalFunction()
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
        <CiSquarePlus
          style={{ fontSize: "50px", cursor: "pointer" }}
          onClick={() => addBoxes(inputVal)}
        />
      </div>
      {isErr && (
        <p className="err">Tanga parang hindi developer! lagyan mo laman!</p>
      )}
      <div className="boxes">{BoxItems}</div>
    </div>
  );
};
export default FormGroup;
