import { MdTypes } from "@/metadata/MdTypes";

class DataTable {
    public rows: DataTableRow[] = [];
    public columns: DataTableColumn[] = [];

    constructor() {
        
    }

    public AddRow(){

    }

    public AddColumn(){
        
    }
}

class DataTableColumn {
    public name = '';
    public type = MdTypes.None;
    public synonym = '';
    constructor() {
        
    }
}

class DataTableRow {
    constructor() {
        
    }
}