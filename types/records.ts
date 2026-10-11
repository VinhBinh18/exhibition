export type ClientRecord = {
  id: string;
  name: string;
  email: string;
  companyName: string;
  phone: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

export type ExhibitionEventRecord = {
  id: string;
  name: string;
  location: string;
  fromDate: string;
  toDate: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

export type EventRegistrationRecord = {
  id: string;
  clientId: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  client?: Pick<ClientRecord, "id" | "name" | "email" | "companyName" | "phone">;
  event?: Pick<ExhibitionEventRecord, "id" | "name" | "location" | "fromDate" | "toDate">;
};
