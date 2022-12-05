import axios from "axios";
import AdminCouponDetailModal, {
  AdminCouponModalType,
} from "components/page-components/AdminCouponComponent/CouponDetailModal";
import AdminCouponList from "components/page-components/AdminCouponComponent/CouponList";
import AdminCouponListHeader from "components/page-components/AdminCouponComponent/CouponListHeader";
import AdminNavbar from "components/shared-components/AdminNavbar";
import { ICoupon, ICouponPagination } from "interfaces/Coupon";
import { IFilterOption } from "interfaces/FilterOption";
import { IMenuPagination } from "interfaces/Menu";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AdminCouponWrapper from "./style";

const AdminCoupon = () => {
  const [cookies] = useCookies(["login"]);

  const [filterOption, setFilterOption] = useState<IFilterOption>({
    limit: 6,
  });
  const [coupons, setCoupons] = useState<ICouponPagination>({
    current_page: 0,
    data: [],
    total: 0,
    total_page: 0,
  });
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchAllCoupons = () => {
    axios
      .get(`http://localhost:8080/admin/coupons`, {
        params: filterOption,
        headers: {
          Authorization: `Bearer ${cookies.login}`,
        },
      })
      .then((data) => setCoupons(data.data.data))
      .catch((error) => console.log(error));
  };

  const handleOrderChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setFilterOption({
      ...filterOption,
      order: e.currentTarget.value,
    });
  };

  const handleSortChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setFilterOption({
      ...filterOption,
      sortBy: e.currentTarget.value,
    });
  };

  const [showDetailCouponModal, setShowDetailCouponModal] = useState(false);
  const [openModalType, setOpenModalType] = useState<AdminCouponModalType>(
    AdminCouponModalType.CREATE
  );

  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon>({
    Id: 0,
    Code: "",
    DiscountAmount: 0,
    Available: false,
  });

  useEffect(() => {
    fetchAllCoupons();
  }, [filterOption]);

  return (
    <AdminCouponWrapper>
      <AdminNavbar />

      <div className="container py-5">
        <h1>Coupons</h1>

        <AdminCouponListHeader
          setShowDetailCouponModal={setShowDetailCouponModal}
          handleOrderChange={handleOrderChange}
          handleSortChange={handleSortChange}
          setOpenModalType={setOpenModalType}
          setSelectedCoupon={setSelectedCoupon}
        />
        <AdminCouponList
          coupons={coupons}
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          isLastPage={isLastPage}
          setOpenModalType={setOpenModalType}
          setSelectedCoupon={setSelectedCoupon}
          setShowModal={setShowDetailCouponModal}
        />
        <AdminCouponDetailModal
          coupon={selectedCoupon}
          show={showDetailCouponModal}
          handleClose={() => setShowDetailCouponModal(false)}
          type={openModalType}
        />
      </div>
    </AdminCouponWrapper>
  );
};

export default AdminCoupon;
