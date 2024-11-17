import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { post } from '../../models/post';
import { SavedPostService } from '../../services/saved-post.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-view',
  imports: [CommonModule,RouterModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  private userCache: { [key: number]: string } = {};

crearPost() {
  this.router.navigate(['/createpost']);
}

eliminarPost(id: number | undefined) {
  Swal.fire({
    title: 'Estas seguro de eliminar el post?',
    text: "no se podra revertir",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.postService.deletePost(id+"").subscribe(() => {
        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
        this.getMyPosts();
      });
    }
  });
}
editarPost(id: number | undefined) {
  this.router.navigate(['/editpost', id]);
}
  estado: string = '';
  posts: post[] = [];

  constructor(
    private postService: PostService,
    private savePostService: SavedPostService,
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe(
      url => {
        this.estado = url[0].path;
        if (this.estado === 'feed') {
          this.getFeed();
        } else if (this.estado === 'myposts') {
          this.getMyPosts();
        } else if (this.estado === 'saved') {
          this.getSavedPosts();
        }
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  likePost(post: post) {
    this.savePostService.getSavedPosts().subscribe((data) => {
      let aparecio = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i].postId === post.id) {
          this.savePostService.deleteSavedPost(data[i].id+'').subscribe(() => {
            Swal.fire("Post eliminado de guardados", "", "success");
          });
          aparecio = true;
        }
      }

      if (!aparecio){
        this.savePostService.savePost(post).subscribe(() => {
          Swal.fire("Post Guardado con exito!", "", "success");
        });
      }
    });
  }

  getFeed(){
    this.postService.getFeedPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  getMyPosts(){
    this.postService.getMyPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  getSavedPosts(){
    this.savePostService.getSavedPosts().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.postService.getPost(data[i].postId+'').subscribe((post) => {
          this.posts.push(post);
        });
      }
    });
  }
}