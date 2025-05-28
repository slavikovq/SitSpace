import "../../../scss/Classes.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect, useState } from "react";
import { getUserClassById, updateClass } from "../../../models/class";
import { useNavigate, useParams } from "react-router-dom";
import { alert } from "../../../utils/sweetAlert";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import NotFound from "../../../components/NotFound/NotFound";

export default function CreateClassroom() {
  const { id } = useParams();
  const [columns, setColumns] = useState(0);
  const [rowsPerColumn, setRowsPerColumn] = useState([]);
  const [layout, setLayout] = useState([]);
  const [totalSeats, setTotalSeats] = useState();
  const [className, setClassName] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Update Classroom • SitSpace";

    let count = 0;
    layout.forEach((row) => {
      row.forEach((cell) => {
        if (cell !== null) count += cell;
      });
    });
    setTotalSeats(count);
  }, [layout]);

  useEffect(() => {
    document.title = "Update Classroom • SitSpace";

    const load = async () => {
      const res = await getUserClassById(id);
      if (res.status === 200) {
        const data = res.payload;
        setClassName(data.class_name);
        setLayout(data.layout);

        setColumns(data.layout[0]?.length || 0);

        const rows = data.layout[0]?.map((_, colIdx) =>
          data.layout.reduce((acc, row) => acc + (row[colIdx] !== null ? 1 : 0), 0)
        );
        setRowsPerColumn(rows);
        setIsLoading(false);
      } else {
        setIsLoading(null);
      }
    };

    load();
  }, []);

  const sendData = async () => {
    const res = await updateClass(id, {
      class_name: className,
      total_seats: totalSeats,
      layout: layout,
    });
    if (res.status === 200) {
      alert("success", "Classroom succesfully updated.");
      return navigate("/sitManager/classes");
    }
    if (res.status === 500) {
      alert("error", `${res.message}`);
    }
  };

  const handleColumnsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setColumns(value);
    setRowsPerColumn(Array(value).fill(1));
    setLayout([]);
  };

  const handleRowInputChange = (index, e) => {
    const newCounts = [...rowsPerColumn];
    newCounts[index] = e.target.value || 0;
    setRowsPerColumn(newCounts);
  };

  const generateLayout = () => {
    const maxRows = Math.max(...rowsPerColumn);
    const newLayout = [];

    for (let r = 0; r < maxRows; r++) {
      const row = [];
      for (let c = 0; c < columns; c++) {
        row.push(r < rowsPerColumn[c] ? 2 : null);
      }
      newLayout.push(row);
    }

    setLayout(newLayout);
  };

  const handleSelectChange = (rowIdx, colIdx, value) => {
    const newLayout = layout.map((row, r) =>
      row.map((cell, c) =>
        r === rowIdx && c === colIdx ? parseInt(value) : cell
      )
    );
    setLayout(newLayout);
  };

  const handleCancelButton = (e) => {
    e.preventDefault();
    setClassName("");
    setLayout([]);
    setRowsPerColumn([]);
    setColumns(0);
  };

  const handleCreateButton = (e) => {
    e.preventDefault();

    const requiredInputs = document.querySelectorAll(
      "input[required], select[required]"
    );
    const emptyFields = Array.from(requiredInputs).filter(
      (input) => !input.value.trim()
    );

    if (emptyFields.length > 0) {
      alert("error", "All fields are required.");
      return;
    }

    if (className.length > 20) {
      alert("error", "Class name is too long.");
      return;
    }

    sendData();
  };

  if (isLoading) return <LoadingPage />;
  if (isLoading === null) return <NotFound />;

  return (
    <SitManagerView headerText="Update Classroom" pageNow="classes">
      <div className="cc-body">
        <div className="cc-fRow">
          <div>
            <h1>Classroom information</h1>
            <input
              type="text"
              placeholder="Classroom name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
            />
            <p>
              <span style={{ color: "red" }}>* </span>
              <span style={{ fontWeight: "300" }}>
                Group name can be only 20 characters length
              </span>
            </p>
            <div className="cc-buttons">
              <button id="cc-cc-btn" onClick={handleCreateButton}>
                Update Classroom
              </button>
              <button id="cc-cancel-btn" onClick={handleCancelButton}>
                Cancel
              </button>
            </div>
          </div>

          <div>
            <h1>Classroom layout</h1>
            <input
              type="number"
              min="1"
              onChange={handleColumnsChange}
              value={columns}
              placeholder="Number of columns"
              required
            />
          </div>
        </div>

        <div className="cc-view">
          <h1>Classroom view</h1>
          {columns > 0 && (
            <div className="rows-input">
              {rowsPerColumn.map((val, i) => (
                <input
                  key={i}
                  type="number"
                  min="0"
                  value={val}
                  onChange={(e) => handleRowInputChange(i, e)}
                  placeholder={`Rows for column ${i + 1}`}
                  required
                />
              ))}
            </div>
          )}
          <div className="cc-btn">
            {columns > 0 && (
              <button className="cc-add-btn" onClick={generateLayout}>
                Add
              </button>
            )}
          </div>

          {layout.length > 0 && (
            <div className="cc-table">
              <table>
                <tbody>
                  {layout.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          style={{
                            backgroundColor:
                              cell !== null ? "#EBEBEB" : "transparent",
                          }}
                          className="cc-table-td"
                        >
                          {cell !== null && (
                            <select
                              value={cell}
                              onChange={(e) =>
                                handleSelectChange(rIdx, cIdx, e.target.value)
                              }
                              className="cc-table-select"
                              required
                            >
                              <option value="1">1 student</option>
                              <option value="2">2 students</option>
                              <option value="3">3 students</option>
                              <option value="4">4 students</option>
                            </select>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </SitManagerView>
  );
}
