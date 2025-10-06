import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Alex Morgan",
      role: "Avid Reader",
      image: "📚",
      rating: 5,
      text: "The digital library access has been a game-changer for my daily commute. So convenient!",
      featured: true
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "Book Blogger",
      image: "✍️",
      rating: 5,
      text: "As a book reviewer, I appreciate the diverse collection and excellent book conditions.",
      featured: false
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Parent",
      image: "👨‍👧‍👦",
      rating: 5,
      text: "My kids love the children's section. The summer reading program is fantastic!",
      featured: false
    },
    {
      id: 4,
      name: "Lisa Zhang",
      role: "Researcher",
      image: "🔍",
      rating: 5,
      text: "The academic resources and research materials are comprehensive and well-organized.",
      featured: false
    }
  ];

  return (
    <div className="py-20 bg-gray-50 ">
      <div className="w-11/12 mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Loved by <span className="text-blue-600">Readers</span>
          </h2>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto">
            Discover why thousands of readers choose our library for their literary journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
         
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-blue-100 h-full">
              <Quote className="h-12 w-12 text-blue-200 mb-6" />
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-800 font-light leading-relaxed mb-6">
                "This library has completely transformed how I discover and enjoy books. The personalized recommendations are incredibly accurate, and the borrowing process is seamless."
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="text-4xl">🌟</div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Alex Morgan</div>
                  <div className="text-gray-600">Avid Reader</div>
                </div>
              </div>
            </div>
          </div>

         
          <div className="space-y-4">
            {testimonials.slice(1).map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl flex-shrink-0">{testimonial.image}</div>
                  <div>
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

     
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-8">Trusted by readers from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-xl font-semibold text-gray-500">Universities</div>
            <div className="text-xl font-semibold text-gray-500">Schools</div>
            <div className="text-xl font-semibold text-gray-500">Book Clubs</div>
            <div className="text-xl font-semibold text-gray-500">Researchers</div>
            <div className="text-xl font-semibold text-gray-500">Families</div>
          </div>
        </div>
      </div>
    </div>
  );
}