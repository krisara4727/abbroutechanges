import React from "react";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { cloneDeep, isEqual } from "lodash";
import { ReturnFontSize } from "../util";
import { Loader } from "./Loader";

interface stateProps {
  data: any;
  columnsDef: any;
  background: string | undefined;
  fontColor: string | undefined;
  fontSize: any;
  fontStyle: any;
  textAlign: any;
  selectedRow: any;
  bg: any;
  buttonColor: any;
  saveButton: any;
  newButton: any;
  resetButton: any;
  loading: any;
  // pm: any;
  pageSize: any;
}
class TabulatorComponent extends React.Component<
  TabulatorComponentProps,
  stateProps
> {
  constructor(props: TabulatorComponentProps) {
    super(props);
    this.state = {
      data: [],
      columnsDef: [],
      background: this.props.cellBackground,
      fontColor: this.props.textColor,
      fontSize: this.props.textSize,
      fontStyle: this.props.fontStyle,
      textAlign: this.props.horizontalAlignment,
      selectedRow: this.props.editedRowIndex,
      bg: this.props.bgColor,
      buttonColor: this.props.color,
      saveButton: this.props.saveButtonLabel,
      newButton: this.props.newButtonLabel,
      resetButton: this.props.resetButtonLabel,
      loading: this.props.loading,
      pageSize: this.props.pageSize,
      // pm: this.props.primaryColumns,
    };
  }
  el: any = React.createRef();
  tabulator: any = null;
  tableDataHolder: any = [];
  columnsDefHolder: any = [];
  componentDidMount() {
    if (this.props.tableData) {
      this.generateGrid(
        this.props.tableData,
        this.props.columnDefinition,
        this.state.background ? this.state.background : "white",
        this.state.fontColor ? this.state.fontColor : "black",
        this.state.fontSize ? ReturnFontSize(this.state.fontSize) : "16px",
        this.state.fontStyle ? this.state.fontStyle : "normal",
        this.state.textAlign,
      );
    }
    this.forceUpdate();
  }

  shouldComponentUpdate(nextProps: any) {
    if (nextProps && nextProps.pageSize !== this.state.pageSize) {
      this.setState({ pageSize: nextProps.pageSize });
      this.forceUpdate();
    }
    if (nextProps && nextProps.loading !== this.state.loading) {
      this.setState({ loading: nextProps.loading });
      this.forceUpdate();
    }
    if (nextProps && nextProps.bgColor !== this.state.bg) {
      this.setState({ bg: nextProps.bgColor });
      this.forceUpdate();
    }
    if (nextProps && nextProps.newButtonLabel !== this.state.newButton) {
      this.setState({ newButton: nextProps.newButtonLabel });
      this.forceUpdate();
    }
    if (nextProps && nextProps.resetButtonLabel !== this.state.resetButton) {
      this.setState({ resetButton: nextProps.resetButtonLabel });
      this.forceUpdate();
    }
    if (nextProps && nextProps.saveButtonLabel !== this.state.saveButton) {
      this.setState({ saveButton: nextProps.saveButtonLabel });
      this.forceUpdate();
    }
    if (nextProps && nextProps.color !== this.state.buttonColor) {
      this.setState({ buttonColor: nextProps.color });
      this.forceUpdate();
    }
    if (nextProps && nextProps.editedRowIndex !== this.state.selectedRow) {
      this.setState({ selectedRow: nextProps.editedRowIndex });
    }
    if (nextProps && nextProps.cellBackground !== this.state.background) {
      this.setState({ background: nextProps.cellBackground });
      this.generateGrid(
        this.props.tableData,
        this.props.columnDefinition,
        nextProps.cellBackground,
        this.state.fontColor,
        ReturnFontSize(this.state.fontSize),
        this.state.fontStyle,
        this.state.textAlign,
      );
      return true;
    }
    if (nextProps && nextProps.textColor !== this.state.fontColor) {
      this.setState({ fontColor: nextProps.textColor });
      this.generateGrid(
        this.props.tableData,
        this.props.columnDefinition,
        this.state.background,
        nextProps.textColor,
        ReturnFontSize(this.state.fontSize),
        this.state.fontStyle,
        this.state.textAlign,
      );
      return true;
    }
    if (nextProps && nextProps.textSize !== this.state.fontSize) {
      this.setState({ fontSize: nextProps.textSize });
      this.generateGrid(
        this.props.tableData,
        this.props.columnDefinition,
        this.state.background,
        this.state.fontColor,
        ReturnFontSize(nextProps.textSize),
        this.state.fontStyle,
        this.state.textAlign,
      );
      return true;
    }
    if (nextProps && nextProps.fontStyle !== this.state.fontStyle) {
      this.setState({ fontStyle: nextProps.fontStyle });
      this.generateGrid(
        this.props.tableData,
        this.props.columnDefinition,
        this.state.background,
        this.state.fontColor,
        ReturnFontSize(nextProps.textSize),
        nextProps.fontStyle,
        this.state.textAlign,
      );
      return true;
    }
    if (nextProps && nextProps.horizontalAlignment !== this.state.textAlign) {
      this.setState({ textAlign: nextProps.horizontalAlignment });
      this.generateGrid(
        this.props.tableData,
        this.props.columnDefinition,
        this.state.background,
        this.state.fontColor,
        ReturnFontSize(nextProps.textSize),
        nextProps.fontStyle,
        nextProps.horizontalAlignment,
      );
      return true;
    }

    const isColumnDef = isEqual(
      nextProps.columnDefinition,
      this.columnsDefHolder,
    );
    if (
      nextProps &&
      nextProps.columnDefinition &&
      nextProps.columnDefinition.length > 0 &&
      !isColumnDef
    ) {
      this.columnsDefHolder = nextProps.columnDefinition;
      this.generateGrid(
        nextProps.tableData,
        nextProps.columnDefinition,
        this.state.background,
        this.state.fontColor,
        ReturnFontSize(nextProps.textSize),
        nextProps.fontStyle,
        nextProps.horizontalAlignment,
      );
    }

    const isSame = isEqual(nextProps.tableData, this.tableDataHolder);
    if (nextProps && nextProps.tableData && !isSame) {
      this.generateGrid(
        nextProps.tableData,
        nextProps.columnDefinition,
        nextProps.cellBackground,
        nextProps.textColor,
        ReturnFontSize(nextProps.textSize),
        nextProps.fontStyle,
        nextProps.horizontalAlignment,
      );
      return true;
    }
    // if (
    //   nextProps &&
    //   JSON.stringify(nextProps.primaryColumns) !== JSON.stringify(this.state.pm)
    // ) {
    //   this.setState({ pm: nextProps.primaryColumns });
    //   let changeData = false;
    //   let columnName = "";
    //   for (let i = 0; i < this.state.columnsDef.length; i++) {
    //     columnName = this.state.columnsDef[i].field;
    //     let flag = false;
    //     console.log(
    //       " changed columns ",
    //       columnName,
    //       this.state.data,
    //       this.props.primaryColumns,
    //     );
    //     for (let j = 0; j < this.state.data.length; j++) {
    //       if (
    //         this.props.primaryColumns[columnName].computedValue !== undefined &&
    //         this.props.primaryColumns[columnName].computedValue[j] !== null &&
    //         this.state.data[j][columnName] !==
    //           this.props.primaryColumns[columnName].computedValue[j]
    //       ) {
    //         console.log(
    //           " changed columns ",
    //           this.state.data[j][columnName],
    //           columnName,
    //         );
    //         flag = true;
    //         changeData = true;
    //         break;
    //       }
    //     }
    //     if (flag) break;
    //   }
    //   const data = [];
    //   console.log("** * ** * outside object ", columnName);
    //   if (changeData && columnName.length > 0) {
    //     for (let i = 0; i < this.props.tableData.length; i++) {
    //       const object = { ...this.props.tableData[i] };
    //       object[columnName] = this.props.primaryColumns[
    //         columnName
    //       ].computedValue[i];
    //       console.log(" * ** ** * ** *inside object", object);
    //       data.push(object);
    //     }
    //     this.props.updateComputedValue(data);
    //   }
    //   console.log(" * ** ** * ** *inside data", data, this.state.data);
    //   this.callFunction(data);
    //   return true;
    // }
    return false;
  }

  // callFunction(data: any) {
  //   this.tabulator.replaceData(data);
  // }

  private generateGrid(
    data: any,
    columnsDef: any,
    bgColor: any,
    fontColor: any,
    fontsize: any,
    style: string,
    textAlign: string,
  ) {
    if (!textAlign) {
      textAlign = "left";
    }
    let weight = "normal";
    let italic = "normal";
    if (style.includes("BOLD")) {
      weight = "bold";
    }
    if (style.includes("ITALIC")) {
      italic = "italic";
    }
    let clonedData = cloneDeep(data);
    this.tableDataHolder = data;
    if (
      Array.isArray(columnsDef) &&
      columnsDef.length > 0 &&
      Array.isArray(data) &&
      data.length > 0
    ) {
      let changeData = false;
      let columnName = "";
      for (let i = 0; i < columnsDef.length; i++) {
        columnName = columnsDef[i].field;
        let flag = false;
        for (let j = 0; j < data.length; j++) {
          if (
            this.props.primaryColumns[columnName] !== undefined &&
            this.props.primaryColumns[columnName].computedValue !== undefined &&
            this.props.primaryColumns[columnName].computedValue[j] !== null &&
            data[j][columnName] !==
              this.props.primaryColumns[columnName].computedValue[j]
          ) {
            flag = true;
            changeData = true;
            break;
          }
        }
        if (flag) break;
      }
      const newdata = [];
      if (changeData && columnName.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const object = { ...data[i] };
          object[columnName] = this.props.primaryColumns[
            columnName
          ].computedValue[i];
          newdata.push(object);
        }
        clonedData = newdata;
      }
    }
    this.setState({ data: clonedData, columnsDef: columnsDef }, () => {
      this.tabulator = new Tabulator(this.el, {
        data: this.state.data,
        placeholder: "No Data Available",
        columns: this.state.columnsDef,
        layout: "fitColumns",
        movableColumns: true,
        selectable: true,
        rowFormatter: function(row) {
          row.getElement().style.backgroundColor = bgColor;
          row.getElement().style.color = fontColor;
          row.getElement().style.fontSize = fontsize;
          row.getElement().style.fontWeight = weight;
          row.getElement().style.fontStyle = italic;
          row.getElement().style.textAlign = textAlign.toLowerCase();
          row.getElement().style.borderBottom = "1px ridge gray";
        },
        selectableRollingSelection: false,
        pagination: true,
        paginationSize: this.props.pageSize,
        paginationSizeSelector: true,
        paginationAddRow: "table",
      });
    });
  }

  deleteRow = () => {
    // const cells = this.tabulator.getEditedCells();
    // cells.forEach(function(cell: any) {
    //   // cell.clearEdited();
    //   const oldVal = cell.getOldValue();
    //   if (oldVal !== null) {
    //     cell.restoreOldValue();
    //   }
    // });
    const oldData = [];
    for (let i = 0; i < this.props.tableData.length; i++) {
      oldData.push({ ...this.props.tableData[i] });
    }
    this.tabulator.replaceData(oldData);
  };

  addRow = () => {
    if (
      this.tabulator &&
      this.tabulator.getData() &&
      this.tabulator.getData().length > 0
    ) {
      const sampleRow = this.tabulator.getData()[0];
      const newRow = { ...sampleRow };
      Object.keys(newRow).forEach((i: any) => (newRow[i] = ""));
      this.tabulator.addRow(newRow);
      this.tabulator.replaceData(this.tabulator.getData());
    }
  };

  render() {
    return (
      <div className="w-full flex flex-col">
        <div id="tabulator_table" ref={(el) => (this.el = el)} />
        <div className="ml-auto mt-2">
          {this.props.loading ? (
            <Loader />
          ) : (
            this.props.saveButtonLabel &&
            this.props.saveButtonLabel.length > 0 && (
              <button
                className="py-1 px-2 bg-green-300 rounded-md mr-2 hover:bg-green-600"
                onClick={() => {
                  const cells = this.tabulator.getEditedCells();
                  const aray: any = [];
                  cells.forEach(function(cell: any) {
                    const row = cell.getRow();
                    const index = row.getPosition();
                    if (!aray.includes(index)) {
                      aray.push(index);
                    }
                  });
                  this.props.handleSaveClick(aray, this.tabulator.getData());
                }}
                style={{
                  backgroundColor: "#ff000f",
                  border: "2px solid #ffoaof",
                  borderTopColor: "rgb(255, 0, 15)",
                  borderTopStyle: "solid",
                  borderTopWidth: "2px",
                  borderRightColor: "rgb(255, 0, 15)",
                  borderRightStyle: "solid",
                  borderRightWidth: "2px",
                  borderBottomColor: "rgb(255, 0, 15)",
                  borderBottomStyle: "solid",
                  borderBottomWidth: "2px",
                  borderLeftColor: "rgb(255, 0, 15)",
                  borderLeftStyle: "solid",
                  borderLeftWidth: "2px",
                  color: " #ffffff",
                  fontWeight: 600,
                }}
              >
                {this.props.saveButtonLabel}
              </button>
            )
          )}
          {console.log(" * ** ** *** *laoding ", this.props.loading)}
          {this.props.newButtonLabel && this.props.newButtonLabel.length > 0 && (
            <button
              className="py-1 px-2 mr-2 rounded-md"
              onClick={this.addRow}
              style={{
                backgroundColor: this.props.bgColor,
                border: "2px solid #ffoaof",
                borderTopColor: "rgb(255, 0, 15)",
                borderTopStyle: "solid",
                borderTopWidth: "2px",
                borderRightColor: "rgb(255, 0, 15)",
                borderRightStyle: "solid",
                borderRightWidth: "2px",
                borderBottomColor: "rgb(255, 0, 15)",
                borderBottomStyle: "solid",
                borderBottomWidth: "2px",
                borderLeftColor: "rgb(255, 0, 15)",
                borderLeftStyle: "solid",
                borderLeftWidth: "2px",
                color: this.props.color,
                fontWeight: 600,
              }}
            >
              {this.props.newButtonLabel}
            </button>
          )}
          {this.props.resetButtonLabel &&
            this.props.resetButtonLabel.length > 0 && (
              <button
                className="py-1 px-2  rounded-md"
                onClick={this.deleteRow}
                style={{
                  backgroundColor: this.props.bgColor,
                  border: "2px solid #ffoaof",
                  borderTopColor: "rgb(255, 0, 15)",
                  borderTopStyle: "solid",
                  borderTopWidth: "2px",
                  borderRightColor: "rgb(255, 0, 15)",
                  borderRightStyle: "solid",
                  borderRightWidth: "2px",
                  borderBottomColor: "rgb(255, 0, 15)",
                  borderBottomStyle: "solid",
                  borderBottomWidth: "2px",
                  borderLeftColor: "rgb(255, 0, 15)",
                  borderLeftStyle: "solid",
                  borderLeftWidth: "2px",
                  color: this.props.color,
                  fontWeight: 600,
                }}
              >
                {this.props.resetButtonLabel}
              </button>
            )}
        </div>
      </div>
    );
  }
}

export interface TabulatorComponentProps {
  columnDefinition: any;
  columnType: string;
  height: number;
  primaryColumns: any;
  tableData: any;
  updateAppsmithColumnDefinition: (data: any) => void;
  cellBackground?: string;
  handleSaveClick: (indexArray: any, table: any) => void;
  textColor?: string;
  textSize?: any;
  fontStyle?: string;
  horizontalAlignment?: string;
  editedRowIndex?: any;
  bgColor?: any;
  color?: any;
  newButtonLabel?: any;
  saveButtonLabel?: any;
  resetButtonLabel?: any;
  loading?: any;
  pageSize: any;
  // updateComputedValue: any;
}

export default TabulatorComponent;
