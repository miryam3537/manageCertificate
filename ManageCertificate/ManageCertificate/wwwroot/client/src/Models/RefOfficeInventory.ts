export interface RefOfficeInventory {
  id: number;
  inventory: number;
  year: number;
  certificateId: number;
  certificateName?: string;          // להוסיף שדה אם קיים
  unusedInventoryBalance?: number;   // להוסיף שדה אם קיים
  editedMinimum?: number;
  minimum?: number;
  }
  