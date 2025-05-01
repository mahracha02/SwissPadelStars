import React, { useState, useEffect } from 'react';
import Header from '../layout/Header';
import { ChevronLeft, ChevronRight, Image } from 'lucide-react';
import Slider from 'react-slick';
import PadelCover from "../assets/images/padelCover.jpg"

const Evenements: React.FC = () => {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 16,
    minutes: 45,
    seconds: 7
  });

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Event cards data
  const events = [
    {
      id: 1,
      title: 'Événement 1',
      description: 'Description',
      image: '/placeholder.jpg'
    },
    {
      id: 2,
      title: 'Événement 2',
      description: 'Description',
      image: '/placeholder.jpg'
    },
    {
      id: 3,
      title: 'Événement 3',
      description: 'Description',
      image: '/placeholder.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 text-center mb-30">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Le padel, c'est aussi une expérience à partager
        </h1>
        <p className="text-xl text-gray-600">
          Vivez l'univers du padel à travers nos événements.
        </p>
      </section>

      {/* Next Event Section */}
      <section className="bg-neutral-900 text-white py-16 mb-30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">Prochain événement</h2>
              <p className="text-xl text-gray-300">École Lausanne Savio</p>
            </div>
            <div className="flex gap-4 mt-6 md:mt-0">
              <div className="text-center">
                <div className="text-4xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-400">JOURS</div>
              </div>
              <div className="text-4xl font-bold">:</div>
              <div className="text-center">
                <div className="text-4xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-400">HEURES</div>
              </div>
              <div className="text-4xl font-bold">:</div>
              <div className="text-center">
                <div className="text-4xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-400">MINUTES</div>
              </div>
              <div className="text-4xl font-bold">:</div>
              <div className="text-center">
                <div className="text-4xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-400">SECONDES</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-8">SwissPadelStars</h2>
          <p className="text-lg text-gray-800 leading-relaxed">
            Spécialisé dans le sponsoring, l'accompagnement d'événements et la création d'infrastructures, 
            l'entreprise soutient l'installation de terrains de padel dans des lieux stratégiques, 
            et offre des solutions innovantes pour les marques souhaitant s'implanter dans cet univers 
            en pleine expansion.
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Les événements à venir</h2>
          <div className="relative px-12">
            <Slider
              infinite
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              arrows={true}
              prevArrow={
                <button 
                  className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 w-12 h-12 rounded-full bg-[#c5ff32] hover:bg-[#b3e32d] flex items-center justify-center z-10 transition-all duration-300 group"
                  style={{ boxShadow: '0 4px 12px rgba(197, 255, 50, 0.3)' }}
                >
                  <ChevronLeft className="w-8 h-8 text-black group-hover:scale-110 transition-transform duration-300" />
                </button>
              }
              nextArrow={
                <button 
                  className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 w-12 h-12 rounded-full bg-[#c5ff32] hover:bg-[#b3e32d] flex items-center justify-center z-10 transition-all duration-300 group"
                  style={{ boxShadow: '0 4px 12px rgba(197, 255, 50, 0.3)' }}
                >
                  <ChevronRight className="w-8 h-8 text-black group-hover:scale-110 transition-transform duration-300" />
                </button>
              }
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                  }
                }
              ]}
              className="relative"
            >
              {events.map((event) => (
                <div key={event.id} className="px-3">
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <Image className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cover bg-center text-white relative" style={{ backgroundImage: `url(${PadelCover})` }} >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Vivez des événements sportifs inoubliables avec<br />
            Swiss Padel Stars
          </h2>
          <button className="bg-[#c5ff32] text-black px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
            ORGANISER UN ÉVÉNEMENT
          </button>
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
  );
};

export default Evenements; 