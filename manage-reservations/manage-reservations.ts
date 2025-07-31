import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-reservations',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './manage-reservations.html',
  styleUrl: './manage-reservations.css'
})
export class ManageReservations {
  reservations: any[] = [
    {
      id: 'RES001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      roomNumber: '101',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      status: 'Confirmed',
      totalAmount: 450,
      bookingDate: '2024-01-10',
      guests: 2,
      specialRequests: 'Late check-in'
    },
    {
      id: 'RES002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      roomNumber: '205',
      checkIn: '2024-01-20',
      checkOut: '2024-01-25',
      status: 'Pending',
      totalAmount: 750,
      bookingDate: '2024-01-12',
      guests: 3,
      specialRequests: 'Ocean view preferred'
    },
    {
      id: 'RES003',
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      roomNumber: '302',
      checkIn: '2024-01-22',
      checkOut: '2024-01-24',
      status: 'Cancelled',
      totalAmount: 300,
      bookingDate: '2024-01-15',
      guests: 1,
      specialRequests: ''
    }
  ];

  filteredReservations: any[] = [...this.reservations];
  searchTerm = '';
  statusFilter = '';
  currentPage = 1;
  itemsPerPage = 10;
  editingReservation: any = null;

  get totalPages() {
    return Math.ceil(this.filteredReservations.length / this.itemsPerPage);
  }

  get paginatedReservations() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredReservations.slice(startIndex, endIndex);
  }

  onSearch() {
    this.filterReservations();
  }

  onStatusFilter() {
    this.filterReservations();
  }

  filterReservations() {
    this.filteredReservations = this.reservations.filter(reservation => {
      const matchesSearch = reservation.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          reservation.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          reservation.roomNumber.includes(this.searchTerm);
      
      const matchesStatus = !this.statusFilter || reservation.status === this.statusFilter;
      
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
      case 'Confirmed':
        return 'badge bg-success';
      case 'Pending':
        return 'badge bg-warning text-dark';
      case 'Cancelled':
        return 'badge bg-danger';
      case 'Completed':
        return 'badge bg-info';
      default:
        return 'badge bg-secondary';
    }
  }

  editReservation(reservation: any) {
    this.editingReservation = { ...reservation };
  }

  saveReservation() {
    if (this.editingReservation) {
      const index = this.reservations.findIndex(r => r.id === this.editingReservation.id);
      if (index !== -1) {
        this.reservations[index] = { ...this.editingReservation };
        this.filterReservations();
        alert('Reservation updated successfully!');
      }
      this.editingReservation = null;
    }
  }

  cancelEdit() {
    this.editingReservation = null;
  }

  deleteReservation(reservation: any) {
    if (confirm(`Are you sure you want to delete reservation ${reservation.id}?`)) {
      this.reservations = this.reservations.filter(r => r.id !== reservation.id);
      this.filterReservations();
      alert('Reservation deleted successfully!');
    }
  }

  confirmReservation(reservation: any) {
    reservation.status = 'Confirmed';
    this.filterReservations();
    alert('Reservation confirmed successfully!');
  }

  cancelReservation(reservation: any) {
    reservation.status = 'Cancelled';
    this.filterReservations();
    alert('Reservation cancelled successfully!');
  }

  completeReservation(reservation: any) {
    reservation.status = 'Completed';
    this.filterReservations();
    alert('Reservation marked as completed!');
  }
}
