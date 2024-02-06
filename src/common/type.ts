export type PostData = {
  Description: string;
  Subject: string;
  Status: string;
  Priority: string;
  Type: string;
  Notes: string;
  Assigned_to: string;
};

export type PutData = {
  Description?: string;
  Subject?: string;
  Status?: string;
  Priority?: string;
  Type?: string;
  Notes?: string;
  Assigned_to?: string;
};

type EmailMandatory = {
  Email: string;
  Status?: "Open" | "progress" | "Hold" | "Closed";
};

type StatusMandatory = {
  Email?: string;
  Status: "Open" | "progress" | "Hold" | "Closed";
};

type EmailAndStatusMandatory = {
  Email: string;
  Status: "Open" | "progress" | "Hold" | "Closed";
};

type NoMandatory = {
  Email?: string;
  Status?: "Open" | "progress" | "Hold" | "Closed";
};

export type QueryInputs =
  | EmailMandatory
  | StatusMandatory
  | EmailAndStatusMandatory
  | NoMandatory;

export type Param = {
  Email?: string;
  Status?: string;
};

export type UserInput = {
  Email: string;
  Name: string;
  Password: string;
};

export type auth = {
  Email: string;
  Password: string;
};

export type PageNumberMandatory = {
  pageNumber: string;
};
export type NoMandatoryP = {
  pageNumber?: string;
};

export type page = PageNumberMandatory | NoMandatoryP;
