import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/Models/Car.model';
import { CarsService } from 'src/app/Services/Cars/cars.service';

@Component({
  selector: 'app-admin-add-new-car-page',
  templateUrl: './admin-add-new-car-page.component.html',
  styleUrls: ['./admin-add-new-car-page.component.scss'],
})
export class AdminAddNewCarPageComponent implements OnInit {
  // This page at first adds a car without image,
  // then lets user to upload image after it gets the given id to the car by the backend

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private router: Router
  ) {}
  carId: number = 0;

  ShowImageButton: boolean = false;

  RegexPatterns = [
    { name: 'name', pattern: /^[a-zA-Z ]{1,50}$/ }, // Maximum of 50 characters and no numbers
    { name: 'price', pattern: /^(?!0)\d{1,7}$/  }, // Number between 1-9999999:
    { name: 'unitsInStock', pattern: /^(?:0|[1-9]\d{0,2}|1000)$/ }, // Number between 0-1000:
    { name: 'modelYear', pattern: /^(188[6-9]|189\d|19\d{2}|20[01]\d|202[0-3])$/ }, // Number from 1886-2023
  ];
  
  formData: any= {
    name: '',
    price: 0,
    unitsInStock: 0,
    modelYear: 0,
  };

  ngOnInit(): void {
    // Validate all fields on page load
    Object.keys(this.formData).forEach((field) => {
      this.validateField(field);
    });
  }

  // Field Validators
  validateField(field: string): boolean {
    const fieldObj = this.RegexPatterns?.find(x => x.name === field);
  
    const pattern = fieldObj?.pattern;

    this.updateform()

    const fieldValue = this.formData[field];
    if (fieldValue === "" || fieldValue === undefined) {
      return true; // field not found, assume valid
    }
  
    if (!fieldObj) {
      return true; // field not found, assume valid
    }
  
    if (!fieldValue.match(pattern)) {
      return false; // pattern not matched, input is invalid
    }
  
    return true; // pattern matched, input is valid
  }
  
  // Adding value to formData from car
  updateform()
  {
    this.formData.name = this.car.name;
    this.formData.price = this.car.price;
    this.formData.unitsInStock = this.car.unitsInStock;
    this.formData.modelYear = this.car.modelYear;
  }

  car: Car = {
    id: 0,
    name: '',
    category: '',
    price: 0,
    unitsInStock: 0,
    modelYear: 0,
    imageSrc: '',
  };
  async newCar() {
    await this.carsService.PostNewCar(this.car).subscribe({
      next: (response) => {
        console.log(response);
        // getting the new car given id and then letting user upload the image
         this.carsService.GetSingleCar2(this.car).subscribe({
          next: (car) => {
            this.car = car;
            this.carId = this.car.id;
            console.log(this.carId);
            this.ShowImageButton = true;
          },
        });
      },
    });
  }
}
