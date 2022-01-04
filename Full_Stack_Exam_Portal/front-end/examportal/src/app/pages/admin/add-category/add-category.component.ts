import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = <Category>{};

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  public onSubmit() {

    console.log('service hit ');
    if (this.category.title == null || this.category.title.trim() == '') {
      Swal.fire("Category Add", "Category Title can not be null", "error");
    } else {
      this.categoryService.addCategory(this.category).subscribe(
        (response: Category) => {
          Swal.fire("Category Add", "New Category Added", "success");
          this.category.description = '';
          this.category.title = '';
        },
        (error: HttpErrorResponse) => {
          Swal.fire("Category Add", "Something Went Wrong", "error");
        }
      );
    }

  }

}
