interface Sign {
    id: number;
    symbol: string;
    direction: string | null; // Replace null with appropriate type if direction can't be null
    stoploss: string | null; // Replace null with appropriate type if stoploss can't be null
    takeprofit: string | null; // Replace null with appropriate type if takeprofit can't be null
    entry_from: string | null; // Replace null with appropriate type if entry_from can't be null
    entry_to: string | null; // Replace null with appropriate type if entry_to can't be null
    status: number;
    createDate: Date | null; // Replace null with appropriate type if createDate can't be null
    updateDate: Date | null; // Replace null with appropriate type if updateDate can't be null
}

export default Sign;
