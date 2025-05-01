import React from 'react';
import Header from '../layout/Header';
import {  Image } from 'lucide-react';
import Slider from 'react-slick';
import imagePadel from "../assets/images/padelPingPong.png";
import PadelSolutions from "../assets/images/padelSolutions.jpg"

const Galerie: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="w-full mx-auto overflow-hidden">
        {/* Gallery Hero Section */}
        <section className="text-center mb-30 mt-30">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12">
            L'art du padel en images
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Découvrez nos installations et moments forts
          </p>
        </section>

        {/* Image Slider Section */}
        <section className="mb-16 relative">
          <div className="max-w-5xl mx-auto">
            {/* Slider Navigation */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg">
              <span className="sr-only">Previous</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg">
              <span className="sr-only">Next</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Main Image */}
            <div className="aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
              <img
                src= {imagePadel}
                alt="Dans le filage"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Caption */}
            <div className="text-center mt-10 mb-30">
              <h3 className="text-xl font-semibold">Dans le filage</h3>
              <p className="text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className=" bg-cover bg-center text-white py-24" style={{ backgroundImage: `url(${PadelSolutions})` }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Découvrez nos solutions adaptées à tous vos besoins particuliers ou professionnels, choisissez votre expérience padel.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#c5ff32] text-black px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
                En savoir plus
              </button>
              <button className="border-2 border-withe text-white px-8 py-3 rounded-full font-bold hover:bg-[#c5ff32] hover:text-black transition-colors">
                Nous contacter
              </button>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-3xl font-bold mb-10 text-blue-900">Nos Partenaires</h2>

            <Slider
              autoplay
              autoplaySpeed={2000}
              infinite
              slidesToShow={4}
              slidesToScroll={1}
              arrows={false}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: { slidesToShow: 3 },
                },
                {
                  breakpoint: 768,
                  settings: { slidesToShow: 2 },
                },
                {
                  breakpoint: 480,
                  settings: { slidesToShow: 1 },
                },
              ]}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="px-4">
                  <div className="w-full h-24 border border-gray-200 rounded flex items-center justify-center shadow hover:shadow-md transition">
                    <Image size={32} className="text-blue-500" />
                    <span className="ml-2 text-lg font-bold text-gray-800">Partenaire {i}</span>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Galerie; 