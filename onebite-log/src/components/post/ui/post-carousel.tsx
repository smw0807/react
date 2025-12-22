import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function PostCarousel({ imageUrls }: { imageUrls: string[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {imageUrls?.map((url, index) => (
          <CarouselItem className={`basis-3/5`} key={index}>
            <div className="overflow-hidden rounded-xl">
              <img
                src={url}
                className="h-full max-h-[350px] w-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
