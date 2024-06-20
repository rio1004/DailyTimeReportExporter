import "./Head.scss";
import * as ExcelJS from "exceljs";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { useGlobalFunction } from "../../context/getDTRContext";
import { useNavigate } from "react-router-dom";
const Head = () => {
  const [complete, setComplete] = useState<any[]>([]);
  const [ongoing, setOngoing] = useState<any[]>([]);
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { myGlobalFunction } = useGlobalFunction();
  const dtr = useSelector((state) => state.completed.data);
  const navigate = useNavigate(); 
  useEffect(() => {
    const id = localStorage.getItem('id')
    myGlobalFunction(id);
  }, []);
  
  useEffect(() => {
    console.log(dtr);
    const completedData = dtr.filter((item) => item.status == "completed");
    setComplete(completedData);
    const ongoingData = dtr.filter((item) => item.status == "ongoing");
    setOngoing(ongoingData);
    const problemsData = dtr.filter((item) => item.status == "problems");
    setProblems(problemsData);
  }, [dtr]);

  if (complete.length == 0) {
    complete.push({ description: "   " });
  }
  if (ongoing.length == 0) {
    ongoing.push({ description: "   " });
  }
  if (problems.length == 0) {
    problems.push({ description: "   " });
  }
  const logOut = () => {
    localStorage.clear();
    navigate('/login')
  }
  const exportFile = async () => {
    setLoading(true);
    console.log(complete, "completeShit");
    console.log(ongoing, "ongoingShit");
    console.log(problems, "problemsShit");
    try {
      const workbook = new ExcelJS.Workbook();
      const templateUrl = "./exceltemplate.xlsx";
      console.log(templateUrl);

      // Fetch the Excel template file using the Fetch API
      const response = await fetch(templateUrl);
      const arrayBuffer = await response.arrayBuffer();
      console.log(response);
      const dateNow = new Date().toLocaleDateString("en-US");
      console.log(dateNow);

      await workbook.xlsx.load(arrayBuffer);

      const worksheet = workbook.getWorksheet(1);

      const cellC7 = worksheet.getCell("C6");
      const cell12 = worksheet?.getCell("B" + 9);
      const cellA9 = worksheet?.getCell("A9");
      const cellB8 = worksheet?.getCell("B8");
      const cellC4 = worksheet?.getCell("C4"); 
      const titleStyle = cellB8?.style;
      const grayStyle = cellA9.style;
      const initialStyle = cell12.style;
      cellC7.value = dateNow;
      cellC4.value=localStorage.getItem("name")
      let completeInitialNumb: number = 9;
      const merges = worksheet.model.merges;

      complete.forEach((item, index) => {
        const cellComplete = worksheet?.getCell("B" + completeInitialNumb);
        const cellA = worksheet?.getCell("A" + completeInitialNumb);
        const cellH = worksheet?.getCell("H" + completeInitialNumb);
        if (cellA) {
          cellA.style = grayStyle;
        }
        if (cellH) {
          cellH.style = grayStyle;
        }
        if (cellComplete) {
          cellComplete.value = index + 1 + "." + item.description;
          cellComplete.style = initialStyle;
          const isAlreadyMerged = merges.some(
            (range) =>
              range ===
              "B" + completeInitialNumb + ":" + "G" + completeInitialNumb
          );
          if (!isAlreadyMerged) {
            worksheet.mergeCells(
              "B" + completeInitialNumb + ":" + "G" + completeInitialNumb
            );
          }
        }
        completeInitialNumb++;
      });
      worksheet.mergeCells(
        "A" + completeInitialNumb + ":" + "H" + completeInitialNumb
      );
      const breakComplete = worksheet?.getCell("A" + completeInitialNumb);
      if (breakComplete) {
        breakComplete.style = grayStyle;
      }
      worksheet.mergeCells(
        "B" + (completeInitialNumb + 1) + ":" + "G" + (completeInitialNumb + 1)
      );
      const cellAOngoing = worksheet?.getCell("A" + (completeInitialNumb + 1));
      const cellAHngoing = worksheet?.getCell("H" + (completeInitialNumb + 1));
      const cellBOngoing = worksheet?.getCell("B" + (completeInitialNumb + 1));
      if (cellAHngoing) {
        console.log(cellAHngoing);
        cellAHngoing.style = grayStyle;
      }
      if (cellAOngoing) {
        cellAOngoing.style = grayStyle;
      }
      if (cellBOngoing) {
        cellBOngoing.style = titleStyle;
        cellBOngoing.value = "Ongoing Task";
      }

      let OngoingInitialData: number = completeInitialNumb + 2;

      ongoing.forEach((item, index) => {
        const cellComplete = worksheet?.getCell("B" + OngoingInitialData);
        const cellA = worksheet?.getCell("A" + OngoingInitialData);
        const cellH = worksheet?.getCell("H" + OngoingInitialData);
        if (cellA) {
          cellA.style = grayStyle;
        }
        if (cellH) {
          cellH.style = grayStyle;
        }
        if (cellComplete) {
          cellComplete.value = index + 1 + "." + item.description;
          cellComplete.style = initialStyle;
          const isAlreadyMerged = merges.some(
            (range) =>
              range ===
              "B" + OngoingInitialData + ":" + "G" + OngoingInitialData
          );
          if (!isAlreadyMerged) {
            worksheet.mergeCells(
              "B" + OngoingInitialData + ":" + "G" + OngoingInitialData
            );
          }
        }
        OngoingInitialData++;
      });
      worksheet.mergeCells(
        "A" + OngoingInitialData + ":" + "H" + OngoingInitialData
      );
      const breakOngoing = worksheet?.getCell("A" + OngoingInitialData);
      if (breakOngoing) {
        breakOngoing.style = grayStyle;
      }
      worksheet.mergeCells(
        "B" + (OngoingInitialData + 1) + ":" + "G" + (OngoingInitialData + 1)
      );
      const cellAProblems = worksheet?.getCell("A" + (OngoingInitialData + 1));
      const cellAHProblems = worksheet?.getCell("H" + (OngoingInitialData + 1));
      const cellBOProblems = worksheet?.getCell("B" + (OngoingInitialData + 1));
      if (cellAHProblems) {
        console.log(cellAHProblems);
        cellAHProblems.style = grayStyle;
      }
      if (cellAProblems) {
        cellAProblems.style = grayStyle;
      }
      if (cellBOProblems) {
        cellBOProblems.style = titleStyle;
        cellBOProblems.value =
          "Dealing with ongoing tasks has problems encountered, solutions, and how long it can be handled";
      }
      let problemsInitialData: number = OngoingInitialData + 2;
      problems.forEach((item, index) => {
        const cellComplete = worksheet?.getCell("B" + problemsInitialData);
        const cellA = worksheet?.getCell("A" + problemsInitialData);
        const cellH = worksheet?.getCell("H" + problemsInitialData);
        if (cellA) {
          cellA.style = grayStyle;
        }
        if (cellH) {
          cellH.style = grayStyle;
        }
        if (cellComplete) {
          cellComplete.value = index + 1 + "." + item.description;
          cellComplete.style = initialStyle;
          const isAlreadyMerged = merges.some(
            (range) =>
              range ===
              "B" + problemsInitialData + ":" + "G" + problemsInitialData
          );
          if (!isAlreadyMerged) {
            worksheet.mergeCells(
              "B" + problemsInitialData + ":" + "G" + problemsInitialData
            );
          }
        }
        problemsInitialData++;
      });
      const modifiedFile = await workbook.xlsx.writeBuffer();
      const blob = new Blob([modifiedFile], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Daily Work Report (iyo) ${dateNow} .xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="head">
      <div className="head-title">
        <h1>Daily Report Exporter</h1>
        <p>Jun 5, 2024</p>
        <div className="export-btn">
          <button onClick={exportFile}>
            {!loading ? <p>Export</p> : <Loader />}
          </button>
        </div>
      </div>
      <div className="export-btn">
        <button onClick={logOut}>
          <p>Bounce na</p>
        </button>
      </div>
    </div>
  );
};
export default Head;
