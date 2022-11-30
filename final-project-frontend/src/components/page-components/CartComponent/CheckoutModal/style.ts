import { CSSProperties } from "react";
import styled from "styled-components";

export interface ModalStyle {
  ModalStyle?: CSSProperties;
}

const CheckoutModalWrapper = styled.div<ModalStyle>`
  background-color: rgba(0, 0, 0, 0.5);
  ${(props) => (props.ModalStyle ? { ...props.ModalStyle } : "")};

  .modal-content {
    max-height: auto;

    @media screen and (min-width: 992px) {
      max-height: auto;
    }
  }

  h1 {
    letter-spacing: 2px;
  }

  .add-ons {
    font-size: 0.75rem;
    maring-bottom: 0;
  }

  .table-responsive {
    max-height: 300px;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 10px;
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
  }

  table {
    td {
      vertical-align: middle;
    }
  }

  .strike {
    text-decoration: line-through;
    color: #e98e7d;
    margin-left: 0.25rem;
    font-size: 0.75rem;
    font-weight: 400 !important;
  }

  p {
    margin-bottom: 0;
  }
`;

export default CheckoutModalWrapper;
