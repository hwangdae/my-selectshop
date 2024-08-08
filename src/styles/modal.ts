import styled from "styled-components";

export const modal = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* overflow: auto; */
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;
export const modalContent = styled.div`
  position: relative;
  left: 0;
  top: 0;
  width: 360px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: solid 1px #000;
  border-radius: 4px;
  padding: 30px;
  z-index: 99999;
`;
