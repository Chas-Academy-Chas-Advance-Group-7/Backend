//* This file shall contain all the types utilizied by the server to recieve and catalog data

// reciever interface

interface user {
  id: number;
  name: string;
  user_name: string;
  password: string;
  role: string;
}

// paket interface
interface Paket {
  paket_id: number;
  sender: string;
  sender_id: number;

  receiver: string;
  receiver_num: number;
  delivery_point: {
    address: string;
    postnummer: number;
    city: string;
  };

  drive_start: Date;
  truck_id: number;
  //(Dessa keysen nedan, kan uppdateras/redigeras med automatisk unders )
  sensor_id: number;
  temperature: number;
  humidity: number;
  sensor_timestamp: number;
  warnings: {
    temperature_warning: string;
    humidity_warning: string;
  };
}

interface sender {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface truck_broker {
  truck_id: number;
  drive_start: Date;
  drive_end: Date;
}
interface Driver {
  id: number;
  name: string;
  email: string;
  password: string;
  truck_id: number;
  location?: string | number;
}

export interface jwtPayload {
  sub: number; // user id
  role: "driver" | "user" | "werehouse";
  email: string;
}
