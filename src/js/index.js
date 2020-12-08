import Grid from "tui-grid";
const jsonSpan = document.getElementById("jsJson").querySelector("span");

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

const data = [
  {
    DocEntry: "10012",
    IF_DocDate: "2020-01-24",
    IF_Name: "HSE_IF_014",
    Error_CD: "S / 저장되었습니다.",
    Error_Result: "",
    Error_Param: "",
  },
  {
    DocEntry: "10013",
    IF_DocDate: "2020-01-24",
    IF_Name: "HSE_IF_014",
    Error_CD: "S / 저장되었습니다.",
    Error_Result: "",
    Error_Param: `[{"U_GWDOCNO":"","U_GWDOCNUM":40083,"U_GWEMPNO":"20060014","U_GWEMPNM":"\uC774\uC740\uD654","U_GWLINK":"","U_GWSTS":"1","U_GWDATE":"9999-01-01T00:00:00","U_BPLID":"1","U_COMPCD":"HSE","RefDate":"9999-01-01T00:00:00","TaxDate":"9999-01-01T00:00:00","DueDate":"9999-01-01T00:00:00","Memo":"","Line_ID":0,"Account":"51004030","ShortName":"51004030","Debit":11500,"Credit":0,"TaxGroup":"","CostingCode":"EF146101","LineMemo":"\uC57C\uADFC\uC2DD\uB300","U_CARDNO":"5531-7600-0024-6971","U_CARDCODE":"","U_CARDNM":"","U_SAUPNO":"","U_SUPAMT":0,"U_VAT":0,"U_EMPNO":"20060014","U_GROUP1":"U100","U_GROUP2":"U110","U_BTDATE":"2020-10-30T00:00:00"}]`,
  },
  {
    DocEntry: "10014",
    IF_DocDate: "2020-01-24",
    IF_Name: "HSE_IF_014",
    Error_CD: "S / 저장되었습니다.",
    Error_Result: "",
    Error_Param: "",
  },
  {
    DocEntry: "10014",
    IF_DocDate: "2020-01-24",
    IF_Name: "HSE_IF_014",
    Error_CD: "S / 저장되었습니다.",
    Error_Result: "",
    Error_Param: "",
  },
  {
    DocEntry: "10014",
    IF_DocDate: "2020-01-24",
    IF_Name: "HSE_IF_014",
    Error_CD: "S / 저장되었습니다.",
    Error_Result: "",
    Error_Param: "",
  },
  {
    DocEntry: "10014",
    IF_DocDate: "2020-01-24",
    IF_Name: "HSE_IF_014",
    Error_CD: "S / 저장되었습니다.",
    Error_Result: "",
    Error_Param: "",
  },
  {
    DocEntry: "10014",
    IF_DocDate: "2020-01-24",
    IF_Name: "HSE_IF_014",
    Error_CD: "S / 저장되었습니다.",
    Error_Result: "",
    Error_Param: "",
  },
  {
    DocEntry: "10014",
    IF_DocDate: "2020-01-24",
    IF_Name: "HSE_IF_014",
    Error_CD: "S / 저장되었습니다.",
    Error_Result: "",
    Error_Param: "",
  },
];

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
      name: "IF_DocDate",
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
  data,
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

grid.on("click", onGridClick);
