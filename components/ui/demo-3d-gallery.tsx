import InfiniteGallery from "@/components/ui/3d-gallery-photography";

export default function DemoOne() {
  const sampleImages = [
    { src: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&auto=format&fit=crop&q=80", alt: "Image 1" },
    { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=80", alt: "Image 2" },
    { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80", alt: "Image 3" },
    { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80", alt: "Image 4" },
    { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80", alt: "Image 5" },
    { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80", alt: "Image 6" },
  ];

  return (
    <main className="h-full min-h-screen w-full">
      <InfiniteGallery images={sampleImages} speed={1.2} zSpacing={3} visibleCount={12} falloff={{ near: 0.8, far: 14 }} className="h-screen w-full overflow-hidden rounded-lg" />
    </main>
  );
}
