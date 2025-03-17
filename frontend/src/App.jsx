import React, { useState } from "react";
import "./styles.css";

const ROWS = 100;
const COLS = 50;

function Spreadsheet() {
  const [sheets, setSheets] = useState([{ name: "Sheet1", data: {} }]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleCellChange = (e, rowIndex, colIndex) => {
    const cellKey = `${rowIndex},${colIndex}`;
    const value = e.target.value; // ✅ Fix: Ensure `value` is correctly assigned
  
    console.log(`Editing Cell [${rowIndex},${colIndex}] => Value: ${value}`); // Debugging
  
    setSheets((prevSheets) => {
      const newSheets = [...prevSheets];
      const sheetCopy = { ...newSheets[activeSheet] }; // Copy current sheet
      sheetCopy.data = { ...sheetCopy.data, [cellKey]: value }; // Update specific cell
      newSheets[activeSheet] = sheetCopy; // Replace with updated sheet
      return newSheets;
    });
  
    setHistory((prevHistory) => [...prevHistory, sheets[activeSheet].data]); // Save for undo
    setRedoStack([]); // Clear redo stack
  };
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  }; 
  const evaluateFormula = (formula, data) => {
    try {
      let expression = formula.substring(1); // Remove '='
  
      // Replace cell references (A1, B2, etc.) with actual values
      expression = expression.replace(/[A-Z]+\d+/g, (match) => {
        return data[match] || "0"; // Default to 0 if cell is empty
      });
  
      return eval(expression); // Calculate formula result
    } catch (error) {
      return "ERROR";
    }
  };
  

  const changeFontSize = (event) => {
    const fontSize = event.target.value;
    document.execCommand("fontSize", false, fontSize);
  };
  const saveToLocal = () => {
    localStorage.setItem("spreadsheetData", JSON.stringify(sheets));
    alert("Spreadsheet saved!");
  };
  const loadFromLocal = () => {
    const data = localStorage.getItem("spreadsheetData");
    if (data) {
      setSheets(JSON.parse(data));
      alert("Spreadsheet loaded!");
    } else {
      alert("No saved data found.");
    }
  };
  
  const addSheet = () => {
    let sheetName = prompt("Enter a name for the new sheet:");
    if (!sheetName) return;
    setSheets([...sheets, { name: sheetName, data: {} }]);
  };

  const renameSheet = (index) => {
    let newName = prompt("Enter new sheet name:", sheets[index].name);
    if (!newName) return;
    setSheets((prevSheets) =>
      prevSheets.map((sheet, i) =>
        i === index ? { ...sheet, name: newName } : sheet
      )
    );
  };
  
  const undo = () => {
    if (history.length > 0) {
      const prevState = history.pop();
      setRedoStack((prevRedo) => [...prevRedo, sheets[activeSheet].data]);
      setSheets((prevSheets) => {
        const newSheets = [...prevSheets];
        newSheets[activeSheet] = { ...newSheets[activeSheet], data: prevState };
        return newSheets;
      });
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const redoState = redoStack.pop();
      setHistory((prevHistory) => [...prevHistory, sheets[activeSheet].data]);
      setSheets((prevSheets) => {
        const newSheets = [...prevSheets];
        newSheets[activeSheet] = { ...newSheets[activeSheet], data: redoState };
        return newSheets;
      });
    }
  };

  return (
    <div className="spreadsheet-container">
      <div className="title-bar">Google Sheets Clone</div>
      <div className="menu-bar">
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Insert</span>
                <span>Format</span>
        </div>
      <div className="toolbar">
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={() => applyStyle("bold")}>B</button>
        <button onClick={() => applyStyle("italic")}>I</button>
        <button onClick={() => applyStyle("underline")}>U</button>
        <select onChange={(e) => changeFontSize(e)}>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
        </select>
        <button onClick={saveToLocal}>Save</button>
        <button onClick={loadFromLocal}>Load</button>
      </div>

      <div className="grid-container">
        <table className="spreadsheet">
        <thead>
            <tr>
              <th></th>
               {Array.from({ length: COLS }, (_, colIndex) => (
                <th key={colIndex}>{String.fromCharCode(65 + colIndex)}</th>
              ))}
                    
            </tr>
          </thead>
          <tbody> 
  {Array.from({ length: ROWS }, (_, rowIndex) => (
    <tr key={rowIndex}>
      <th>{rowIndex + 1}</th>
      {Array.from({ length: COLS }, (_, colIndex) => {
        const cellKey = `${rowIndex},${colIndex}`;
        return (
          <td 
            key={colIndex}
            className={selectedCell.row === rowIndex && selectedCell.col === colIndex ? "selected" : ""} 
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            <input
              type="text"
              value={sheets[activeSheet].data[cellKey] || ""}
              onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
              onFocus={(e) => e.target.select()} // Select text on focus
            />
          </td>
        );
      })}
    </tr>
  ))}
</tbody>


        </table>
      </div>
      <div className="menu-bar">
        {sheets.map((sheet, index) => (
          <button
            key={index}
            className={index === activeSheet ? "active-sheet" : ""}
            onClick={() => setActiveSheet(index)}
            onDoubleClick={() => renameSheet(index)}
          >
            {sheet.name}
          </button>
        ))}
        <button onClick={addSheet}>+ Add Sheet</button>
      </div>
    </div>
    
  );
}

export default Spreadsheet;
