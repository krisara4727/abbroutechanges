import React, { lazy, Suspense } from "react";
import {
  merge,
  without,
  isEmpty,
  startCase,
  camelCase,
  isEqual,
  sortBy,
} from "lodash";

import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";
import { DerivedPropertiesMap } from "utils/WidgetFactory";

import tablePropertyPaneConfig from "./tablePropertyPaneConfig";
import { BatchPropertyUpdatePayload } from "actions/controlActions";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import Skeleton from "components/utils/Skeleton";
import { getEditorConfig } from "./getUpdatedColumnDef";
import derivedProperties from "widgets/TableWidget/widget/parseDerivedProperties";
import { retryPromise } from "utils/AppsmithUtils";

const TabulatorComponent = lazy(() =>
  retryPromise(() => import("../component")),
);

class TabulatorWidget extends BaseWidget<TabulatorWidgetProps, WidgetState> {
  constructor(props: TabulatorWidgetProps) {
    super(props);
    this.state = {
      columnDefinition: {},
      data: [],
      editedRow: this.props.editedRowIndex,
      bgColor: "",
      color: "",
      loading: false,
    };
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.updateSelectedRow = this.updateSelectedRow.bind(this);
    // this.updateComputedValues = this.updateComputedValues.bind(this);
    window.localStorage.setItem("buttonBackgroundColor", "red");
    window.localStorage.setItem("buttonColor", "white");
  }
  rows: any = [];
  rowIndices: any = [];
  latestColumnDef: any = [];
  static getPropertyPaneConfig() {
    return tablePropertyPaneConfig;
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      sanitizedTableData: `{{(()=>{${derivedProperties.getSanitizedTableData}})()}}`,
      filteredTableData: `{{(()=>{ ${derivedProperties.getFilteredTableData}})()}}`,
      tableColumns: `{{(()=>{${derivedProperties.getTableColumns}})()}}`,
    };
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {};
  }

  static getMetaPropertiesMap(): Record<string, any> {
    return {};
  }

  componentDidMount() {
    this.setState({
      data: this.props.tableData,
      columnDefinition: this.props.primaryColumns,
    });
    this.setState({
      bgColor: window.localStorage.getItem("buttonBackgroundColor"),
    });
    this.setState({
      color: window.localStorage.getItem("buttonColor"),
    });
  }

  componentDidUpdate(prevProps: any) {
    if (
      window.localStorage.getItem("buttonBackgroundColor") != this.state.bgColor
    ) {
      this.setState({
        bgColor: window.localStorage.getItem("buttonBackgroundColor"),
      });
    }
    if (window.localStorage.getItem("buttonColor") != this.state.color) {
      this.setState({
        color: window.localStorage.getItem("buttonColor"),
      });
    }
    const isPreviousData = isEmpty(prevProps.tableData);
    if (
      isPreviousData &&
      this.props.tableData &&
      this.props.tableData.length > 0
    ) {
      const columnDef = this.getColumnFromData(this.props.tableData);
      this.setState({
        data: this.props.tableData,
      });
      const currentFields: any = [];
      columnDef.forEach((item: any) => {
        currentFields.push(item.field);
      });
      const prevFields: any = Object.keys(this.props.primaryColumns);
      const isFieldsSame = isEqual(sortBy(currentFields), sortBy(prevFields));
      let isFieldAvail = true;
      currentFields.forEach((colName: any) => {
        if (!prevFields.includes(colName)) {
          isFieldAvail = false;
        }
      });
      if (!isFieldsSame && !isFieldAvail) {
        this.updateAppsmithColumnDefinition(columnDef);
      }
    }
    const currentColumnDef = this.getColumnFromData(this.props.tableData, true);
    const temp1: any = [];
    this.latestColumnDef.forEach((item: any) => {
      temp1.push(item.field);
    });
    const temp2: any = [];
    currentColumnDef.forEach((item: any) => {
      temp2.push(item.field);
    });
    const isSameColumnDef = JSON.stringify(temp1) !== JSON.stringify(temp2);

    if (
      isSameColumnDef &&
      this.props.tableData &&
      this.props.tableData.length > 0
    ) {
      this.latestColumnDef = this.getColumnFromData(this.props.tableData, true);
      this.setState({
        data: this.props.tableData,
      });
    }

    const isSame =
      JSON.stringify(this.props.primaryColumns) ===
      JSON.stringify(this.state.columnDefinition);
    const emptyCheck = isEmpty(this.props.primaryColumns);
    if (!isSame && !emptyCheck) {
      this.setState({ columnDefinition: this.props.primaryColumns });
    }
  }

  updatePrimaryColumnDefinition = (columns: any) => {
    const propertiesToAdd: Record<string, unknown> = {};
    Object.entries(columns).forEach(([key, value]) => {
      const valueObj: any = value;
      Object.entries(valueObj).forEach(([childKey, childValue]) => {
        propertiesToAdd[`primaryColumns.${key}.${childKey}`] = childValue;
      });
    });

    const isSame =
      JSON.stringify(this.state.columnDefinition) ===
      JSON.stringify(propertiesToAdd);
    if (!isSame) {
      this.setState({ columnDefinition: propertiesToAdd });
      this.props.updateWidgetMetaProperty("tableData", columns);
    }
  };
  updateAppsmithColumnDefinition = (columns: any) => {
    const { primaryColumns = {} } = this.props;
    const propertiesToAdd: Record<string, unknown> = {};
    let columnObject: any = {};
    const newColumnIds: any = [];
    columns.forEach((element: any) => {
      columnObject = merge(element, {
        index: 0,
        width: 150,
        id: element.field,
        horizontalAlignment: "LEFT",
        verticalAlignment: "CENTER",
        columnType: "text",
        textSize: "PARAGRAPH",
        enableFilter: true,
        enableSort: true,
        isVisible: true,
        isCellVisible: true,
        isDerived: false,
        label: element.field,
        computedValue: `{{Tabulator1.sanitizedTableData.map((currentRow) => ( currentRow.${element.field}))}}`,
      });
      Object.entries(columnObject).forEach(([key, value]) => {
        propertiesToAdd[
          `primaryColumns.${columnObject["field"]}.${key}`
        ] = value;
      });
      newColumnIds.push(element.field);
      // appsmithPrimaryColumns[columnObject];
    });

    const previousColumnIds = Object.keys(primaryColumns);
    const columnsIdsToDelete = without(previousColumnIds, ...newColumnIds);
    const pathsToDelete: string[] = [];
    if (columnsIdsToDelete.length > 0) {
      Object.entries(primaryColumns).forEach(([key, value]) => {
        pathsToDelete.push(`primaryColumns.${key}`);
      });
    }

    propertiesToAdd["columnOrder"] = newColumnIds;
    const propertiesToUpdate: BatchPropertyUpdatePayload = {
      modify: propertiesToAdd,
    };
    propertiesToUpdate.remove = pathsToDelete;
    this.setState({ columnDefinition: columns });
    super.batchUpdateWidgetProperty(propertiesToUpdate, false);
  };

  onSubmitSuccess(result: any) {
    // if(result.success || true)
    this.props.updateWidgetMetaProperty("editedRowIndex", -1);
    const emptyArray: any = [];
    this.props.updateWidgetMetaProperty("editedRowIndices", emptyArray);
    // this.props.updateWidgetMetaProperty("editedRows", emptyArray);
    this.setState({ editedRow: this.props.editedRowIndex });
    this.setState({ loading: false });
  }

  handleSaveClick(indexArray: any, table: any) {
    this.setState({ loading: true });
    indexArray.sort();
    const rows = [];
    this.props.updateWidgetMetaProperty("editedRowIndices", indexArray);
    for (let i = 0; i < indexArray.length; i++) {
      rows.push(table[indexArray[i]]);
    }
    this.props.updateWidgetMetaProperty("editedRows", rows);
    // this.props.updateWidgetMetaProperty("tableData", table);
    super.executeAction({
      triggerPropertyName: "onSaveClick",
      dynamicString: this.props.onSaveClick,
      event: {
        type: EventType.ON_CLICK,
        callback: this.onSubmitSuccess,
      },
    });
  }

  // saveNewRow() {
  //   super.executeAction({
  //     triggerPropertyName: "createNewRow",
  //     dynamicString: this.props.createNewRow,
  //     event: {
  //       type: EventType.ON_CLICK,
  //     },
  //   });
  // }

  buttonClick(rowIndex: number, field: string, rowInfo: any) {
    this.props.updateWidgetMetaProperty("actionRow", rowInfo);
    super.executeAction({
      triggerPropertyName: "onClick",
      dynamicString: this.props.primaryColumns[field].onClick,
      event: {
        type: EventType.ON_CLICK,
        // callback: onComplete,
      },
    });
  }

  getColumnDataFromProps(data: any) {
    const columns: any = [];
    if (Array.isArray(data)) {
      return data;
    }
    let columnOrderSort: any = {};
    let isColumnAvail = true;
    this.props.columnOrder.forEach((name: string) => {
      columnOrderSort[name] = data[name];
      if (data[name] === undefined) {
        isColumnAvail = false;
      }
    });
    if (!isColumnAvail) {
      columnOrderSort = data;
    }
    Object.entries(columnOrderSort).forEach(([key, value]) => {
      const editor = getEditorConfig(
        value,
        this.buttonClick,
        this.updateSelectedRow,
      );
      const configObj = Object.assign(editor, {
        // title: startCase(camelCase(key)),
        field: key,
        headerFilter: this.props.isVisibleSearch,
      });
      columns.push(configObj);
    });
    return columns;
  }

  // updateComputedValues(data: any) {
  //   this.props.updateWidgetMetaProperty("tableData", data);
  // }

  updateSelectedRow(data: any) {
    this.props.updateWidgetMetaProperty("selectedRow", data);
  }

  getColumnFromData(data: any, updateState?: boolean) {
    const columns: any = [];
    if (data && data.length > 0) {
      const item = data[0];
      Object.entries(item).forEach(([key, value]) => {
        columns.push({
          title: startCase(camelCase(key)),
          // editableTitle: true,
          field: key,
          headerFilter: this.props.isVisibleSearch,
        });
      });
    }
    if (!updateState) {
      this.setState({ columnDefinition: columns });
    }

    return columns;
  }

  getColumnDefinition() {
    return isEmpty(this.state.columnDefinition)
      ? this.getColumnFromData(this.props.tableData)
      : this.getColumnDataFromProps(this.state.columnDefinition);
  }

  getPageView() {
    const columnDefinitions = this.getColumnDefinition();
    return (
      <Suspense fallback={<Skeleton />}>
        <TabulatorComponent
          bgColor={this.state.bgColor}
          cellBackground={this.props.cellBackground}
          color={this.state.color}
          columnDefinition={columnDefinitions}
          columnType={this.props.columnType}
          editedRowIndex={this.props.editedRowIndex}
          fontStyle={this.props.fontStyle}
          handleSaveClick={this.handleSaveClick}
          height={this.props.height}
          horizontalAlignment={this.props.horizontalAlignment}
          loading={this.props.animateLoading && this.state.loading}
          newButtonLabel={this.props.newButton}
          pageSize={this.props.pageSize}
          primaryColumns={this.props.primaryColumns}
          // saveNewRow={this.saveNewRow}
          resetButtonLabel={this.props.resetButton}
          saveButtonLabel={this.props.saveButton}
          tableData={this.props.tableData}
          textColor={this.props.textColor}
          textSize={this.props.textSize}
          updateAppsmithColumnDefinition={this.updateAppsmithColumnDefinition}
          // updateComputedValue={this.updateComputedValues}
        />
      </Suspense>
    );
  }

  static getWidgetType(): string {
    return "TABULATOR_WIDGET";
  }
}

export interface TabulatorWidgetProps extends WidgetProps {
  height: number;
  tableData: any;
  saveButton: any;
  newButton: any;
  resetButton: any;
  cellBackground?: string;
  textColor?: string;
  textSize?: any;
  fontStyle?: any;
  horizontalAlignment?: any;
  editedRowIndex?: any;
  editedRowIndices?: any;
  editedRows?: any;
  selectedRow?: any;
  columnOrder: any;
}

export default TabulatorWidget;
