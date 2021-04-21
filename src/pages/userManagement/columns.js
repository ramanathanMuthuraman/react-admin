const columns = [
  {
    Header: "User name",
    accessor: "username",
  },
  {
    Header: "First name",
    accessor: "firstname",
  },
  {
    Header: "Last name",
    accessor: "lastname",
  },
  {
    Header: "Middle Name",
    accessor: "middlename",
  },
  {
    Header: "Employee ID",
    accessor: "empId",
  },
  {
    Header: "Department",
    accessor: "department",
  },
  {
    Header: "Mobile Number",
    accessor: "mobileno",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Modules",
    accessor: "modules",
    Cell: (props) => {
      return <>{props.value.join(",")}</>;
    },
  },
  {
    Header: "Role Name",
    accessor: "roleName",
  },
];

export default columns;
