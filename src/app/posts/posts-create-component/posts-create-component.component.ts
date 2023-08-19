import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostsServiceService } from '../posts-service.service';
// import { mimeType } from "./mime-type.validator";
@Component({
  selector: 'app-posts-create-component',
  templateUrl: './posts-create-component.component.html',
  styleUrls: ['./posts-create-component.component.css']
})
export class PostsCreateComponentComponent {
newPost = 'no data';
enteredcontent='';
enteredTitle='';
form!: FormGroup;
imagePreview!:string;

constructor(public postsService: PostsServiceService) {}

ngOnInit() {
  this.form = new FormGroup({
    title: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3)]
    }),
    content: new FormControl(null, { validators: [Validators.required] }),
    image: new FormControl(null,{ validators: [Validators.required] })
  });
 
}



onaddpost(){
  if(this.form.invalid){
    return;
  }

this.postsService.addPost(this.form.value.title,this.form.value.content)
this.form.reset();
}


// onImagePicker(event:Event){
//   const file = (event.target as HTMLInputElement).files?.[0];
//   this.form.patchValue({image:file})
//   this.form.get('image')?.updateValueAndValidity();
//   // console.log(file);
//   // console.log(this.form)
// const reader= new FileReader();
// reader.onload=()=>{
//   this.imagePreview!=reader.result as string;
// };
// reader.readAsDataURL(file);

// }
onImagePicker(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  this.form.patchValue({ image: file });
  this.form.get('image')?.updateValueAndValidity();
   console.log(file);
   console.log(this.form)

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}


}
