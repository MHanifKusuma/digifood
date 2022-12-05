import Button from "components/shared-components/Button";
import { ICategory } from "interfaces/Category";
import { ICoupon } from "interfaces/Coupon";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/reducers";
import { AdminCouponModalType } from "../CouponDetailModal";
import AdminCouponListHeaderWrapper from "./style";

interface AdminCouponListHeaderProp {
  handleSortChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  handleOrderChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  setShowDetailCouponModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalType: React.Dispatch<React.SetStateAction<AdminCouponModalType>>;
  setSelectedCoupon: React.Dispatch<React.SetStateAction<ICoupon>>;
}

const AdminCouponListHeader = ({
  handleOrderChange,
  handleSortChange,
  setShowDetailCouponModal,
  setOpenModalType,
  setSelectedCoupon,
}: AdminCouponListHeaderProp) => {
  const sortOption = [{ label: "Last updated", value: "updated_at" }];

  const orderOption = [
    { label: "Newest", value: "desc" },
    { label: "Oldest", value: "asc" },
  ];

  const { user } = useSelector((state: RootState) => state.UsersReducer);
  const navigate = useNavigate();

  return (
    <AdminCouponListHeaderWrapper className="py-3">
      <div className="container d-flex flex-wrap">
        <div className="col d-flex flex-wrap align-items-center gap-2">
          <div className="col-12 col-lg-3">
            <p className="mb-1">Sort By:</p>
            <select className="form-select" onChange={handleSortChange}>
              {sortOption.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-lg-4">
            <p className="mb-1">Order:</p>
            <select className="form-select" onChange={handleOrderChange}>
              {orderOption.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {user.Role == 0 && (
          <div className="col-12 col-lg-2 mx-auto mt-5 mt-lg-4 d-flex justify-content-center align-items-center">
            <Button
              btnStyle={{
                backgroundColor: "#579EFF",
                color: "#FFFFFF",
                padding: "0.25rem 1rem",
              }}
              btnFunction={() => {
                setSelectedCoupon({
                  Id: 0,
                  Code: "",
                  DiscountAmount: 0,
                  Available: false,
                });
                setOpenModalType(AdminCouponModalType.CREATE);
                setShowDetailCouponModal(true);
              }}
            >
              Add Coupon
            </Button>
          </div>
        )}
      </div>
    </AdminCouponListHeaderWrapper>
  );
};

export default AdminCouponListHeader;
