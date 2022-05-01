import { Badge } from "react-bootstrap";

const PriorityBadge = ({ priority }) => {
  return (
    <>
      {priority === "Low" ? (
        <Badge pill bg="dark" className="ms-1">
          {priority}
        </Badge>
      ) : priority === "Medium" ? (
        <Badge pill bg="success" className="ms-1">
          {priority}
        </Badge>
      ) : priority === "High" ? (
        <Badge pill bg="warning" className="ms-1">
          {priority}
        </Badge>
      ) : priority === "Very High" ? (
        <Badge pill bg="danger" className="ms-1">
          {priority}
        </Badge>
      ) : null}
    </>
  );
};

export default PriorityBadge;
