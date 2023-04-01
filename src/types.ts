export interface TransitEvent {
  state: TransitEventState;
  timestamp: string;
  hub?: string;
  reason?: string;
}

export enum TransitEventState {
  TICKET_CREATED = "Ticket Created",
  PACKAGE_RECEIVED = "Package Received",
  IN_TRANSIT = "In Transit",
  NOT_YET_SHIPPED = "Not Yet Shipped",
  OUT_FOR_DELIVERY = "Out For Delivery",
  WAITING_FOR_CUSTOMER_ACTION = "Waiting For Customer Action",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}
