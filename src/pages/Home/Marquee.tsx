import Marquee from "react-fast-marquee";

export default function BookMarquee() {
  return (
    <div>
      <Marquee>
        <img className="w-40 h-40 px-4 py-2" src="/src/assets/images/b10.jpg" alt="" />
        <img className="w-40 h-40 px-4 py-2" src="/src/assets/images/b5.jpg" alt="" />
        <img className="w-40 h-40 px-4 py-2" src="/src/assets/images/b3.jpeg" alt="" />
        <img className="w-40 h-40 px-4 py-2" src="/src/assets/images/b4.jpg" alt="" />
        <img className="w-40 h-40 px-4 py-2" src="/src/assets/images/b8.jpg" alt="" />
        <img className="w-40 h-40 px-4 py-2" src="/src/assets/images/b7.jpg" alt="" />
        <img className="w-40 h-40 px-4 py-2" src="/src/assets/images/book7.jpg" alt="" />
        <img className="w-40 h-40 px-4 py-2" src="/src/assets/images/b6.jpg" alt="book3" />
        <img className="w-40 h-40 px-4 py-2" src="/src/assets/images/book2.jpg" alt="book2" />
        <img className="w-40 h-40 px-4 py-2" src="/src/assets/images/b8.jpg" alt="book2" />
      </Marquee>
    </div>
  );
}
