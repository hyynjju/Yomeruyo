import React from 'react';
import { AppView } from '../types';
import Logo from '../assets/logo.svg?react';

interface FooterProps {
  setView: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="w-full px-4 pt-8 pb-28 bg-white/5 flex flex-col items-start gap-5">
      <Logo className="w-5 h-5 text-white/50" />

      <div className="flex flex-col items-start gap-1">
        <p className="w-full text-white/50 text-xs font-normal">
          실전 일본어 학습 서비스
        </p>

        <p className="w-full text-white text-xs font-bold">yomeruyo</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setView('FEEDBACK' as AppView)}
          className="text-white/50 text-xs font-normal underline underline-offset-2 hover:text-white transition-colors"
        >
          문의하기/피드백
        </button>

        <div className="w-px h-2.5 bg-white/10" />

        <a
          href="mailto:contact@yakk.kr"
          className="text-white/50 text-xs font-normal hover:text-white transition-colors"
        >
          Email
        </a>

        <div className="w-px h-2.5 bg-white/10" />

        <a
          href="https://github.com/hyynjju"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 text-xs font-normal hover:text-white transition-colors"
        >
          GitHub
        </a>
      </div>

      <p className="w-full text-white/50 text-xs font-normal">
        © 2026 yomeruyo Project. All right reserved.
      </p>
    </footer>
  );
};

export default Footer;
