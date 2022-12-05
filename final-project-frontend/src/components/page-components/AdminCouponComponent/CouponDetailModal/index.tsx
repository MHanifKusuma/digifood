import axios from "axios";
import Button from "components/shared-components/Button";
import { ErrorMessage, GlobalModalStyle } from "components/shared-style";
import { ICoupon } from "interfaces/Coupon";
import { CouponCreateUpdateInput } from "interfaces/FormInput";
import React, { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export enum AdminCouponModalType {
  UPDATE = "update",
  CREATE = "create",
}

interface AdminCouponDetailProp {
  show: boolean;
  handleClose: () => void;
  coupon: ICoupon;
  type: AdminCouponModalType;
}

const AdminCouponDetailModal = ({
  show,
  handleClose,
  coupon,
  type,
}: AdminCouponDetailProp) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["login"]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CouponCreateUpdateInput>({
    defaultValues: {
      id: coupon.Id,
      code: coupon.Code,
      discount_amount: coupon.DiscountAmount,
      available: coupon.Available,
    },
  });

  const [input, setInput] = useState<CouponCreateUpdateInput>({
    id: coupon.Id,
    code: coupon.Code,
    discount_amount: coupon.DiscountAmount,
    available: coupon.Available,
  });
  const [error, setError] = useState("");

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

  const handleClickDelete = () => {
    axios
      .delete(`http://localhost:8080/admin/coupons/${coupon.Id}`, {
        headers: {
          Authorization: `Bearer ${cookies.login}`,
        },
      })
      .then(() => window.location.reload())
      .catch((error) => setError(error.message));
  };

  const onSubmit: SubmitHandler<CouponCreateUpdateInput> = async (data) => {
    data.available = String(data.available) === "true" ? true : false;

    switch (type) {
      case AdminCouponModalType.UPDATE:
        axios
          .put(`http://localhost:8080/admin/coupons/${data.id}`, data, {
            headers: {
              Authorization: `Bearer ${cookies.login}`,
            },
          })
          .then(() => window.location.reload())
          .catch((error) => setError(error.message))
          .finally(() => {
            if (!error) {
              handleClose();
              setError("");
            }
          });

        return;

      case AdminCouponModalType.CREATE:
        axios
          .post(`http://localhost:8080/admin/coupons`, data, {
            headers: {
              Authorization: `Bearer ${cookies.login}`,
            },
          })
          .then(() => window.location.reload())
          .catch((error) => setError(error.message))
          .finally(() => {
            if (!error) {
              handleClose();
              setError("");
            }
          });

        return;

      default:
        return;
    }
  };

  useEffect(() => {
    reset({
      id: coupon.Id,
      code: coupon.Code,
      discount_amount: coupon.DiscountAmount,
      available: coupon.Available,
    });
    setInput({
      id: coupon.Id,
      code: coupon.Code,
      discount_amount: coupon.DiscountAmount,
      available: coupon.Available,
    });
  }, [coupon]);

  return (
    <GlobalModalStyle
      className={`modal fade ${show ? "show" : ""}`}
      ModalStyle={{ display: show ? "block" : "" }}
      id="staticBackdrop"
      tabIndex={-1}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{"Coupon Detail"}</h1>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="optionNameInput" className="form-label">
                Code
              </label>
              <input
                type="text"
                className="form-control"
                id="couponCodeInput"
                {...register("code", { required: true })}
                value={input.code}
                onChange={handleInputChange}
              />
              {errors.code?.type === "required" && (
                <ErrorMessage>Coupon code is required</ErrorMessage>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Discount Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="optionDiscountAmountCode"
                {...register("discount_amount", {
                  required: true,
                  valueAsNumber: true,
                  min: 1,
                })}
                value={input.discount_amount}
                onChange={handleInputChange}
              />
              {errors.discount_amount?.type === "required" && (
                <ErrorMessage>Coupon discount is required</ErrorMessage>
              )}
              {errors.discount_amount?.type === "min" && (
                <ErrorMessage>Coupon discount is required</ErrorMessage>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Availability
              </label>
              <select
                className="form-select"
                id="optionTypeInput"
                {...register("available")}
                onChange={handleSelectChange}
              >
                <option value="true">Available</option>
                <option value="false">Not available</option>
              </select>
            </div>
          </div>
          <div className="modal-footer ">
            {type === AdminCouponModalType.UPDATE && (
              <>
                <Button
                  btnStyle={{
                    width: "100%",
                    backgroundColor: "#579EFF",
                    color: "#FFFFFF",
                  }}
                  type={"submit"}
                >
                  Update
                </Button>
                <Button
                  btnStyle={{
                    width: "100%",
                    backgroundColor: "#E98E7D",
                    color: "#FFFFFF",
                  }}
                  btnFunction={handleClickDelete}
                  type={"button"}
                >
                  Delete
                </Button>
                <Button
                  btnStyle={{
                    width: "100%",
                    backgroundColor: "#A8A8A8",
                    color: "#FFFFFF",
                  }}
                  btnFunction={handleClose}
                >
                  Cancel
                </Button>

                {error && <ErrorMessage>{error}</ErrorMessage>}
              </>
            )}
            {type === AdminCouponModalType.CREATE && (
              <>
                <Button
                  btnStyle={{
                    width: "100%",
                    backgroundColor: "#579EFF",
                    color: "#FFFFFF",
                  }}
                  type={"submit"}
                >
                  Add Coupon
                </Button>

                <Button
                  btnStyle={{
                    width: "100%",
                    backgroundColor: "#E98E7D",
                    color: "#FFFFFF",
                  }}
                  btnFunction={handleClose}
                >
                  Cancel
                </Button>

                {error && <ErrorMessage>{error}</ErrorMessage>}
              </>
            )}
          </div>
        </div>
      </div>
    </GlobalModalStyle>
  );
};

export default AdminCouponDetailModal;
