import "@babel/polyfill";
import axios from "axios";
import Grid from "tui-grid";
const jsonSpan = document.getElementById("jsJson").querySelector("span");
const jsForm = document.getElementById("jsForm");

const options = {
  outline: {
    showVerticalBorder: true,
    border: "#ffe75e",
  },
  scrollbar: {
    emptySpace: "#ffe75e",
    border: "#ffe75e",
    background: "#0000",
    thumb: "#ffe75e",
    active: "#ffe75e",
  },
  area: {
    header: {
      border: "#ffe75e",
    },
    body: {
      background: "#0000",
    },
  },
  row: {
    odd: {
      background: "#0000",
      border: "#ffe75e",
    },
    even: {
      background: "#0000",
      border: "#ffe75e",
    },
    hover: {
      background: "#ffe75e",
      text: "#0000",
    },
  },
  cell: {
    normal: {
      border: "#ffe75e",
      showVerticalBorder: true,
      showHorizontalBorder: true,
      text: "#ffff",
    },
    header: {
      background: "#ffe75e",
      showVerticalBorder: false,
    },
    selectedHeader: {
      background: "none",
    },
    focused: {
      border: "none",
    },
  },
};

const grid = new Grid({
  el: document.getElementById("jsGrid"),
  bodyHeight: "fitToParent",
  columnOptions: {
    resizable: true,
    minWidth: 20,
  },
  columns: [
    {
      header: "Entry",
      name: "DocEntry",
    },
    {
      header: "Date",
      name: "createDate",
    },
    {
      header: "Name",
      name: "IF_Name",
    },
    {
      header: "Result",
      name: "Error_CD",
    },
    {
      header: "Error msg",
      name: "Error_Result",
    },
    {
      header: "Param",
      name: "Error_Param",
    },
  ],
  data: [],
});

tui.Grid.applyTheme("clean", options);

const onGridClick = (e) => {
  jsonSpan.innerText = "";
  const { rowKey } = e;
  const json = getObj(rowKey);
  if (json) {
    sortJson(json);
  }
};

const getObj = (rowKey) => {
  const data = grid.getRow(rowKey);
  const { Error_Param: param } = data;
  let obj;
  if (param) {
    obj = JSON.parse(param);
  } else {
    obj = null;
  }
  return obj;
};

const sortJson = (json) => {
  jsonSpan.append(document.createTextNode(JSON.stringify(json, null, 4)));
};

const getLog = async () => {
  const {
    toDate: { value: toDate },
    fromDate: { value: fromDate },
    api: { value: api },
  } = jsForm;
  try {
    const response = await axios.get(`/log?todate=${toDate}&fromdate=${fromDate}&name=${api}`);
    grid.resetData(response.data);
  } catch (error) {
    alert(error);
  }
};

const onKeydown = (event) => {
  const { keyCode } = event;
  try {
    if (keyCode != 13) {
      return;
    }
    getLog();
  } catch (error) {}
};

grid.on("click", onGridClick);
document.addEventListener("keydown", onKeydown);
