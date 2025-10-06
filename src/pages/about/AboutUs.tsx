import { motion } from "framer-motion";
import { useState } from "react";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("history");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
     
      <section className="relative bg-gray-800 text-white py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            About Our Library
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed"
          >
            Preserving Knowledge, Inspiring Minds, and Building Community Since 1985
          </motion.p>
        </div>
      </section>

  
      <section className="py-10 bg-white">
        <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12"
          >
            <motion.div variants={itemVariants} className="bg-blue-50 p-5 rounded-2xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-md text-gray-700 leading-relaxed">
                To provide free and equitable access to information, ideas, and knowledge through 
                books, media, and digital resources. We strive to foster lifelong learning, 
                promote literacy, and serve as a community hub for intellectual growth and 
                cultural enrichment.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-purple-50 p-5 rounded-2xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔭</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-md text-gray-700 leading-relaxed">
                To be the leading center for knowledge and innovation in our community, 
                where every individual has the opportunity to learn, create, and connect. 
                We envision a future where access to information transforms lives and 
                strengthens our community bonds.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

     
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">By The Numbers</h2>
            <p className="text-xl text-gray-300">Our impact in the community</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "250,000+", label: "Books in Collection" },
              { number: "15,000+", label: "Active Members" },
              { number: "50+", label: "Daily Programs" },
              { number: "38", label: "Years of Service" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Story & Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the rich history and comprehensive services that make our library 
              a cornerstone of the community
            </p>
          </motion.div>

         
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { id: "history", label: "Our History" },
                { id: "collections", label: "Collections" },
                { id: "services", label: "Services" },
                { id: "technology", label: "Technology" },
                { id: "community", label: "Community" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

         
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              {activeTab === "history" && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Rich History</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Founded in 1985 by a group of visionary educators and community leaders, 
                        our library began as a small reading room in the town hall. Through decades 
                        of dedicated service and community support, we have grown into one of the 
                        region's most comprehensive knowledge centers.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        In 2005, we completed a major expansion project, adding state-of-the-art 
                        technology centers, children's learning zones, and community meeting spaces. 
                        Today, we continue to evolve while staying true to our founding principles 
                        of accessibility, education, and community service.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h4 className="font-bold text-lg mb-2">1985</h4>
                        <p>Library founded with 5,000 books</p>
                      </div>
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h4 className="font-bold text-lg mb-2">1998</h4>
                        <p>First computer lab installed</p>
                      </div>
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h4 className="font-bold text-lg mb-2">2005</h4>
                        <p>Major expansion completed</p>
                      </div>
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h4 className="font-bold text-lg mb-2">2020</h4>
                        <p>Digital library platform launched</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "collections" && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Extensive Collections</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Fiction & Literature",
                        count: "85,000+ volumes",
                        description: "From classic literature to contemporary bestsellers"
                      },
                      {
                        title: "Academic Resources",
                        count: "45,000+ texts",
                        description: "Comprehensive academic and research materials"
                      },
                      {
                        title: "Children's Section",
                        count: "35,000+ books",
                        description: "Engaging materials for young readers"
                      },
                      {
                        title: "Digital Resources",
                        count: "50,000+ e-books",
                        description: "Online databases and digital collections"
                      },
                      {
                        title: "Special Collections",
                        count: "5,000+ items",
                        description: "Rare books and historical documents"
                      },
                      {
                        title: "Multimedia",
                        count: "15,000+ items",
                        description: "Audiobooks, DVDs, and educational media"
                      }
                    ].map((collection, index) => (
                      <motion.div
                        key={collection.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500"
                      >
                        <h4 className="font-bold text-lg mb-2">{collection.title}</h4>
                        <div className="text-blue-600 font-semibold mb-2">{collection.count}</div>
                        <p className="text-gray-600">{collection.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "services" && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Services</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-bold mb-4">Core Services</h4>
                      <ul className="space-y-3">
                        {[
                          "Free public computer and internet access",
                          "Research assistance and reference services",
                          "Inter-library loan programs",
                          "Book clubs and reading programs",
                          "Children's story times and literacy programs",
                          "Teen gaming and learning zones",
                          "Adult education and literacy classes",
                          "Meeting room reservations"
                        ].map((service, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-4">Specialized Programs</h4>
                      <ul className="space-y-3">
                        {[
                          "Digital literacy workshops for seniors",
                          "Career development and job search assistance",
                          "Local history and genealogy research",
                          "Author talks and book signings",
                          "STEM programs for youth",
                          "Language learning resources",
                          "Accessibility services for disabled patrons",
                          "Home delivery for seniors"
                        ].map((program, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-purple-500 mr-2">★</span>
                            <span>{program}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "technology" && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Technology & Innovation</h3>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        We embrace technology to enhance access to information and create 
                        innovative learning experiences. Our library features cutting-edge 
                        resources to serve the digital needs of our community.
                      </p>
                      <div className="space-y-4">
                        {[
                          "High-speed public Wi-Fi throughout the building",
                          "3D printing and maker space equipment",
                          "Digital media labs with professional software",
                          "Virtual reality learning stations",
                          "Online database subscriptions",
                          "Mobile app for easy access to resources",
                          "Self-checkout kiosks",
                          "Digital literacy training programs"
                        ].map((tech, index) => (
                          <div key={index} className="flex items-center bg-white p-4 rounded-lg">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-600 font-bold">{index + 1}</span>
                            </div>
                            <span>{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-blue-900 text-white p-8 rounded-2xl">
                      <h4 className="text-2xl font-bold mb-4">Digital Library</h4>
                      <p className="mb-6">
                        Access our entire collection digitally from anywhere. Our online platform 
                        offers e-books, audiobooks, research databases, and streaming media.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold">24/7</div>
                          <div className="text-sm">Access</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold">50K+</div>
                          <div className="text-sm">E-books</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold">100+</div>
                          <div className="text-sm">Databases</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold">10K+</div>
                          <div className="text-sm">Audio Books</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "community" && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Community Engagement</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-bold mb-4">Partnerships & Outreach</h4>
                      <p className="text-gray-700 mb-4">
                        We collaborate with local schools, businesses, and organizations to 
                        extend our reach and impact throughout the community.
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Partnership with 15 local schools for literacy programs",
                          "Collaboration with senior centers for outreach services",
                          "Business resource center for entrepreneurs",
                          "Summer reading programs serving 2,000+ children",
                          "Community garden and outdoor learning space",
                          "Cultural events celebrating diversity",
                          "Volunteer programs with 200+ active volunteers"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-blue-600 text-white p-8 rounded-2xl">
                      <h4 className="text-2xl font-bold mb-4">Get Involved</h4>
                      <p className="mb-6">
                        Join our community of readers, learners, and volunteers. Together, 
                        we can build a stronger, more informed community.
                      </p>
                      <div className="space-y-3">
                        <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                          Become a Member
                        </button>
                        <button className="w-full bg-transparent border-2 border-white text-white py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                          Volunteer With Us
                        </button>
                        <button className="w-full bg-transparent border-2 border-white text-white py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                          Make a Donation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to serving our community with expertise and passion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Library Director",
                bio: "20+ years in library sciences, PhD in Information Management"
              },
              {
                name: "Michael Rodriguez",
                role: "Head of Collections",
                bio: "Specializes in digital resource management and acquisition"
              },
              {
                name: "Emily Watson",
                role: "Community Outreach",
                bio: "Coordinates programs and partnerships with local organizations"
              },
              {
                name: "James Thompson",
                role: "Technology Director",
                bio: "Leads digital innovation and IT infrastructure development"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-blue-600 font-semibold mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Visit Us Today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience everything our library has to offer. Become a member and start your 
              journey of discovery and learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
                Get Your Library Card
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                Schedule a Tour
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}