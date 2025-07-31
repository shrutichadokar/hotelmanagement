import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-rooms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-rooms.html',
  styleUrl: './add-rooms.css'
})
export class AddRooms {
  roomForm: FormGroup;
  amenities: string[] = ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Balcony', 'Ocean View', 'Kitchen'];
  selectedAmenities: string[] = [];
  isBulkUpload = false;
  csvData: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.roomForm = this.fb.group({
      roomNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      roomType: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      maxOccupancy: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      description: ['', Validators.required],
      availability: [true]
    });
  }

  get f() {
    return this.roomForm.controls;
  }

  toggleAmenity(amenity: string) {
    const index = this.selectedAmenities.indexOf(amenity);
    if (index > -1) {
      this.selectedAmenities.splice(index, 1);
    } else {
      this.selectedAmenities.push(amenity);
    }
  }

  generateRoomNumber() {
    // Generate a random room number between 100-999
    const roomNumber = Math.floor(Math.random() * 900) + 100;
    this.roomForm.patchValue({ roomNumber: roomNumber.toString() });
  }

  onSubmit() {
    if (this.roomForm.valid && this.selectedAmenities.length > 0) {
      const roomData = {
        ...this.roomForm.value,
        amenities: this.selectedAmenities,
        id: Date.now() // Simple ID generation
      };
      
      // Here you would typically save to a service/database
      console.log('Room data:', roomData);
      alert('Room added successfully!');
      this.roomForm.reset();
      this.selectedAmenities = [];
    } else {
      alert('Please fill all required fields and select at least one amenity.');
    }
  }

  onBulkUpload() {
    if (this.csvData.trim()) {
      const lines = this.csvData.split('\n');
      const rooms = lines.slice(1).map(line => {
        const [roomNumber, roomType, price, maxOccupancy, description, amenities] = line.split(',');
        return {
          roomNumber: roomNumber?.trim(),
          roomType: roomType?.trim(),
          price: parseFloat(price?.trim() || '0'),
          maxOccupancy: parseInt(maxOccupancy?.trim() || '1'),
          description: description?.trim(),
          amenities: amenities?.trim().split('|') || []
        };
      }).filter(room => room.roomNumber);

      console.log('Bulk rooms data:', rooms);
      alert(`${rooms.length} rooms processed successfully!`);
      this.csvData = '';
      this.isBulkUpload = false;
    }
  }

  downloadCSVTemplate() {
    const template = 'Room Number,Room Type,Price,Max Occupancy,Description,Amenities\n101,Standard,100,2,Comfortable room,WiFi|TV\n102,Deluxe,150,3,Luxury room,WiFi|TV|Air Conditioning';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'room_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
} 