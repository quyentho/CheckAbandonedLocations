import { Table } from "react-bootstrap";
import styled from "styled-components";

export const StyledResultTable = styled(Table).attrs({
  striped: true,
  bordered: true,
  hover: true,
})`
  vertical-align: middle;
  .cell-align-center {
    text-align: center;
  }
`;
