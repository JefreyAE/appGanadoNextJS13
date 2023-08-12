class ImagePostAnimal {
    id: number | null; 
    image_name: string | null;
    title: string | null;
    description: string | null;
    animal_id: number | null;
    posts_animals_id: number | null;
  
    constructor(
      id: number | null,
      image_name: string | null,
      title: string | null,
      description: string | null,
      animal_id: number | null,
      posts_animals_id: number | null,
    ) {
      this.id = id;
      this.image_name = image_name;
      this.title = title;
      this.description = description;
      this.animal_id = animal_id;
      this.posts_animals_id = posts_animals_id;
    }
  }
  
  export default ImagePostAnimal;