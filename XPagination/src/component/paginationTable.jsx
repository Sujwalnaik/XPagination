import { useEffect, useState } from "react";
import { buttons, numberSection, tableDataRecord } from "./pagination";
import axios from "axios";

function PaginationTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  //pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const itemperPage = 10;

  useEffect(() => {
    let ApiUrl =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(ApiUrl);
        const data = response.data;
        setData(data);
        setTotalPages(Math.ceil(data.length / itemperPage));

        // setLoading(false);
      } catch (error) {
        console.error(error, "Data is unable to fetch data");
        alert("something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const indexOfLastItem = page * itemperPage;
  const indexOfFirstItem = indexOfLastItem - itemperPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "2px solid red",
        width: "100%",
      }}
    >
      <h1>Employee Data Table</h1>
      <table style={{ borderBottom: "2px solid #006A4E", textAlign: "center" }}>
        <thead>
          <tr
            style={{
              ...tableDataRecord,
              fontWeight: 600,
              background: "#006A4E",
              color: "white",
            }}
          >
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((ele) => {
              const { id, name, email, role } = ele;
              return (
                <>
                  <tr
                    style={{
                      ...tableDataRecord,
                      borderTop: "1px solid grey",
                    }}
                  >
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{role}</td>
                  </tr>
                </>
              );
            })
          ) : (
            <div style={{ margin: "20px" }}>No Data Found</div>
          )}
        </tbody>
      </table>

      <div
        style={{ padding: "10px", display: "flex", gap: 20, marginTop: "30px" }}
      >
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          style={buttons}
        >
          Previous
        </button>

        <span style={numberSection}>{page}</span>
        <button
          style={buttons}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginationTable;
