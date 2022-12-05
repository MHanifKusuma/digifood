export interface ICoupon {
  Id: number;
  Code: string;
  DiscountAmount: number;
  Available: boolean;
}

export interface IUserCoupons {
  Id: number;
  Coupon: ICoupon;
  Expired_at: Date;
  Amount: number;
}

export interface ICouponPagination {
  data: ICoupon[];
  current_page: number;
  total: number;
  total_page: number;
}
