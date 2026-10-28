import React from 'react';
import { AppView } from '../types';
import Logo from '../assets/logo.svg?react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  setView: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  const { t } = useLanguage();

  return (
    <footer className="relative left-1/2 w-screen -translate-x-1/2 bg-white/[0.02]">
      <div className="w-full max-w-[873px] mx-auto px-4 md:px-6 pt-8 pb-28 flex flex-col items-start gap-5">
      <Logo className="w-5 h-5 text-white/50" />

      <div className="flex flex-col items-start gap-1">
        <p className="w-full text-white/50 text-xs font-normal">
          {t.footer.description}
        </p>

        <p className="w-full text-white text-xs font-bold">yomeruyo</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setView('FEEDBACK' as AppView)}
          className="text-white/50 text-xs font-normal underline underline-offset-2 hover:text-white transition-colors"
        >
          {t.footer.feedback}
        </button>

        <div className="w-px h-2.5 bg-white/10" />

        <a
          href="mailto:contact@yakk.kr"
          className="text-white/50 text-xs font-normal hover:text-white transition-colors"
        >
          Email
        </a>


      </div>

      <p className="w-full text-white/50 text-xs font-normal">
        © 2026 yomeruyo Project. All right reserved.
      </p>
      </div>
    </footer>
  );
};

export default Footer;
