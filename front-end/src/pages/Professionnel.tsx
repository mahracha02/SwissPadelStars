import React from 'react';
import Header from '../layout/Header';
import { Box, Star, Calendar, Handshake, CheckCircle, ChevronLeft, ChevronRight, Image } from 'lucide-react';
import Slider from "react-slick";
import Professionnel1 from '../assets/images/professionnel1.png';
import Professionnel2 from '../assets/images/professionnel2.png';
import Professionnel3 from '../assets/images/professionnel3.png';
import Logo from '../assets/images/logo2.png';
import contactImg1 from '../assets/images/contactImage1.png';
import avatar1 from '../assets/images/avatar1.png';
import avatar2 from '../assets/images/avatar2.png';
import avatar3 from '../assets/images/avatar3.png';

const feedbacks = [
  {
    name: 'Benoit .L',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: avatar1,
  },
  {
    name: 'Elisa .C',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: avatar2,
  },
  {
    name: 'Camille .L',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: avatar3,
  },
];

const Professionnel: React.FC = () => {
  const [start, setStart] = React.useState(0);
  const visible = 3;

  const prev = () => setStart((s) => (s - 1 + feedbacks.length) % feedbacks.length);
  const next = () => setStart((s) => (s + 1) % feedbacks.length);

  // For infinite loop, show 3 feedbacks in a row, wrapping around
  const getFeedbacks = () => {
    const arr = [];
    for (let i = 0; i < visible; i++) {
      arr.push(feedbacks[(start + i) % feedbacks.length]);
    }
    return arr;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="w-full mx-auto overflow-hidden">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
                Parce que votre succès mérite de briller 
                dans l'univers du padel
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-700">
                Votre partenaire pour des projets padel clés en main.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24">
              {/* Image */}
              <div className="w-full md:w-1/2">
                <img 
                  src={Professionnel1} 
                  alt="Entreprises et banques" 
                  className="w-full h-auto rounded-2xl shadow-lg" 
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
                  Entreprises et banques
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed">
                  Offrez un espace unique pour vos collaborateurs ou 
                  clients, alliant innovation et bien-être.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 lg:gap-24">
              {/* Text */}
              <div className="w-full md:w-1/2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
                  Hôtels et centres de loisirs
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed">
                  Enrichissez vos offres avec des terrains de padel 
                  modernes et attractifs.
                </p>
              </div>

              {/* Image */}
              <div className="w-full md:w-1/2">
                <img 
                  src={Professionnel2} 
                  alt="Hôtels et centres de loisirs" 
                  className="w-full h-auto rounded-2xl shadow-lg" 
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24">
              {/* Image */}
              <div className="w-full md:w-1/2">
                <img 
                  src={Professionnel3} 
                  alt="Collectivités et clubs sportifs" 
                  className="w-full h-auto rounded-2xl shadow-lg" 
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
                  Collectivités et clubs sportifs
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed">
                  Modernisez vos infrastructures et favorisez l'accès au 
                  padel pour tous.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Timeline Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
              Services mis à votre disposition
            </h2>

            <div className="max-w-4xl mx-auto">
              {/* Timeline items */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[26px] top-0 bottom-0 w-[4px] bg-[#c5ff32]"></div>

                {/* Service 1 */}
                <div className="relative flex items-start mb-12 md:mb-16">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#c5ff32] flex items-center justify-center z-10">
                    <span className="text-xl sm:text-2xl font-bold text-black">1</span>
                  </div>
                  <div className="ml-4 sm:ml-8 flex-grow">
                    <div className="flex items-center gap-3 sm:gap-4 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                        <Box className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold">CONCEPTION ET INSTALLATION</h3>
                    </div>
                    <p className="text-base sm:text-lg text-gray-600 ml-4 sm:ml-16">
                      Des terrains sur mesure répondant aux normes internationales.
                    </p>
                  </div>
                </div>

                {/* Service 2 */}
                <div className="relative flex items-start mb-12 md:mb-16">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#c5ff32] flex items-center justify-center z-10">
                    <span className="text-xl sm:text-2xl font-bold text-black">2</span>
                  </div>
                  <div className="ml-4 sm:ml-8 flex-grow">
                    <div className="flex items-center gap-3 sm:gap-4 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                        <Star className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold">SPONSORING ET BRANDING</h3>
                    </div>
                    <p className="text-base sm:text-lg text-gray-600 ml-4 sm:ml-16">
                      Intégrez le padel dans votre stratégie marketing.
                    </p>
                  </div>
                </div>

                {/* Service 3 */}
                <div className="relative flex items-start mb-12 md:mb-16">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#c5ff32] flex items-center justify-center z-10">
                    <span className="text-xl sm:text-2xl font-bold text-black">3</span>
                  </div>
                  <div className="ml-4 sm:ml-8 flex-grow">
                    <div className="flex items-center gap-3 sm:gap-4 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                        <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold">ORGANISATION D'ÉVÉNEMENTS</h3>
                    </div>
                    <p className="text-base sm:text-lg text-gray-600 ml-4 sm:ml-16">
                      Tournois et initiatives exclusives pour dynamiser votre image.
                    </p>
                  </div>
                </div>

                {/* Service 4 */}
                <div className="relative flex items-start mb-12 md:mb-16">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#c5ff32] flex items-center justify-center z-10">
                    <span className="text-xl sm:text-2xl font-bold text-black">4</span>
                  </div>
                  <div className="ml-4 sm:ml-8 flex-grow">
                    <div className="flex items-center gap-3 sm:gap-4 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                        <Handshake className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold">ACCOMPAGNEMENT COMPLET</h3>
                    </div>
                    <p className="text-base sm:text-lg text-gray-600 ml-4 sm:ml-16">
                      Audit, conseils et suivi à chaque étape de votre projet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
              {/* Left side - Text content */}
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
                  Pourquoi choisir Swiss Padel Stars ?
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-[#c5ff32] flex-shrink-0 mt-1" />
                    <span className="text-lg sm:text-xl text-gray-700">
                      Une expertise reconnue en Suisse
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-[#c5ff32] flex-shrink-0 mt-1" />
                    <span className="text-lg sm:text-xl text-gray-700">
                      Des solutions clé-en-main adaptées à vos besoins
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-[#c5ff32] flex-shrink-0 mt-1" />
                    <span className="text-lg sm:text-xl text-gray-700">
                      Un réseau solide pour maximiser l'impact de vos projets
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right side - Image */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="h-[300px] sm:h-[400px] flex items-center justify-center">
                  <img 
                    src={Logo} 
                    alt="Swiss Padel Stars" 
                    className="w-120 h-120 object-contain rounded-full bg-[#c5ff32] mt-4 border-2 border-black shadow-lg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Slider */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-center mb-6">
              Retours clients
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-center mb-12 text-neutral-600">
              Votre satisfaction, notre priorité.
            </p>
            <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto">
              {/* Left arrow */}
              <button
                onClick={prev}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black text-white hover:bg-neutral-800 transition"
                aria-label="Précédent"
              >
                <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
              </button>
              {/* Feedback cards */}
              <div className="flex gap-4 sm:gap-8 w-full justify-center">
                {getFeedbacks().map((fb, idx) => (
                  <div
                    key={idx}
                    className="relative bg-white border border-neutral-400 rounded-2xl px-4 sm:px-8 pt-12 sm:pt-16 pb-4 sm:pb-8 w-[280px] sm:w-[340px] flex-shrink-0 flex flex-col items-center"
                  >
                    {/* Avatar */}
                    <div className="absolute -top-8 sm:-top-12 left-1/2 -translate-x-1/2">
                      <img
                        src={fb.img}
                        alt={fb.name}
                        className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-black shadow-lg object-cover"
                      />
                    </div>
                    <div className="mt-4 text-xl sm:text-2xl font-bold text-neutral-900">{fb.name}</div>
                    <div className="mt-2 text-sm sm:text-base text-neutral-800 text-center">{fb.text}</div>
                  </div>
                ))}
              </div>
              {/* Right arrow */}
              <button
                onClick={next}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black text-white hover:bg-neutral-800 transition"
                aria-label="Suivant"
              >
                <ChevronRight size={24} className="sm:w-8 sm:h-8" />
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5ff32] to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5ff32] to-transparent opacity-50"></div>
          
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #c5ff32 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
              {/* Left content */}
              <div className="w-full md:w-1/2 text-white">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-[#c5ff32]"></div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight">
                    Intégrez le padel à vos projets<br />
                    <span className="text-[#c5ff32]">dès maintenant.</span>
                  </h2>
                </div>
                
                <button className="group relative inline-flex items-center justify-center px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold text-black transition-all duration-300 ease-in-out">
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-in-out transform translate-x-1 translate-y-1 bg-[#c5ff32] group-hover:translate-x-0 group-hover:translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full border-2 border-[#c5ff32]"></span>
                  <span className="relative">CONTACTER</span>
                </button>
              </div>
              
              {/* Right image */}
              <div className="w-full md:w-1/2">
                <div className="relative">
                  {/* Image glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#c5ff32] to-green-400 opacity-30 blur-xl"></div>
                  
                  <div className="relative">
                    <img
                      src={contactImg1}
                      alt="Table de padel"
                      className="w-full h-auto rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
                    />
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#c5ff32]"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#c5ff32]"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#c5ff32]"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#c5ff32]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Partners Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-blue-900">Nos Partenaires</h2>

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
                <div key={i} className="px-2 sm:px-4">
                  <div className="w-full h-20 sm:h-24 border border-gray-200 rounded flex items-center justify-center shadow hover:shadow-md transition">
                    <Image size={24} className="sm:w-8 sm:h-8 text-blue-500" />
                    <span className="ml-2 text-base sm:text-lg font-bold text-gray-800">Partenaire {i}</span>
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

export default Professionnel; 