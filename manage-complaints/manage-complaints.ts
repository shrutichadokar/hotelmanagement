import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-complaints',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './manage-complaints.html',
  styleUrl: './manage-complaints.css'
})
export class ManageComplaints {
  complaints: any[] = [
    {
      id: 'COMP001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      roomNumber: '101',
      subject: 'Noise from adjacent room',
      description: 'There is loud noise coming from room 102 that is disturbing our sleep.',
      category: 'Noise',
      priority: 'High',
      status: 'Open',
      assignedTo: 'Maintenance',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'COMP002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      roomNumber: '205',
      subject: 'AC not working properly',
      description: 'The air conditioning unit is not cooling the room effectively.',
      category: 'Maintenance',
      priority: 'Medium',
      status: 'In Progress',
      assignedTo: 'Maintenance',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-15'
    },
    {
      id: 'COMP003',
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      roomNumber: '302',
      subject: 'Room cleaning issue',
      description: 'The room was not properly cleaned when we checked in.',
      category: 'Housekeeping',
      priority: 'Low',
      status: 'Resolved',
      assignedTo: 'Housekeeping',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-14'
    }
  ];

  filteredComplaints: any[] = [...this.complaints];
  searchTerm = '';
  statusFilter = '';
  priorityFilter = '';
  categoryFilter = '';
  currentPage = 1;
  itemsPerPage = 10;
  editingComplaint: any = null;

  get totalPages() {
    return Math.ceil(this.filteredComplaints.length / this.itemsPerPage);
  }

  get paginatedComplaints() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredComplaints.slice(startIndex, endIndex);
  }

  onSearch() {
    this.filterComplaints();
  }

  onStatusFilter() {
    this.filterComplaints();
  }

  onPriorityFilter() {
    this.filterComplaints();
  }

  onCategoryFilter() {
    this.filterComplaints();
  }

  filterComplaints() {
    this.filteredComplaints = this.complaints.filter(complaint => {
      const matchesSearch = complaint.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          complaint.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          complaint.subject.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || complaint.status === this.statusFilter;
      const matchesPriority = !this.priorityFilter || complaint.priority === this.priorityFilter;
      const matchesCategory = !this.categoryFilter || complaint.category === this.categoryFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
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
      case 'Open':
        return 'badge bg-danger';
      case 'In Progress':
        return 'badge bg-warning text-dark';
      case 'Resolved':
        return 'badge bg-success';
      case 'Closed':
        return 'badge bg-secondary';
      default:
        return 'badge bg-info';
    }
  }

  getPriorityBadgeClass(priority: string) {
    switch (priority) {
      case 'High':
        return 'badge bg-danger';
      case 'Medium':
        return 'badge bg-warning text-dark';
      case 'Low':
        return 'badge bg-success';
      default:
        return 'badge bg-info';
    }
  }

  getCategoryBadgeClass(category: string) {
    switch (category) {
      case 'Maintenance':
        return 'badge bg-primary';
      case 'Housekeeping':
        return 'badge bg-success';
      case 'Noise':
        return 'badge bg-warning text-dark';
      case 'Service':
        return 'badge bg-info';
      default:
        return 'badge bg-secondary';
    }
  }

  editComplaint(complaint: any) {
    this.editingComplaint = { ...complaint };
  }

  saveComplaint() {
    if (this.editingComplaint) {
      const index = this.complaints.findIndex(c => c.id === this.editingComplaint.id);
      if (index !== -1) {
        this.complaints[index] = { ...this.editingComplaint };
        this.filterComplaints();
        alert('Complaint updated successfully!');
      }
      this.editingComplaint = null;
    }
  }

  cancelEdit() {
    this.editingComplaint = null;
  }

  deleteComplaint(complaint: any) {
    if (confirm(`Are you sure you want to delete complaint ${complaint.id}?`)) {
      this.complaints = this.complaints.filter(c => c.id !== complaint.id);
      this.filterComplaints();
      alert('Complaint deleted successfully!');
    }
  }

  assignComplaint(complaint: any) {
    const departments = ['Maintenance', 'Housekeeping', 'Front Desk', 'Management'];
    const department = prompt('Assign to department:', complaint.assignedTo);
    if (department && departments.includes(department)) {
      complaint.assignedTo = department;
      complaint.status = 'In Progress';
      this.filterComplaints();
      alert(`Complaint assigned to ${department}`);
    }
  }

  resolveComplaint(complaint: any) {
    complaint.status = 'Resolved';
    this.filterComplaints();
    alert('Complaint marked as resolved!');
  }

  closeComplaint(complaint: any) {
    complaint.status = 'Closed';
    this.filterComplaints();
    alert('Complaint closed!');
  }
}
