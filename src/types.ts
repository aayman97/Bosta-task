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
}
