import React from 'react';
import { AppView } from '../types';
import Logo from '../assets/logo.svg?react';

interface FooterProps {
  setView: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="w-full px-8 pt-10 pb-16 flex flex-col items-start">
      <Logo className="h-6 w-auto mb-3 text-black/30" />

      <p className="text-[11px] text-black/30 leading-relaxed">
        실전 일본어 학습 서비스
        <br />
        <b>yomeruyo</b>
      </p>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => setView('FEEDBACK' as AppView)}
          className="text-[11px] text-black/40 underline underline-offset-2 hover:text-[#ff4500] transition-colors"
        >
          문의하기 / 피드백
        </button>
        <div className="w-[1px] h-2 bg-black/10" />
        <a
          href="mailto:contact@yakk.kr"
          className="text-[11px] text-black/40 hover:text-[#ff4500] transition-colors"
        >
          Email
        </a>

        <div className="w-[1px] h-2 bg-black/10" />

        <a
          href="https://github.com/hyynjju"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-black/40 hover:text-[#ff4500] transition-colors"
        >
          GitHub
        </a>
      </div>

      <p className="text-[10px] text-black/20 mt-6 font-medium">
        © 2026 yomeruyo Project. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
