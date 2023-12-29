export type PostData = {
  Description: string;
  Subject: string;
  Status: string;
  Priority: string;
  Type: string;
  Notes: string;
};

export type PostOutput = {
  sendStatus(arg0: number): unknown;
  status: any;
  json(response: any): unknown;
  Id: number;
  Description: string;
  Subject: string;
  Status: string;
  Priority: string;
  Type: string;
  Created_at: string;
  Updated_at: string;
  Notes: string;
};
