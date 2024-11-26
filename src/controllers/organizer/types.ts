export interface event {
  eventId: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  venue: string;
  banner: string;
  type: string;
  agenda: string;
}

export interface response{
    message:string
}


export interface orgId {
  organizerId: string;
}

export interface ticket {
  numberOfGeneralTicket: string;
  numberOfVipTickets: string;
  deadline: string;
  discountOnEarlyBird: string;
  deadlineEarlyBird: string;
}

export interface eventId {
  eventId: string;
}
