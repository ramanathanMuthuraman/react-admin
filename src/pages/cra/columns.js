import DateRender from "../../components/DateRender/DateRender";
import ControlAutomation from "../../components/TableCells/ControlAutomation";
import ControlEffectiveness from "../../components/TableCells/ControlEffectiveness";
import RegulatoryImpact from "../../components/TableCells/RegulatoryImpact";
import MonitoringMechanism from "../../components/TableCells/MonitoringMechanism";

const columns = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Remarks",
    accessor: "remarks",
  },
  {
    Header: "Circular Ref No",
    accessor: "circularRefNo",
  },
  {
    Header: "Circular Date",
    accessor: "circularDate",
    Cell: (props) => {
      return <DateRender value={props.value} />;
    },
  },
  {
    Header: "Reg Guidelines",
    accessor: "regGuidelines",
  },
  {
    Header: "Control Desc",
    accessor: "controlDesc",
    width: 200,
  },
  {
    Header: "Breach",
    accessor: "breach",
  },
  {
    Header: "Threshold Name",
    accessor: "thresholdName",
  },
  {
    Header: "Process Improvement",
    accessor: "processImprovement",
  },
  {
    Header: "Prod Name",
    accessor: "prodName",
  },
  {
    Header: "Policy Details",
    accessor: "policyDetails",
  },
  {
    Header: "Relavant Policy",
    accessor: "relavantPolicy",
  },
  {
    Header: "Process Note",
    accessor: "processNote",
  },
  {
    Header: "Control Effectiveness",
    accessor: "controlEffectiveness",
    Cell: (props) => {
      return <ControlEffectiveness value={props.value} />;
    },
  },
  {
    Header: "Monitor Mechanism",
    accessor: "monitorMechanism",
    Cell: (props) => {
      return <MonitoringMechanism value={props.value} />;
    },
  },
  {
    Header: "Control Automation",
    accessor: "controlAutomation",
    Cell: (props) => {
      return <ControlAutomation value={props.value} />;
    },
  },
  {
    Header: "Regulatory Impact",
    accessor: "regulatoryImpact",
    Cell: (props) => {
      return <RegulatoryImpact value={props.value} />;
    },
  },
  {
    Header: "Regulation Risk",
    accessor: "regulationRisk",
  },
  {
    Header: "Average Risk",
    accessor: "averageRisk",
  },
  {
    Header: "S. No.",
    accessor: "sno",
  },
  {
    Header: "Approval Status",
    accessor: "status",
  },
];

export default columns;
