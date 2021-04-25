import IndeterminateCheckbox from "../../components/IndeterminateCheckbox/IndeterminateCheckbox";

const hooksCallback = (hooks) => {
  hooks.visibleColumns.push((columns) => [
    // Let's make a column for selection
    {
      id: "selection",
      width: 100,
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox
      Header: (props) => {
        const { getToggleAllRowsSelectedProps } = props;
        const { onChange, ...rest } = getToggleAllRowsSelectedProps();
        const onCheckboxSelectionUpdate = (event) => {
          onChange(event);
        };
        return (
          <div>
            <IndeterminateCheckbox
              {...rest}
              onChange={onCheckboxSelectionUpdate}
            />
          </div>
        );
      },
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: (props) => {
        const { row } = props;
        const { onChange, ...rest } = row.getToggleRowSelectedProps();
        const onCheckboxSelectionUpdate = (event) => {
          onChange(event);
        };
        return (
          <div>
            <IndeterminateCheckbox
              {...rest}
              onChange={onCheckboxSelectionUpdate}
            />
          </div>
        );
      },
    },
    ...columns,
  ]);
};

export { hooksCallback };
