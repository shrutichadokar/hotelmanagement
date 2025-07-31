import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './staff-dashboard.html',
  styleUrl: './staff-dashboard.css'
})
export class StaffDashboard implements OnInit {
  // Staff information (would come from authentication service)
  currentStaff = {
    id: 'STAFF001',
    name: 'John Smith',
    department: 'Maintenance',
    role: 'Senior Technician',
    expertise: ['HVAC Systems', 'Electrical', 'Plumbing'],
    joinDate: '2020-03-15'
  };

  // Dashboard statistics
  stats = {
    totalAssignedComplaints: 12,
    openComplaints: 3,
    inProgressComplaints: 5,
    resolvedComplaints: 4,
    averageResolutionTime: '2.5 hours',
    customerSatisfaction: 4.8
  };

  // Recent activities
  recentActivities = [
    {
      type: 'complaint',
      message: 'Resolved AC issue in Room 205',
      time: '2 hours ago',
      icon: 'fa-check-circle',
      color: 'success'
    },
    {
      type: 'assignment',
      message: 'New complaint assigned - Electrical issue Room 302',
      time: '4 hours ago',
      icon: 'fa-exclamation-triangle',
      color: 'warning'
    },
    {
      type: 'maintenance',
      message: 'Scheduled maintenance completed - Floor 3',
      time: '1 day ago',
      icon: 'fa-tools',
      color: 'info'
    },
    {
      type: 'training',
      message: 'Completed safety training module',
      time: '2 days ago',
      icon: 'fa-graduation-cap',
      color: 'primary'
    }
  ];

  // Quick actions based on staff role
  quickActions = [
    {
      title: 'View My Complaints',
      description: 'Check assigned complaints and updates',
      icon: 'fa-list',
      route: '/staff/complaints',
      color: 'primary'
    },
    {
      title: 'Add Action Log',
      description: 'Log actions taken on complaints',
      icon: 'fa-plus',
      route: '/staff/complaints',
      color: 'success'
    },
    {
      title: 'Update Status',
      description: 'Update complaint status',
      icon: 'fa-edit',
      route: '/staff/complaints',
      color: 'info'
    },
    {
      title: 'View Reports',
      description: 'Access performance reports',
      icon: 'fa-chart-bar',
      route: '/staff/reports',
      color: 'warning'
    }
  ];

  // Navigation menu items
  navMenuItems = [
    {
      title: 'Complaint Management',
      icon: 'fa-exclamation-triangle',
      route: '/staff/complaints',
      description: 'Manage assigned complaints and track progress'
    },
    {
      title: 'Maintenance Schedule',
      icon: 'fa-calendar',
      route: '/staff/schedule',
      description: 'View and manage maintenance schedules'
    },
    {
      title: 'Inventory',
      icon: 'fa-boxes',
      route: '/staff/inventory',
      description: 'Check parts and equipment inventory'
    },
    {
      title: 'Training',
      icon: 'fa-graduation-cap',
      route: '/staff/training',
      description: 'Access training materials and certifications'
    },
    {
      title: 'Profile',
      icon: 'fa-user-cog',
      route: '/staff/profile',
      description: 'Manage personal profile and preferences'
    }
  ];

  // Performance metrics
  performanceMetrics = {
    responseTime: '1.2 hours',
    resolutionRate: '94%',
    customerRating: 4.8,
    completedTasks: 156,
    pendingTasks: 3
  };

  // Upcoming tasks
  upcomingTasks = [
    {
      id: 'TASK001',
      title: 'AC Maintenance - Room 205',
      priority: 'High',
      dueDate: '2024-01-16',
      estimatedTime: '2 hours'
    },
    {
      id: 'TASK002',
      title: 'Electrical Check - Room 302',
      priority: 'Medium',
      dueDate: '2024-01-17',
      estimatedTime: '1 hour'
    },
    {
      id: 'TASK003',
      title: 'Plumbing Repair - Room 101',
      priority: 'Low',
      dueDate: '2024-01-18',
      estimatedTime: '3 hours'
    }
  ];

  // Get current date and time
  get currentDate() {
    return new Date().toLocaleDateString();
  }

  get currentTime() {
    return new Date().toLocaleTimeString();
  }

  ngOnInit() {
    // Initialize component
  }

  // Get performance color based on rating
  getPerformanceColor(rating: number): string {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 4.0) return 'text-warning';
    return 'text-danger';
  }

  // Get priority badge class
  getPriorityBadgeClass(priority: string): string {
    switch (priority) {
      case 'High': return 'badge bg-danger';
      case 'Medium': return 'badge bg-warning';
      case 'Low': return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  }

  // Get activity icon color
  getActivityColor(activity: any): string {
    return `text-${activity.color}`;
  }

  // Calculate workload percentage
  getWorkloadPercentage(): number {
    const total = this.stats.totalAssignedComplaints;
    const inProgress = this.stats.inProgressComplaints;
    return total > 0 ? Math.round((inProgress / total) * 100) : 0;
  }

  // Get workload status
  getWorkloadStatus(): string {
    const percentage = this.getWorkloadPercentage();
    if (percentage >= 80) return 'High Workload';
    if (percentage >= 50) return 'Moderate Workload';
    return 'Normal Workload';
  }

  // Get workload color
  getWorkloadColor(): string {
    const percentage = this.getWorkloadPercentage();
    if (percentage >= 80) return 'text-danger';
    if (percentage >= 50) return 'text-warning';
    return 'text-success';
  }
}
