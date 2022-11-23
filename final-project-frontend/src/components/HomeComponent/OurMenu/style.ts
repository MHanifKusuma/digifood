import styled from "styled-components";
import { lighterColor } from "utils/index";

const OurMenuWrapper = styled.section`
  min-height: 100vh;
  background-color: #f8f8f8;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: start;
  flex-wrap: wrap;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 11rem;

  img {
    width: 80%;
    height: 80%;
  }

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #d3d3d3;
  }

  .cat-image {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
  }

  .active-cat {
    background-color: #579eff;
  }
`;

export const MenuWrapper = styled.div`
  margin-top: 2rem;
  padding: 5rem 2rem;
  background-color: #ffe09c;
  border-radius: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default OurMenuWrapper;
