import FormGroup from "./components/Form/FormGroup";
import "./Body.scss";
import Head from "../Header/Head";
const Body = () => {
  return (
    <div className="main-body">
      <Head />
      <div className="form-container">
        <FormGroup
          title="Task Ongoing"
          placeholder="Please insert the ongoing tasks..."
          group="ongoing"
        />
        <FormGroup
          title="Task Completed"
          placeholder="Please insert the completed tasks..."
          group="completed"
        />
        <FormGroup
          title="Task Problemss"
          placeholder="Please insert the problems on the tasks..."
          group="problems"
        />
      </div>
    </div>
  );
};

export default Body;
