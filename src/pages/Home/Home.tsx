import Books from "../books/Books";
import Banner from "./Banner";
import BookMarquee from "./Marquee";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <BookMarquee></BookMarquee>
      <Books></Books>
    </div>
  );
}
