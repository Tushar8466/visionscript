// Temporary in-memory database to store your analyzed images
export let mockImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800',
    caption: 'Abstract neural network structures in a digital space',
    creative_caption: 'Where digital glass meets the current of thought.',
    accessibility_caption: 'A 3D render of interconnected nodes in space.',
    category: 'Technology',
    objects: ['Neural Structures', 'Nodes', 'Digital Space'],
    tags: ['ai', 'network', 'abstract'],
  },
];

export const addImage = (img: any) => {
  mockImages = [img, ...mockImages];
};

export const deleteImage = (id: string) => {
  mockImages = mockImages.filter((img) => img.id !== id);
};
