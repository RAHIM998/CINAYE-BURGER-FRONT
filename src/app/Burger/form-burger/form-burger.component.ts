import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BurgerServiceService } from 'src/app/Services/BurgerServices/burger-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-burger',
  templateUrl: './form-burger.component.html',
  styleUrls: ['./form-burger.component.css']
})
export class FormBurgerComponent implements OnInit {

  burgerForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private burgerService: BurgerServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.burgerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      price: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]], 
      image: [null, [this.imageValidator.bind(this)]],
      description: ['', [Validators.maxLength(1000)]],
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if (this.id) {
      this.burgerService.getBurgerById(this.id).subscribe(
        (response) => {
          if (response.success) {          
            const burgerData = response.data;
            console.log('Données reçues', burgerData.description);

            this.burgerForm.setValue({
              name: burgerData.name,
              price: burgerData.price,
              image: null, // Réinitialiser le champ image, car il est géré séparément
              description: burgerData.description
            });

            // Prévisualiser l'image si disponible
            if (burgerData.image) {
              this.imagePreview = `data:image/jpeg;base64,${burgerData.image}`;
            }
          } else {
            console.error('Erreur :', response.message);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des données', error);
        }
      );
    }
  }

  // Validation de l'image
  imageValidator(control: AbstractControl): ValidationErrors | null {
    const file = this.selectedFile;

    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2 Mo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (!allowedTypes.includes(file.type)) {
        return { invalidType: 'Le fichier doit être une image de type jpg, jpeg ou png.' };
      }

      if (file.size > maxSize) {
        return { invalidSize: 'Le fichier ne doit pas dépasser 2 Mo.' };
      }
    }

    return null;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      
      // Validation des types de fichiers
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Veuillez sélectionner un fichier JPG, JPEG ou PNG.');
        fileInput.value = ''; // Réinitialise le champ de fichier
        return;
      }
  
      // Validation de la taille du fichier (max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB en octets
      if (file.size > maxSize) {
        alert('La taille du fichier ne doit pas dépasser 2MB.');
        fileInput.value = ''; // Réinitialise le champ de fichier
        return;
      }

      this.selectedFile = file;

      // Prévisualiser l'image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Méthode d'ajout des burgers // Méthode d'ajout des burgers 
  addBurger(): void {
    if (this.burgerForm.valid) {
      const formData = new FormData();
      formData.append('name', this.burgerForm.get('name')?.value);
      formData.append('price', this.burgerForm.get('price')?.value.toString());
      formData.append('description', this.burgerForm.get('description')?.value);
  
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }
  
      // Log des données envoyées
      console.log('Données envoyées:', {
        name: this.burgerForm.get('name')?.value,
        price: this.burgerForm.get('price')?.value,
        description: this.burgerForm.get('description')?.value,
        image: this.selectedFile ? this.selectedFile.name : 'Aucune image'
      });
  
      if (this.id) {
        this.burgerService.updateBurger(formData, this.id).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Burger modifié !',
              text: 'Le burger a été modifié avec succès!',
              timer: 2000,
              showConfirmButton: false
            });
            console.log('Burger modifié avec succès !', response);
            this.router.navigate(['/burger']);
          },
          (error) => {
            console.error('Erreur lors de la modification du burger:', error);
          }
        );
      } else {
        this.burgerService.addBerger(formData).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Burger ajouté',
              text: 'Le burger a été ajouté avec succès!',
              timer: 2000,
              showConfirmButton: false
            });
            console.log('Burger ajouté avec succès', response);
            this.router.navigate(['/burger']);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du burger:', error);
          }
        );
      }
    } else {
      console.log('Formulaire invalide:', this.burgerForm.errors);
    }
  }
  
}
