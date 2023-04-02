import { t } from "i18next";

export interface TransitEvent {
  state: TransitEventState;
  timestamp: string;
  hub?: string;
  reason?: string;
  exceptionCode?: string;
}

export enum TransitEventState {
  TICKET_CREATED = "TICKET_CREATED",
  PACKAGE_RECEIVED = "PACKAGE_RECEIVED",
  IN_TRANSIT = "IN_TRANSIT",
  NOT_YET_SHIPPED = "NOT_YET_SHIPPED",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  WAITING_FOR_CUSTOMER_ACTION = "WAITING_FOR_CUSTOMER_ACTION",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum EventState {
  TICKET_CREATED = "Order has been created",
  PACKAGE_RECEIVED = "Package Recieved",
  IN_TRANSIT = "In transit",
  NOT_YET_SHIPPED = "Not yet shipped",
  OUT_FOR_DELIVERY = "Out for delivery",
  WAITING_FOR_CUSTOMER_ACTION = "Waiting for customer action",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}

export enum EventStateArabic {
  TICKET_CREATED = "تم انشاء الشحنة",
  PACKAGE_RECEIVED = "تم استلام البضاعة",
  IN_TRANSIT = "في مرحلة انتقالية",
  NOT_YET_SHIPPED = "لم يتم التوصيل بعد",
  OUT_FOR_DELIVERY = "في الطريق إليك",
  WAITING_FOR_CUSTOMER_ACTION = "في انتظار رد العميل",
  DELIVERED = "تم التوصيل",
  CANCELLED = "تم الإلغاء",
}

export interface ShipmentTracking {
  provider: "Bosta";
  CurrentStatus: {
    state: TransitEventState;
    timestamp: string;
  };
  PromisedDate: string;
  TrackingNumber: string;
  TrackingURL: string;
  SupportPhoneNumbers: string[];
  TransitEvents: TransitEvent[];
  CreateDate: string;
  isEditableShipment: boolean;
  nextWorkingDay: {
    dayDate: string;
    dayName: "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thrusday" | "Friday";
  }[];
  error: false;
}

export enum ShipmentState {
  TICKET_CREATED = "Order has been created",
  PACKAGE_RECEIVED = "Package received",
  OUT_FOR_DELIVERY = "Out for delivery",
  DELIVERED = "Delivered",
}
