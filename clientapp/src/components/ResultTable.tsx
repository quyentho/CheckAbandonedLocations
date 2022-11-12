import { useRef, useState } from "react";
import { Button, Col, Row, Toast } from "react-bootstrap";
import { CheckLocationResponse } from "../types/CheckLocationResponse";
import { copyElementToClipboard } from "../utils/copyElementToClipboard";
import { StyledResultTable } from "./ResultTable.styled";

interface IProps {
  checkLocationResults: CheckLocationResponse[];
}
function ResultTable({ checkLocationResults }: IProps) {
  const tableRef = useRef<HTMLTableElement>(null);
  const resultCanDisplayInOneRow = (result: CheckLocationResponse) =>
    result.isDeliverable || result.abandonedLocations!.length === 1;

  const [show, setShow] = useState(false);

  return (
    <>
      <Row className="mb-2">
        <Col md={"auto"}>
          <Button
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              const copySuccess = copyElementToClipboard(
                tableRef.current as HTMLElement
              );
              if (copySuccess) setShow(true);
            }}
          >
            Copy to clipboard
          </Button>
        </Col>
        <Col md={"auto"}>
          <Toast
            delay={1000}
            autohide
            show={show}
            onClose={() => setShow(false)}
          >
            <Toast.Body>Copied!</Toast.Body>
          </Toast>
        </Col>
      </Row>

      <StyledResultTable ref={tableRef}>
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>Deliverable?</th>
            <th>Abandoned Location?</th>
          </tr>
        </thead>
        <tbody>
          {checkLocationResults.map((result, index) => (
            <>
              {resultCanDisplayInOneRow(result) && (
                <tr
                  key={index}
                  className={
                    result.isDeliverable ? "table-success" : "table-danger"
                  }
                >
                  <td>
                    <b>{index + 1}</b>
                  </td>
                  <td>{result.address}</td>
                  <td className="cell-align-center">
                    <b>{result.isDeliverable ? "YES" : "NO"}</b>
                  </td>
                  <td className="cell-align-center">
                    {result.abandonedLocations}
                  </td>
                </tr>
              )}

              {!resultCanDisplayInOneRow(result) && (
                <>
                  <tr key={index} className="table-danger">
                    <td rowSpan={result.abandonedLocations?.length}>
                      {index + 1}
                    </td>
                    <td rowSpan={result.abandonedLocations?.length}>
                      {result.address}
                    </td>
                    <td
                      className="cell-align-center"
                      rowSpan={result.abandonedLocations?.length}
                    >
                      <b>NO</b>
                    </td>
                    <td className="cell-align-center">
                      {result.abandonedLocations![0]}
                    </td>
                  </tr>

                  <tr className="table-danger cell-align-center">
                    {result.abandonedLocations
                      ?.slice(1)
                      .map((abandonedLocation) => (
                        <td>{abandonedLocation}</td>
                      ))}
                  </tr>
                </>
              )}
            </>
          ))}
        </tbody>
      </StyledResultTable>
    </>
  );
}

export default ResultTable;
