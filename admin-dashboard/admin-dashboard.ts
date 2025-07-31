import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
  adminName = 'Admin User';
  currentDate = new Date().toLocaleDateString();
  currentTime = new Date().toLocaleTimeString();

  // Dashboard Stats
  stats = {
    totalBookings: 156,
    availableRooms: 23,
    totalRevenue: 45600,
    pendingComplaints: 8,
    activeUsers: 89,
    totalRooms: 50
  };

  // Recent Activities
  recentActivities = [
    {
      type: 'booking',
      message: 'New booking received for Room 205',
      time: '2 minutes ago',
      icon: 'fa-calendar-plus'
    },
    {
      type: 'complaint',
      message: 'Complaint resolved for Room 101',
      time: '15 minutes ago',
      icon: 'fa-check-circle'
    },
    {
      type: 'payment',
      message: 'Payment received for Bill BILL001',
      time: '1 hour ago',
      icon: 'fa-credit-card'
    },
    {
      type: 'room',
      message: 'Room 302 marked as available',
      time: '2 hours ago',
      icon: 'fa-bed'
    }
  ];

  // Quick Actions
  quickActions = [
    {
      title: 'Add Room',
      description: 'Add new room to inventory',
      icon: 'fa-plus-circle',
      route: '/admin/add-rooms',
      color: 'primary'
    },
    {
      title: 'Manage Reservations',
      description: 'View and manage bookings',
      icon: 'fa-calendar',
      route: '/admin/reservations',
      color: 'success'
    },
    {
      title: 'Search Bills',
      description: 'Find and manage bills',
      icon: 'fa-search',
      route: '/admin/bills',
      color: 'info'
    },
    {
      title: 'Manage Users',
      description: 'Manage customer accounts',
      icon: 'fa-users',
      route: '/admin/users',
      color: 'warning'
    },
    {
      title: 'Manage Complaints',
      description: 'Handle customer complaints',
      icon: 'fa-exclamation-triangle',
      route: '/admin/complaints',
      color: 'danger'
    },
    {
      title: 'Room Management',
      description: 'Manage room inventory',
      icon: 'fa-bed',
      route: '/admin/rooms',
      color: 'secondary'
    }
  ];

  // Navigation Menu Items
  navMenuItems = [
    {
      title: 'Room Management',
      icon: 'fa-bed',
      route: '/admin/rooms',
      description: 'Manage room inventory and availability'
    },
    {
      title: 'Booking Management',
      icon: 'fa-calendar',
      route: '/admin/reservations',
      description: 'View and manage customer reservations'
    },
    {
      title: 'User Management',
      icon: 'fa-users',
      route: '/admin/users',
      description: 'Manage customer accounts and profiles'
    },
    {
      title: 'Reports & Analytics',
      icon: 'fa-chart-bar',
      route: '/admin/reports',
      description: 'View detailed reports and analytics'
    },
    {
      title: 'Profile',
      icon: 'fa-user-cog',
      route: '/admin/profile',
      description: 'Manage admin profile and settings'
    }
  ];

  getOccupancyRate() {
    return Math.round(((this.stats.totalRooms - this.stats.availableRooms) / this.stats.totalRooms) * 100);
  }

  getRevenueGrowth() {
    return '+12.5%'; // Mock data
  }

  getBookingGrowth() {
    return '+8.3%'; // Mock data
  }
}
