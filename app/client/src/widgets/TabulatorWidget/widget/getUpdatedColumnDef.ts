import moment from "moment-timezone";
import { selectRowIndex } from "widgets/TableWidget/widget/utilities";

export const getEditorConfig = (
  valueObj: any,
  buttonClick: any,
  updateSelectedRow: any,
) => {
  let modifiedColumn: any = {};
  window.localStorage.setItem("valueObj", JSON.stringify(valueObj));
  const convertToArray = (option: string[]) => {
    if (Array.isArray(option)) {
      const object = option.reduce(
        (obj, item: any) => Object.assign(obj, { [item.value]: item.label }),
        {},
      );
      return object;
    }
    // let valuesArray = [];
    // for (let i = 0; i < option?.length; i++) {
    //   valuesArray.push(Object.values(option[i])[1]);
    // }
  };

  const dateEditor = (
    cell: any,
    onRendered: any,
    success: any,
    cancel: any,
  ) => {
    const division = document.createElement("div");
    const button = document.createElement("button");
    division.style.display = "flex";
    button.innerHTML = "X";
    button.style.padding = "1px 10px";
    button.style.borderRadius = "4px";
    button.style.backgroundColor = "red";
    button.style.color = "white";
    button.style.fontWeight = "800";
    button.style.margin = "2px 4px 3px 4px";
    const editor = document.createElement("input");
    division.appendChild(editor);
    division.appendChild(button);
    editor.style.flex = "1";
    const cellValue = cell.getValue();
    editor.type = "datetime-local";
    // editor.style.width = "80%";
    editor.value = typeof cellValue !== "undefined" ? cellValue : "";

    function converttoslash(data: any) {
      let senddate = "";
      for (let i = 0; i < data.length; i++) {
        if (data[i] == "-") {
          senddate = senddate + "/";
        } else {
          senddate = senddate + data[i];
        }
      }
      const date = senddate
        .split("/")
        .reverse()
        .join("/");
      const firstPart = date.slice(0, 2);
      const secondPart = date.slice(2, 8);
      const thirdPart = date.slice(8);
      const type = valueObj.dateFormat;
      const day = firstPart;
      const month = thirdPart.slice(1, 3);
      const year = thirdPart.slice(4);
      const hour = date.slice(3, 5);
      const minute = date.slice(6, 8);
      const second = "00";
      const newFormat = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
        Number(second),
        0,
      );
      return moment(newFormat).format(type);
    }

    function successFunc() {
      success(converttoslash(editor.value)); //if value has changed save value
    }

    function blurHandler() {
      if (
        ((cellValue === null || typeof cellValue === "undefined") &&
          editor.value !== "") ||
        editor.value !== cellValue
      ) {
        if (editor.value) success(converttoslash(editor.value));
        else cancel();
      } else {
        cancel(); //otherwise cancel edit
      }
    }

    editor.addEventListener("change", successFunc);
    editor.addEventListener("blur", blurHandler);

    onRendered(() => {
      editor.focus();
    });

    return division;
  };

  const buttonAdding = (
    cell: any,
    onRendered: any,
    success: any,
    cancel: any,
  ) => {
    const Btn = document.createElement("input");
    const cellValue = cell.getValue();
    Btn.type = "button";
    Btn.value = cell.getValue();
    Btn.style.padding = "2px";
    Btn.style.marginLeft = "auto";

    function successFunc() {
      success(Btn.value); //if value has changed save value
    }

    function blurHandler() {
      if (
        ((cellValue === null || typeof cellValue === "undefined") &&
          Btn.value !== "") ||
        Btn.value !== cellValue
      ) {
        if (Btn.value) success(Btn.value);
        else cancel();
      } else {
        cancel(); //otherwise cancel edit
      }
    }

    Btn.addEventListener("change", successFunc);
    Btn.addEventListener("blur", blurHandler);

    onRendered(() => {
      Btn.focus();
    });
    return Btn;
  };

  const buttonFormatter = (cell: any) => {
    const value = cell.getValue();
    // eslint-disable-next-line prefer-const
    if (Array.isArray(valueObj.buttonColor)) {
      if (valueObj.buttonColor.length > 0) {
        const val = cell.getRow().getPosition();
        cell.getElement().style.color = valueObj.buttonColor[val];
      }
    }
    if (Array.isArray(valueObj.cellBackground)) {
      if (valueObj.cellBackground.length > 0) {
        const val = cell.getRow().getPosition();
        cell.getElement().style.backgroundColor = valueObj.cellBackground[val];
      }
    }
    if (valueObj.buttonColor) {
      const color = valueObj.buttonColor;
      cell.getElement().style.backgroundColor = color;
    }
    if (Array.isArray(valueObj.buttonLabel)) {
      if (valueObj.buttonLabel.length > 0) {
        const val = cell.getRow().getPosition();
        return valueObj.buttonLabel[val];
      }
    }
    if (valueObj.buttonLabelColor) {
      cell.getElement().style.color = valueObj.buttonLabelColor;
    }
    return value;
  };
  const formatter = (cell: any) => {
    const value = cell.getValue();
    if (Array.isArray(valueObj.textColor)) {
      if (valueObj.textColor.length > 0) {
        const val = cell.getRow().getPosition();
        cell.getElement().style.color = valueObj.textColor[val];
      }
    }
    if (Array.isArray(valueObj.cellBackground)) {
      if (valueObj.cellBackground.length > 0) {
        const val = cell.getRow().getPosition();
        cell.getElement().style.backgroundColor = valueObj.cellBackground[val];
      }
    }
    if (valueObj.textColor) {
      const color = valueObj.textColor;
      cell.getElement().style.color = color;
    }
    if (valueObj.cellBackground) {
      cell.getElement().style.backgroundColor = valueObj.cellBackground;
    }
    return value;
  };

  if (valueObj.hasOwnProperty("columnType")) {
    let editorConfig: any = {};
    if (valueObj["columnType"] === "text") {
      editorConfig = {
        title: valueObj.label,
        // validator:
        //   valueObj.regExp && valueObj.regExp.length > 0
        //     ? `regex:${valueObj.regExp}`
        //     : `regex:[\s\S]*`,
        formatter: "plaintext",
        width: valueObj.columnWidth,
        visible: Array.isArray(valueObj.isCellVisible)
          ? valueObj.isCellVisible[0]
          : valueObj.isCellVisible,
        formatterParams: formatter,
      };
    } else if (valueObj["columnType"] === "input") {
      editorConfig = {
        title: valueObj.label,
        width: valueObj.columnWidth,
        validator:
          valueObj.regExp && valueObj.regExp.length > 0
            ? `regex:${valueObj.regExp}`
            : `regex:[\s\S]*`,
        visible: valueObj.isCellVisible,
        editor: "input",
        formatter: formatter,
      };
    } else if (valueObj["columnType"] === "textarea") {
      editorConfig = {
        title: valueObj.label,
        width: valueObj.columnWidth,
        validator:
          valueObj.regExp && valueObj.regExp.length > 0
            ? `regex:${valueObj.regExp}`
            : `regex:[\s\S]*`,
        visible: valueObj.isCellVisible,
        editor: "textarea",
        formatter: formatter,
      };
    } else if (valueObj["columnType"] === "checkbox") {
      editorConfig = {
        title: valueObj.label,
        width: valueObj.columnWidth,
        validator:
          valueObj.regExp && valueObj.regExp.length > 0
            ? `regex:${valueObj.regExp}`
            : `regex:[\s\S]*`,
        visible: valueObj.isCellVisible,
        editor: "tickCross",
        editorParams: {
          tristate: true,
          elementAttributes: {
            maxlength: "10", //set the maximum character length of the input element to 10 characters
          },
        },
      };
    } else if (valueObj["columnType"] === "star") {
      editorConfig = {
        title: valueObj.label,
        width: valueObj.columnWidth,
        validator:
          valueObj.regExp && valueObj.regExp.length > 0
            ? `regex:${valueObj.regExp}`
            : `regex:[\s\S]*`,
        visible: valueObj.isCellVisible,
        editor: true,
        formatter: "star",
        hozAlign: "center",
      };
    } else if (valueObj["columnType"] === "button") {
      editorConfig = {
        title: valueObj.label,
        width: valueObj.columnWidth,
        validator:
          valueObj.regExp && valueObj.regExp.length > 0
            ? `regex:${valueObj.regExp}`
            : `regex:[\s\S]*`,
        visible: valueObj.isCellVisible,
        editor: buttonAdding,
        formatter: buttonFormatter,
        cellClick: function(e: any, cell: any) {
          e.preventDefault();
          e.stopPropagation();
          const rowIndex = cell.getRow().getPosition();
          buttonClick(rowIndex, cell.getField());
        },
      };
    } else if (valueObj["columnType"] === "select") {
      console.log(
        valueObj.options,
        valueObj,
        convertToArray(valueObj.options),
        "convertToArray(valueObj.options)",
      );
      editorConfig = {
        title: valueObj.label,
        visible: valueObj.isCellVisible,
        width: valueObj.columnWidth,
        editor: "select",
        editorParams: { values: convertToArray(valueObj.options) },
        formatter: formatter,
        headerFilterParams: convertToArray(valueObj.options),
      };
    } else if (valueObj["columnType"] === "iconButton") {
      editorConfig = {
        title: valueObj.label,
        validator: `regex:${valueObj.regExp}`,
        visible: valueObj.isCellVisible,
        width: valueObj.columnWidth,
        formatter: function() {
          const element = document.createElement("div");
          element.className = "flex justify-center items-center";
          element.innerHTML = `
          <span class="bp3-icon-large bp3-icon-${
            valueObj.iconName ? valueObj.iconName : "add"
          } "></span>
          `;
          element.style.color = valueObj.textColor || "black";
          return element;
        },
        cellClick: function(e: any, cell: any) {
          e.preventDefault();
          e.stopPropagation();
          const rowIndex = cell.getRow().getPosition();
          buttonClick(rowIndex, cell.getField(), cell.getRow().getData());
        },
      };
    } else if (valueObj["columnType"] === "autocomplete") {
      editorConfig = {
        title: valueObj.label,
        width: valueObj.columnWidth,
        validator:
          valueObj.regExp && valueObj.regExp.length > 0
            ? `regex:${valueObj.regExp}`
            : `regex:[\s\S]*`,
        visible: valueObj.isCellVisible,
        editor: "autocomplete",
        editorParams: { values: true },
        formatter: formatter,
      };
    } else if (valueObj["columnType"] === "date") {
      editorConfig = {
        title: valueObj.label,
        width: valueObj.columnWidth > 280 ? valueObj.columnWidth : 280,
        validator:
          valueObj.regExp && valueObj.regExp.length > 0
            ? `regex:${valueObj.regExp}`
            : `regex:[\s\S]*`,
        editor: dateEditor,
        visible: valueObj.isCellVisible,
        hozAlign: "center",
        sorter: "date",
        formatterParams: formatter,
        headerFilter: "input",
      };
    } else if (valueObj["columnType"] === "progress") {
      editorConfig = {
        title: valueObj.label,
        width: valueObj.columnWidth,
        validator:
          valueObj.regExp && valueObj.regExp.length > 0
            ? `regex:${valueObj.regExp}`
            : `regex:[\s\S]*`,
        sorter: "number",
        visible: valueObj.isCellVisible,
        hozAlign: "left",
        formatter: "progress",
        editor: true,
      };
    } else {
      editorConfig = {
        title: valueObj.label,
        width: valueObj.columnWidth,
        validator:
          valueObj.regExp && valueObj.regExp.length > 0
            ? `regex:${valueObj.regExp}`
            : `regex:[\s\S]*`,
        visible: valueObj.isCellVisible,
        editor: "input",
        formatter: formatter,
      };
    }
    modifiedColumn = editorConfig;
  }
  return modifiedColumn;
};
