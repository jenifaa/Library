import Marquee from "react-fast-marquee";

export default function BookMarquee() {
  const links = [
    "https://i.ibb.co.com/mrHgFjpJ/b2.jpg",
    "https://i.ibb.co.com/xKKvrtcV/b3.jpg",
    "https://i.ibb.co.com/vvvkq2cT/b4.jpg",
    "https://i.ibb.co.com/rRT4DTd8/b5.jpg",
    "https://i.ibb.co.com/9fKvvb0/b6.jpg",
    "https://i.ibb.co.com/xtJw55yL/b7.jpg",
    "https://i.ibb.co.com/N2PCSSwJ/b8.jpg",
    "https://i.ibb.co.com/YTdZYcZ9/b10.jpg",
    "https://i.ibb.co.com/Fqf8PRXq/boo4.jpg",
    "https://i.ibb.co.com/8HMsQvc/book.jpg",
    "https://i.ibb.co.com/mFr38WWr/book1.jpg",
    "https://i.ibb.co.com/FL741Lq7/book2.jpg",
    "https://i.ibb.co.com/xqRkmLF9/book2.webp",
    "https://i.ibb.co.com/GvMFxX6G/book5.jpg",
    "https://i.ibb.co.com/5gd1KFLB/book6.jpg",
    "https://i.ibb.co.com/9kzNScpL/book7.jpg",
    "https://i.ibb.co.com/KcCRVbTj/book8.jpg",
    "https://i.ibb.co.com/r2FfnJXm/book9.jpg"
  ];

  return (
    <div>
      <Marquee>
        {links.map((url, index) => (
          <img key={index} className="w-40 h-40 px-4 py-2" src={url} alt={`book-${index}`} />
        ))}
      </Marquee>
    </div>
  );
}
