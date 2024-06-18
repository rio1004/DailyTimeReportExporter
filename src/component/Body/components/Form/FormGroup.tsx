import { CiSquarePlus } from "react-icons/ci";
import Box from "../Box/Box";
import { ChangeEvent, useEffect, useState } from "react";
import "./FormGroup.scss";

import { getDTR, postDTR } from "../../../../api";
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
  const [boxes, setBoxes] = useState<boxObjecs[]>([]);
  const [boxItems, setBoxItems] = useState([]);
  const [inputVal, setInputVal] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [isErr, setIsErr] = useState<boolean>(false);
  const [loadData, setLoadData] = useState<boolean>(false);

  const getDTRData = async () => {
    setLoadData(true);
    try {
      const res = await getDTR("/DTR");
      console.log(res);
      setBoxes(res.filter((item) => item.status == props.group));
      setLoadData(false);
    } catch (err) {
      console.log(err);
      setLoadData(false);
    }
  };
  const addBoxes = async (data: string) => {
    if (!data) {
      setIsErr(true);
      return;
    }
    const res = await postDTR("/DTR", {
      description: data,
      status: props.group,
    });
    getDTRData();
    setIsErr(false);
  };
  const removeBox = (sheesh: number) => {
    const params = {
      id: sheesh,
      group: props.group,
    };
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
  };

  const BoxItems = boxes.map((item) => {
    const title = item.description;
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
    getDTRData();
  }, []);
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
