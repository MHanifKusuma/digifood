import React, { FormEvent, ReactNode, useState } from "react";
import Button from "components/shared-components/Button";
import AddMenuOptinosModalWrapper from "./style";
import { IMenuOptions } from "interfaces/Menu";

interface AddMenuOptionsModalProp {
  show: boolean;
  handleClose: () => void;
  addMenuOption: (option: IMenuOptions) => void;
  menuId: number;
}

enum OptionType {
  RADIO = "radio",
  CHECK = "check",
}

const AddMenuOptionsModal = ({
  show,
  handleClose,
  addMenuOption,
  menuId,
}: AddMenuOptionsModalProp) => {
  const [input, setInput] = useState({
    optionNameInput: "",
    optionPriceInput: 0,
    optionTypeInput: OptionType.RADIO,
  });

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <AddMenuOptinosModalWrapper
      className={`modal fade ${show ? "show" : ""}`}
      ModalStyle={{ display: show ? "block" : "" }}
      id="staticBackdrop"
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{"Add Menu Option"}</h1>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="optionNameInput" className="form-label">
                Option Name
              </label>
              <input
                type="text"
                className="form-control"
                id="optionNameInput"
                name="optionNameInput"
                required
                value={input.optionNameInput}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Option Price
              </label>
              <input
                type="number"
                className="form-control"
                id="optionPriceInput"
                name="optionPriceInput"
                required
                value={input.optionPriceInput}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Option Type
              </label>
              <select
                className="form-select"
                id="optionTypeInput"
                name="optionTypeInput"
                onChange={handleSelectChange}
              >
                <option value="radio">Radio Button</option>
                <option value="check">Checkbox</option>
              </select>
            </div>
          </div>
          <div className="modal-footer ">
            <Button
              btnStyle={{
                backgroundColor: "#E98E7D",
                color: "#FFFFFF",
                width: "100px",
              }}
              btnFunction={handleClose}
            >
              Cancel
            </Button>
            <Button
              btnStyle={{
                backgroundColor: "#579EFF",
                color: "#FFFFFF",
                width: "100px",
              }}
              btnFunction={() => {
                const newMenuOption: IMenuOptions = {
                  Id: 0,
                  MenuId: menuId,
                  Name: input.optionNameInput,
                  Price: Number.parseInt(String(input.optionPriceInput)),
                  Type: input.optionTypeInput,
                };

                addMenuOption(newMenuOption);
                setInput({
                  optionNameInput: "",
                  optionPriceInput: 0,
                  optionTypeInput: OptionType.RADIO,
                });
                handleClose();
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      ;
    </AddMenuOptinosModalWrapper>
  );
};

export default AddMenuOptionsModal;
