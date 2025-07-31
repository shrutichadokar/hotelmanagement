import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-bills',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './manage-bills.html',
  styleUrl: './manage-bills.css'
})
export class ManageBills {
  bills: any[] = [
    {
      id: 'BILL001',
      customerName: 'John Doe',
      customerId: 'CUST001',
      date: '2024-01-15',
      items: [
        { name: 'Room Charge', amount: 300 },
        { name: 'Room Service', amount: 50 },
        { name: 'Mini Bar', amount: 25 }
      ],
      subtotal: 375,
      tax: 37.5,
      totalAmount: 412.5,
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'BILL002',
      customerName: 'Jane Smith',
      customerId: 'CUST002',
      date: '2024-01-20',
      items: [
        { name: 'Room Charge', amount: 500 },
        { name: 'Spa Service', amount: 150 },
        { name: 'Restaurant', amount: 100 }
      ],
      subtotal: 750,
      tax: 75,
      totalAmount: 825,
      paymentStatus: 'Pending',
      paymentMethod: 'Cash'
    }
  ];

  filteredBills: any[] = [...this.bills];
  searchTerm = '';
  statusFilter = '';
  currentPage = 1;
  itemsPerPage = 10;
  editingBill: any = null;
  newItem = { name: '', amount: 0 };

  get totalPages() {
    return Math.ceil(this.filteredBills.length / this.itemsPerPage);
  }

  get paginatedBills() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredBills.slice(startIndex, endIndex);
  }

  onSearch() {
    this.filterBills();
  }

  onStatusFilter() {
    this.filterBills();
  }

  filterBills() {
    this.filteredBills = this.bills.filter(bill => {
      const matchesSearch = bill.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          bill.customerName.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || bill.paymentStatus === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    this.currentPage = 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getStatusBadgeClass(status: string) {
    switch (status) {
      case 'Paid':
        return 'badge bg-success';
      case 'Pending':
        return 'badge bg-warning text-dark';
      case 'Overdue':
        return 'badge bg-danger';
      case 'Cancelled':
        return 'badge bg-secondary';
      default:
        return 'badge bg-info';
    }
  }

  editBill(bill: any) {
    this.editingBill = JSON.parse(JSON.stringify(bill));
  }

  saveBill() {
    if (this.editingBill) {
      const index = this.bills.findIndex(b => b.id === this.editingBill.id);
      if (index !== -1) {
        this.bills[index] = { ...this.editingBill };
        this.filterBills();
        alert('Bill updated successfully!');
      }
      this.editingBill = null;
    }
  }

  cancelEdit() {
    this.editingBill = null;
  }

  deleteBill(bill: any) {
    if (confirm(`Are you sure you want to delete bill ${bill.id}?`)) {
      this.bills = this.bills.filter(b => b.id !== bill.id);
      this.filterBills();
      alert('Bill deleted successfully!');
    }
  }

  addItem() {
    if (this.newItem.name && this.newItem.amount > 0) {
      this.editingBill.items.push({ ...this.newItem });
      this.calculateBillTotals();
      this.newItem = { name: '', amount: 0 };
    }
  }

  removeItem(index: number) {
    this.editingBill.items.splice(index, 1);
    this.calculateBillTotals();
  }

  calculateBillTotals() {
    if (this.editingBill) {
      this.editingBill.subtotal = this.editingBill.items.reduce((sum: number, item: any) => sum + item.amount, 0);
      this.editingBill.tax = this.editingBill.subtotal * 0.1; // 10% tax
      this.editingBill.totalAmount = this.editingBill.subtotal + this.editingBill.tax;
    }
  }

  markAsPaid(bill: any) {
    bill.paymentStatus = 'Paid';
    this.filterBills();
    alert('Bill marked as paid!');
  }

  printBill(bill: any) {
    alert(`Printing bill ${bill.id}`);
  }

  downloadBill(bill: any) {
    alert(`Downloading bill ${bill.id}`);
  }
}
