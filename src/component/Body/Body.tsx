import FormGroup from "./components/Form/FormGroup";
import "./Body.scss";
const Body = () => {
  return (
    <div className="main-body">
      <FormGroup title="Task Ongoing" placeholder="Please insert the ongoing tasks..."  group="ongoing"/>
      <FormGroup title="Task Completed" placeholder="Please insert the completed tasks..." group="completed"/>
      <FormGroup title="Task Problemss" placeholder="Please insert the problems on the tasks..." group="problems" />
    </div>
  );
};

export default Body;
