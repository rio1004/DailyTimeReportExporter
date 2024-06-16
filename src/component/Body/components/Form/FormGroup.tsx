import { CiSquarePlus } from "react-icons/ci";
import Box from "../Box/Box";
import { ChangeEvent, useEffect, useState } from "react";
import "./FormGroup.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addData,
  removeData,
} from "../../../../features/completed/completeSlice";
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
  const [boxes, setBoxes] = useState<boxObjecs[]>([]);
  const [inputVal, setInputVal] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [isErr, setIsErr] = useState<boolean>(false);
  const boxData = useSelector((state) => state.completed.data);
  
  const dispatch = useDispatch();

  const addBoxes = (data: string) => {
    if (!data) {
      setIsErr(true);
      return;
    }
    setId(id + 1);
    console.log(id);
    dispatch(addData({ id: id, data, group: props.group }));
    setInputVal("");
    setIsErr(false);
  };
  const removeBox = (sheesh: number) => {
    const params = {
      id: sheesh, 
      group: props.group
    }
    dispatch(removeData(params));
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
  };
  const BoxItems = boxes.map((item) => {
    const title = item.data;
    return (
      <Box
        title={title}
        id={item.id}
        deleteBoxChild={removeBox}
        key={item.id}
      />
    );
  });
  useEffect(() => {
    console.log(boxData)
    setBoxes(boxData.filter((item) => item.group == props.group));
  }, [boxData]);
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
