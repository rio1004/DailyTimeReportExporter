import { useSelector } from "react-redux";
import "./Head.scss";
import * as ExcelJS from "exceljs";
const Head = () => {
  const data = useSelector((state) => state.completed.data);
  const completedData = data.filter((item) => item.group == "completed");
  const ongoingData = data.filter((item) => item.group == "ongoing");
  const problemsData = data.filter((item) => item.group == "problems");
  if (completedData.length == 0) {
    completedData.push({ data: "   " });
  }
  if (ongoingData.length == 0) {
    ongoingData.push({ data: "   " });
  }
  if (problemsData.length == 0) {
    problemsData.push({ data: "   " });
  }
  const exportFile = async () => {
    console.log(completedData, "completeShit");
    console.log(ongoingData, "ongoingShit");
    console.log(problemsData, "problemsShit");
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
      const titleStyle = cellB8?.style;
      const grayStyle = cellA9.style;
      const initialStyle = cell12.style;
      cellC7.value = dateNow;
      let completeInitialNumb: number = 9;
      const merges = worksheet.model.merges;

      completedData.forEach((item, index) => {
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
          cellComplete.value = index + 1 + "." + item.data;
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

      ongoingData.forEach((item, index) => {
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
          cellComplete.value = index + 1 + "." + item.data;
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
      problemsData.forEach((item, index) => {
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
          cellComplete.value = index + 1 + "." + item.data;
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="head">
      <div className="head-title">
        <h1>Daily Report Exporter</h1>
        <p>Jun 5, 2024</p>
      </div>
      <div className="export-btn">
        <button onClick={exportFile}>Export</button>
      </div>
    </div>
  );
};
export default Head;
