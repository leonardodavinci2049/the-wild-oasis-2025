import styled, { css } from "styled-components";

interface RowProps {
  type?: "horizontal" | "vertical";
}

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
`;

export default Row;
