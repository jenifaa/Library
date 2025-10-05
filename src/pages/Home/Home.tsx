import Books from "../books/Books";
import Banner from "./Banner";
import BookMarquee from "./Marquee";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <BookMarquee></BookMarquee>
      <Books></Books>
      <WhyChooseUs></WhyChooseUs>
      <Testimonials></Testimonials>
      
    </div>
  );
}
