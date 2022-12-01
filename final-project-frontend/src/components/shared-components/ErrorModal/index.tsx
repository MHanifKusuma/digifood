import Button from "components/shared-components/Button";
import { ReactNode } from "react";
import ErrorModalWrapper from "./style";

interface ErrorModalProp {
  show: boolean;
  handleClose: () => void;
  title?: string;
  message?: string;
  button: ReactNode;
}

const ErrorModal = ({
  show,
  handleClose,
  title,
  message,
  button,
}: ErrorModalProp) => {
  return (
    <ErrorModalWrapper
      className={`modal fade ${show ? "show" : ""}`}
      ModalStyle={{ display: show ? "block" : "" }}
      id="staticBackdrop"
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{title || "Error"}</h1>
          </div>
          <div className="modal-body">{message || "An error occured"}</div>
          <div className="modal-footer">
            {button || (
              <Button
                btnStyle={{ backgroundColor: "#A8A8A8", color: "#FFFFFF" }}
              >
                Close
              </Button>
            )}
          </div>
        </div>
      </div>
      ;
    </ErrorModalWrapper>
  );
};

export default ErrorModal;
