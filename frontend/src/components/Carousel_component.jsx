// import * as React from "react"
// import Autoplay from "embla-carousel-autoplay"
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
// import { Button } from "./ui/button"

// const categories = [
//   "Frontend Developer",
//   "Backend Developer",
//   "Data Science",
//   "Graphic Designer",
//   "FullStack Developer",
//   "UX/UI Designer",
//   "Mobile Developer",
//   "Cloud Engineer",
//   "DevOps Engineer",
//   "Product Manager",
//   "Software Engineer",
//   "Machine Learning Engineer",
//   "Game Developer",
//   "Cybersecurity Specialist",
//   "Digital Marketer",
//   "QA Engineer",
//   "Business Analyst",
//   "System Administrator",
//   "Data Engineer",
//   "Blockchain Developer",
// ]

// export function CarouselPlugin() {
//   const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false }))  // Autoplay the carousel

//   return (
//     <Carousel className="w-full max-w-2xl mx-auto my-20"
//     plugins={[plugin.current]}
//     onMouseEnter={plugin.current.stop}
//     onMouseLeave={plugin.current.reset}
//     >
//       <CarouselContent>
//         {
//           categories.map((cat, index) => (
//             <CarouselItem className="md:basis-1/2 lg-basis-1/3">
//               <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
//             </CarouselItem>
//           ))
//         }
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   )
// }
// const categories = [
//   "Frontend Developer",
//   "Backend Developer",
//   "Data Science",
//   "Graphic Designer",
//   "FullStack Developer",
//   "UX/UI Designer",
//   "Mobile Developer",
//   "Cloud Engineer",
//   "DevOps Engineer",
//   "Product Manager",
//   "Software Engineer",
//   "Machine Learning Engineer",
//   "Game Developer",
//   "Cybersecurity Specialist",
//   "Digital Marketer",
//   "QA Engineer",
//   "Business Analyst",
//   "System Administrator",
//   "Data Engineer",
//   "Blockchain Developer",
// ]

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const companies = [
  '/companies/google.webp',
  '/companies/amazon.png',
  '/companies/atlassian.svg',
  '/companies/meta.svg',
  '/companies/microsoft.webp',
  '/companies/netflix.png',
  '/companies/uber.png',
  '/companies/ibm.png',
  '/companies/coin.png',
  '/companies/solana.png',
  '/companies/polygon.png',
  '/companies/tcs.png',
  '/companies/infosys.png',

];

export function CarouselPlugin() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false })); // Autoplay the carousel
  const [emblaApi, setEmblaApi] = React.useState(null);

  // Initialize the embla API and set it to manage the carousel's behavior
  React.useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        if (emblaApi.selectedScrollSnap() === emblaApi.slideNodes().length - 1) {
          emblaApi.scrollTo(0); // Loop back to the start
        }
      });
      plugin.current.init(emblaApi); // Explicitly initialize the autoplay plugin
    }
  }, [emblaApi]);

  return (
    <Carousel
      className="w-full mx-auto my-20"  // Set the carousel to be full width
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      emblaApiRef={setEmblaApi}  // Pass the embla API reference
    >
      <CarouselContent className="flex items-center justify-start mx-4">
        {companies.map((cat, index) => (
          <CarouselItem
            className="flex-none items-center mx-2" // Reduce the gap between items
            key={index}
            style={{ width: 'calc(100% / 8)' }} // Set width so that only 8 items are visible at once
          >
            <img src={cat} alt={`Company ${index + 1}`} width={200} height={200} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
