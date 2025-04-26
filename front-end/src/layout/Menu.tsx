import { useState } from 'react';
import { ChevronRight, Menu as MenuIcon, X } from 'lucide-react';
import Logo from '../assets/images/logoSwissPadel.png';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
    setIsServiceOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-black text-white flex justify-between items-center px-6 py-4  relative ">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-lg font-medium hover:text-[#646cff] transition mt-4 ml-4"
        >
          <MenuIcon />
          <span>Menu</span>
        </button>

        <div className="absolute left-1/2 transform -translate-x-1/2 ">
          <img src={Logo} alt="Logo" className="h-20 w-auto mt-4" />
        </div>

        <div className="font-medium mt-4">FR</div>
      </header>

      {/* Menu Overlay */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black bg-opacity-80 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Container for both panels */}
        <div className="flex h-full w-full">
          {/* Panel Gauche (menu principal) */}
          <div
            className={`h-full w-[50%] sm:w-[40%] md:w-[30%] bg-white text-black transform transition-transform duration-500 ease-in-out shadow-lg ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex justify-end p-6">
              <button
                onClick={closeMenu}
                className="text-black hover:text-[#646cff] transition"
              >
                <X size={28} />
              </button>
            </div>

            <ul className="px-6 space-y-6 text-lg animate-fadeIn">
              <li className="cursor-pointer hover:text-[#646cff] transition duration-200">Accueil</li>

              <li
                className="cursor-pointer flex justify-between items-center border border-[#646cff] rounded-lg px-4 py-2 hover:bg-[#f0f0f0] transition duration-200"
                onClick={() => setIsServiceOpen(!isServiceOpen)}
              >
                Nos services <ChevronRight size={20} />
              </li>

              <li className="cursor-pointer hover:text-[#646cff] transition duration-200">Nos évènements</li>
              <li className="cursor-pointer hover:text-[#646cff] transition duration-200">Nos sponsors</li>
              <li className="cursor-pointer hover:text-[#646cff] transition duration-200">Notre galerie</li>
              <li className="cursor-pointer hover:text-[#646cff] transition duration-200">Contact</li>
            </ul>
          </div>

          {/* Panel Droite (sous-menu services) */}
          {isServiceOpen && (
            <div
              className="h-full w-[30%] hidden md:flex bg-blue-100 text-black flex-col justify-center items-start p-10 space-y-6 text-lg animate-slideRight shadow-lg rounded-r-2xl"
            >
              <button className="w-full text-left hover:text-white hover:bg-[#646cff] px-4 py-2 rounded transition duration-200">
                Je suis particulier
              </button>
              <button className="w-full text-left hover:text-white hover:bg-[#646cff] px-4 py-2 rounded transition duration-200">
                Je suis professionnel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
