import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import Logo from '../assets/images/logoSwissPadel.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={Logo} alt="Swiss Padel Stars Logo" className="h-16 w-20" />
              <h2 className="text-xl font-bold">SWISS PADEL STARS</h2>
            </div>
            <p className="mb-4 font-bold text-left">
              Votre partenaire de référence,  <br/> pour vos projets liés au monde du padel.
            </p>
            <p className="text-sm mt-25">Copyright © 2025 SwissPadelStars. Tous droits réservés.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">Services</h3>
            <ul>
              <li className="mb-2">Lorem ipsum</li>
              <li className="mb-2">Lorem ipsum</li>
              <li className="mb-2">Lorem ipsum</li>
              <li className="mb-2">Lorem ipsum</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">Légal</h3>
            <ul>
              <li className="mb-2">Lorem ipsum</li>
              <li className="mb-2">Lorem ipsum</li>
              <li className="mb-2">Lorem ipsum</li>
              <li className="mb-2">Lorem ipsum</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">Contact</h3>
            <ul>
              <li className="mb-2">Lorem ipsum</li>
              <li className="mb-2">Lorem ipsum</li>
              <li className="mb-2">Lorem ipsum</li>
              <li className="mb-2">Lorem ipsum</li>
            </ul>
            <div className="flex mt-12 gap-2 p-2 ml-30">
              <a href="#" className="bg-white p-3 rounded-full text-gray-900">
                <Instagram size={24} />
              </a>
              <a href="#" className="bg-white p-3 rounded-full text-gray-900">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
