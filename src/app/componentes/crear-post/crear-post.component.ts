import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { post } from '../../models/post';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-crear-post',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './crear-post.component.html',
  styleUrls: ['./crear-post.component.css']
})
export class CrearPostComponent implements OnInit {
  id: string = "";
  postForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute) {
    this.postForm = this.fb.group({
      titulo: ['', Validators.required],
      texto: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id) {
      this.isEditMode = true;
      this.postService.getPost(this.id).subscribe(post => {
        this.postForm.patchValue(post);
      });
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const formValue = this.postForm.value as post;
      if (this.isEditMode) {
        this.postService.updatePost(this.id, formValue).subscribe(
          () => this.router.navigate(['/myposts'])
        );
      } else {
        this.postService.createPost(formValue).subscribe(
          () => this.router.navigate(['/myposts'])
        );
      }
    }
  }
}