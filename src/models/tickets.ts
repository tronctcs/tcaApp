export class Tickets {
    constructor(public Id: number, public AssignedGroup: string, public CreatedOn: string,
        public CreatedUpdatedBy: string, public Decs: string, public Remarks: string,
        public IncId: string, public IsClaimed: boolean, public Priority: string,
        public PriorityDisplay: string, public Source: string,
        public Status: string, public Title: string, public Urgency: string) { }
}