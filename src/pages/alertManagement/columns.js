import DateRender from "../../components/DateRender/DateRender";

const columns = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Alert Id",
    accessor: "alertId",
  },
  {
    Header: "Score",
    accessor: "score",
  },
  {
    Header: "Focus Type",
    accessor: "focusType",
  },
  {
    Header: "Customer Name",
    accessor: "customerName",
  },
  {
    Header: "Created",
    accessor: "created",
    Cell: (props) => {
      return <DateRender value={props.value} />;
    },
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Threshold Name",
    accessor: "thresholdName",
  },
  {
    Header: "Risk Score",
    accessor: "riskScore",
  },
  {
    Header: "Employee Name",
    accessor: "employeeName",
  },
  {
    Header: "Customer Id",
    accessor: "customerId",
  },
  {
    Header: "Date Created",
    accessor: "dateCreated",
    Cell: (props) => {
      return <DateRender value={props.value} />;
    },
  },
];

export default columns;
