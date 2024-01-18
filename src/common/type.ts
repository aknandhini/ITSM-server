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
