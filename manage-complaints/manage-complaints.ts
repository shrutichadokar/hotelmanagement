import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-complaints',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-complaints.html',
  styleUrl: './manage-complaints.css'
})
export class ManageComplaints implements OnInit {
  // Staff information (would come from authentication service)
  currentStaff = {
    id: 'STAFF001',
    name: 'John Smith',
    department: 'Maintenance',
    expertise: ['Maintenance', 'Technical Issues']
  };

  // Assigned complaints for this staff member
  assignedComplaints: any[] = [
    {
      id: 'COMP001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      roomNumber: '101',
      subject: 'AC not working properly',
      description: 'The air conditioning unit is not cooling the room effectively. The temperature remains at 78°F even when set to 65°F.',
      category: 'Maintenance',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'Maintenance',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      actions: [
        {
          id: 'ACT001',
          action: 'Initial assessment completed',
          details: 'Inspected AC unit, found clogged filter and low refrigerant levels',
          timestamp: '2024-01-15 10:30',
          staffMember: 'John Smith'
        }
      ],
      customerHistory: [
        {
          date: '2024-01-10',
          interaction: 'Check-in',
          notes: 'Customer checked in without issues'
        }
      ]
    },
    {
      id: 'COMP002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      roomNumber: '205',
      subject: 'Electrical outlet not working',
      description: 'The electrical outlet near the desk is not providing power. Tried multiple devices.',
      category: 'Maintenance',
      priority: 'Medium',
      status: 'Open',
      assignedTo: 'Maintenance',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
      actions: [],
      customerHistory: [
        {
          date: '2024-01-14',
          interaction: 'Complaint submitted',
          notes: 'Customer reported electrical issue'
        }
      ]
    },
    {
      id: 'COMP003',
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      roomNumber: '302',
      subject: 'Plumbing leak',
      description: 'There is a small leak under the bathroom sink. Water is dripping slowly.',
      category: 'Maintenance',
      priority: 'Low',
      status: 'Resolved',
      assignedTo: 'Maintenance',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-14',
      actions: [
        {
          id: 'ACT002',
          action: 'Leak repaired',
          details: 'Replaced worn-out washer in sink drain pipe',
          timestamp: '2024-01-14 14:15',
          staffMember: 'John Smith'
        },
        {
          id: 'ACT003',
          action: 'Customer notified',
          details: 'Informed customer that repair is complete',
          timestamp: '2024-01-14 14:20',
          staffMember: 'John Smith'
        }
      ],
      customerHistory: [
        {
          date: '2024-01-13',
          interaction: 'Check-in',
          notes: 'Customer checked in without issues'
        },
        {
          date: '2024-01-14',
          interaction: 'Complaint resolved',
          notes: 'Customer satisfied with repair'
        }
      ]
    }
  ];

  filteredComplaints: any[] = [...this.assignedComplaints];
  selectedComplaint: any = null;
  newAction = {
    action: '',
    details: '',
    internalNotes: ''
  };
  searchTerm = '';
  statusFilter = '';
  priorityFilter = '';
  categoryFilter = '';
  showActionModal = false;
  showDetailsModal = false;

  ngOnInit() {
    this.filterComplaints();
  }

  // Filter complaints based on search and filters
  filterComplaints() {
    this.filteredComplaints = this.assignedComplaints.filter(complaint => {
      const matchesSearch = !this.searchTerm || 
        complaint.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        complaint.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        complaint.subject.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || complaint.status === this.statusFilter;
      const matchesPriority = !this.priorityFilter || complaint.priority === this.priorityFilter;
      const matchesCategory = !this.categoryFilter || complaint.category === this.categoryFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }

  // Search functionality
  onSearch() {
    this.filterComplaints();
  }

  // Filter by status
  onStatusFilter() {
    this.filterComplaints();
  }

  // Filter by priority
  onPriorityFilter() {
    this.filterComplaints();
  }

  // Filter by category
  onCategoryFilter() {
    this.filterComplaints();
  }

  // View detailed complaint information
  viewComplaintDetails(complaint: any) {
    this.selectedComplaint = complaint;
    this.showDetailsModal = true;
  }

  // Add new action to complaint
  addAction(complaint: any) {
    this.selectedComplaint = complaint;
    this.newAction = {
      action: '',
      details: '',
      internalNotes: ''
    };
    this.showActionModal = true;
  }

  // Save new action
  saveAction() {
    if (this.newAction.action.trim() && this.selectedComplaint) {
      const action = {
        id: 'ACT' + Date.now(),
        action: this.newAction.action,
        details: this.newAction.details,
        internalNotes: this.newAction.internalNotes,
        timestamp: new Date().toLocaleString(),
        staffMember: this.currentStaff.name
      };

      this.selectedComplaint.actions.push(action);
      this.selectedComplaint.updatedAt = new Date().toISOString().split('T')[0];
      
      this.showActionModal = false;
      this.filterComplaints();
    }
  }

  // Update complaint status
  updateStatus(complaint: any, newStatus: string) {
    complaint.status = newStatus;
    complaint.updatedAt = new Date().toISOString().split('T')[0];
    
    // Add status change action
    const action = {
      id: 'ACT' + Date.now(),
      action: `Status updated to ${newStatus}`,
      details: `Complaint status changed from ${complaint.status} to ${newStatus}`,
      internalNotes: '',
      timestamp: new Date().toLocaleString(),
      staffMember: this.currentStaff.name
    };
    
    complaint.actions.push(action);
    this.filterComplaints();
  }

  // Get badge classes for status
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Open': return 'badge bg-warning';
      case 'In Progress': return 'badge bg-info';
      case 'Resolved': return 'badge bg-success';
      case 'Closed': return 'badge bg-secondary';
      default: return 'badge bg-primary';
    }
  }

  // Get badge classes for priority
  getPriorityBadgeClass(priority: string): string {
    switch (priority) {
      case 'High': return 'badge bg-danger';
      case 'Medium': return 'badge bg-warning';
      case 'Low': return 'badge bg-success';
      default: return 'badge bg-primary';
    }
  }

  // Get badge classes for category
  getCategoryBadgeClass(category: string): string {
    switch (category) {
      case 'Maintenance': return 'badge bg-primary';
      case 'Housekeeping': return 'badge bg-info';
      case 'Noise': return 'badge bg-warning';
      case 'Service': return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  }

  // Close modals
  closeModals() {
    this.showActionModal = false;
    this.showDetailsModal = false;
    this.selectedComplaint = null;
  }

  // Get complaint statistics
  getComplaintStats() {
    const total = this.assignedComplaints.length;
    const open = this.assignedComplaints.filter(c => c.status === 'Open').length;
    const inProgress = this.assignedComplaints.filter(c => c.status === 'In Progress').length;
    const resolved = this.assignedComplaints.filter(c => c.status === 'Resolved').length;
    
    return { total, open, inProgress, resolved };
  }
}
