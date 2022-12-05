import Button from "components/shared-components/Button";
import { ICoupon, ICouponPagination } from "interfaces/Coupon";
import { IFilterOption } from "interfaces/FilterOption";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "utils/index";
import { AdminCouponModalType } from "../CouponDetailModal";
import AdminCouponListWrapper, { CouponWrapper } from "./style";

interface AdminCouponListProp {
  coupons: ICouponPagination;
  setFilterOption: React.Dispatch<React.SetStateAction<IFilterOption>>;
  filterOption: IFilterOption;
  isLastPage: boolean;
  setOpenModalType: React.Dispatch<React.SetStateAction<AdminCouponModalType>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCoupon: React.Dispatch<React.SetStateAction<ICoupon>>;
}

const AdminCouponList = ({
  coupons,
  filterOption,
  setFilterOption,
  isLastPage,
  setOpenModalType,
  setShowModal,
  setSelectedCoupon,
}: AdminCouponListProp) => {
  const [pagination, setPagination] = useState<string[]>([]);

  const handlePagination = (totalPage: number, currentPage: number) => {
    let element: string[] = [];

    const actualPage = currentPage + 1;

    if (totalPage <= 10) {
      element = Array.from(Array(coupons.total_page).keys(), (index) =>
        String(index + 1)
      );
    } else {
      if (actualPage <= 4) {
        element = ["1", "2", "3", "...", String(totalPage)];
      } else if (actualPage < 6) {
        element = [
          "1",

          "...",

          String(actualPage - 2),

          String(actualPage - 1),

          String(actualPage),

          "...",

          String(totalPage),
        ];
      } else if (actualPage < totalPage && actualPage > 4) {
        element = [
          "1",

          "...",

          String(actualPage - 3),

          String(actualPage - 2),

          String(actualPage - 1),

          "...",

          String(totalPage),
        ];
      } else if (actualPage > totalPage - 4) {
        element = [
          "1",

          "...",

          String(totalPage - 2),

          String(totalPage - 1),

          String(totalPage),
        ];
      } else {
        element = [
          "1",

          "...",

          String(actualPage - 1),

          String(actualPage),

          String(actualPage + 1),

          "...",

          String(totalPage),
        ];
      }
    }

    setPagination(element);
  };

  useEffect(() => {
    handlePagination(coupons.total_page, coupons.current_page);
  }, [coupons]);

  return (
    <AdminCouponListWrapper>
      <div className="coupon-list">
        {coupons.data.map((coupon) => (
          <CouponWrapper
            className="col p-3 text-center"
            key={coupon.Id}
            onClick={() => {
              setSelectedCoupon(coupon);
              setOpenModalType(AdminCouponModalType.UPDATE);
              setShowModal(true);
            }}
            role={"button"}
          >
            <p className="fw-bolder">{coupon.Code}</p>
            <div className="col-6 col-lg-3 mx-auto">
              <p
                className={`text-center status ${
                  coupon.Available ? "available" : "not-available"
                }`}
              >
                {coupon.Available ? "available" : "not available"}
              </p>
            </div>
            <p>Discount: Rp {formatCurrency(coupon.DiscountAmount)}</p>
          </CouponWrapper>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-3 gap-1">
        <Button
          btnFunction={() => {
            if (coupons.current_page - 1 > 0) {
              setFilterOption({
                ...filterOption,
                page: coupons.current_page - 1,
              });
            }
          }}
          btnStyle={{
            backgroundColor: "#579EFF",
            color: "#FFFFFF",
            padding: "0.25rem 1rem",
          }}
        >
          {`<`}
        </Button>
        {pagination.map((item, index) => (
          <Button
            btnFunction={() => {
              if (item !== "...") {
                setFilterOption({
                  ...filterOption,
                  page: Number(item),
                });
              }
            }}
            btnStyle={{
              backgroundColor: `${
                coupons.current_page === Number(item) ? "#579EFF" : "#FFFFFF"
              }`,
              borderColor: `${
                coupons.current_page === Number(item) ? "none" : "#579EFF"
              }`,
              border: `${
                coupons.current_page === Number(item) ? "none" : "1px solid"
              }`,
              color: `${
                coupons.current_page === Number(item) ? "#FFFFFF" : "#579EFF"
              }`,
              padding: "0.25rem 1rem",
            }}
          >
            {item}
          </Button>
        ))}
        <Button
          btnFunction={() => {
            if (coupons.current_page + 1 <= coupons.total_page) {
              setFilterOption({
                ...filterOption,
                page: coupons.current_page + 1,
              });
            }
          }}
          btnStyle={{
            backgroundColor: "#579EFF",
            color: "#FFFFFF",
            padding: "0.25rem 1rem",
          }}
        >
          {`>`}
        </Button>
      </div>
    </AdminCouponListWrapper>
  );
};

export default AdminCouponList;
