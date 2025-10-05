import { Link } from "react-router";
import { BookOpen, Users, Clock, Star,  ArrowRight } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Extensive Collection",
      description: "From timeless classics to contemporary bestsellers"
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Vibrant Community",
      description: "Connect with fellow book lovers and share insights"
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      title: "Always Available",
      description: "Access your books anytime, anywhere"
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      title: "Expert Curation",
      description: "Handpicked selections for every taste"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden w-11/12 mx-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <span className="text-blue-600 font-semibold text-lg">WHY CHOOSE US</span>
              <h2 className="text-5xl font-bold text-gray-900 mt-4 mb-6">
                More Than Just a <span className="text-blue-600">Library</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We're building a community where readers can discover, share, and grow together. 
                Our platform combines the charm of traditional libraries with modern convenience.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/books"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Reading Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative z-10">
              <div className="bg-gray-900 rounded-2xl p-8 text-white shadow-2xl">
                <div className="text-center">
                  <BookOpen className="h-20 w-20 mx-auto mb-6 opacity-90" />
                  <h3 className="text-2xl font-bold mb-4">Digital & Physical</h3>
                  <p className="text-blue-100 text-lg">
                    Enjoy the best of both worlds with our hybrid library system
                  </p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-xl shadow-lg">
                <div className="text-sm font-bold">📈 Growing Daily</div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-green-400 text-green-900 px-6 py-3 rounded-xl shadow-lg">
                <div className="text-sm font-bold">⭐ 4.9/5 Rating</div>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
          </div>

        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "50K+", label: "Books Available", color: "text-blue-600" },
            { number: "15K+", label: "Active Members", color: "text-green-600" },
            { number: "99%", label: "Satisfaction Rate", color: "text-purple-600" },
            { number: "24/7", label: "Support", color: "text-orange-600" }
          ].map((stat, index) => (
            <div key={index} className="space-y-3">
              <div className={`text-4xl font-bold ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}