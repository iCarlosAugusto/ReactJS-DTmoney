import styled from "styled-components";
import  emptyList  from "../../assets/emptyList.png";
import  deletedList  from "../../assets/deletedList.png";

//import tresh2 from "../../assets/tresh.svg";

export const Container = styled.div`
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      width: 10rem;
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }
    td {
      width: 25rem;
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;
      &:first-child {
        color: var(--text-title);
      }
      &.deposit {
        color: var(--green);
      }
      &.withdraw {
        color: var(--red);
      }
    }
  }
`;

export const SeachContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  input[type="text"] {
    width: 25rem;
    height: 2rem;

    ::placeholder {
      text-align: center;
    }
  }
`;
export const EmptyListContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`

export const EmptyList = styled.img.attrs({
  alt: "EmptyList",
  src: emptyList,
})`
  width: 200px;
  height: 200px;
`;



export const DeletedList = styled.img.attrs({
  alt: "EletedList",
  src: deletedList,
})`
  idth: 200px;
  height: 200px;
`

