import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-rooms',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './manage-rooms.html',
  styleUrl: './manage-rooms.css'
})
export class ManageRooms {
  rooms: any[] = [
    {
      id: 1,
      roomNumber: '101',
      type: 'Standard',
      price: 150,
      status: 'Available',
      amenities: ['WiFi', 'TV', 'Air Conditioning'],
      maxOccupancy: 2,
      description: 'Comfortable standard room with city view'
    },
    {
      id: 2,
      roomNumber: '205',
      type: 'Deluxe',
      price: 250,
      status: 'Occupied',
      amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Balcony'],
      maxOccupancy: 3,
      description: 'Luxury deluxe room with balcony and ocean view'
    },
    {
      id: 3,
      roomNumber: '302',
      type: 'Suite',
      price: 400,
      status: 'Maintenance',
      amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Kitchen', 'Jacuzzi'],
      maxOccupancy: 4,
      description: 'Premium suite with kitchen and jacuzzi'
    }
  ];

  filteredRooms: any[] = [...this.rooms];
  searchTerm = '';
  statusFilter = '';
  typeFilter = '';
  sortBy = 'roomNumber';
  sortOrder = 'asc';
  currentPage = 1;
  itemsPerPage = 10;
  editingRoom: any = null;

  get totalPages() {
    return Math.ceil(this.filteredRooms.length / this.itemsPerPage);
  }

  get paginatedRooms() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredRooms.slice(startIndex, endIndex);
  }

  onSearch() {
    this.filterRooms();
  }

  onStatusFilter() {
    this.filterRooms();
  }

  onTypeFilter() {
    this.filterRooms();
  }

  filterRooms() {
    this.filteredRooms = this.rooms.filter(room => {
      const matchesSearch = room.roomNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          room.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          room.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || room.status === this.statusFilter;
      const matchesType = !this.typeFilter || room.type === this.typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
    
    this.sortRooms();
    this.currentPage = 1;
  }

  sortRooms() {
    this.filteredRooms.sort((a, b) => {
      let aValue = a[this.sortBy];
      let bValue = b[this.sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (this.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getStatusBadgeClass(status: string) {
    switch (status) {
      case 'Available':
        return 'badge bg-success';
      case 'Occupied':
        return 'badge bg-warning text-dark';
      case 'Maintenance':
        return 'badge bg-danger';
      case 'Reserved':
        return 'badge bg-info';
      default:
        return 'badge bg-secondary';
    }
  }

  editRoom(room: any) {
    this.editingRoom = { ...room };
  }

  saveRoom() {
    if (this.editingRoom) {
      const index = this.rooms.findIndex(r => r.id === this.editingRoom.id);
      if (index !== -1) {
        this.rooms[index] = { ...this.editingRoom };
        this.filterRooms();
        alert('Room updated successfully!');
      }
      this.editingRoom = null;
    }
  }

  cancelEdit() {
    this.editingRoom = null;
  }

  deleteRoom(room: any) {
    if (confirm(`Are you sure you want to delete Room ${room.roomNumber}?`)) {
      this.rooms = this.rooms.filter(r => r.id !== room.id);
      this.filterRooms();
      alert('Room deleted successfully!');
    }
  }

  toggleRoomStatus(room: any) {
    const statuses = ['Available', 'Occupied', 'Maintenance', 'Reserved'];
    const currentIndex = statuses.indexOf(room.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    room.status = statuses[nextIndex];
    this.filterRooms();
  }

  getAmenitiesDisplay(amenities: string[]) {
    return amenities.join(', ');
  }
}
