import React, { useState } from 'react';
import { sendFeedback } from '../utils/googleFormSubmit';
import { useLanguage } from '../contexts/LanguageContext';

interface FeedbackViewProps {
  onBack: () => void;
}

const FeedbackView: React.FC<FeedbackViewProps> = ({ onBack }) => {
  const { t } = useLanguage();

  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE');

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('SENDING');

    const success = await sendFeedback(form);

    if (success) {
      setStatus('SUCCESS');
    } else {
      alert(t.feedback.sendFailed);
      setStatus('IDLE');
    }
  };

  /* ================================
     전송 완료
  ================================= */
  if (status === 'SUCCESS') {
    return (
      <div className="fixed inset-0 bg-stone-900 overflow-hidden">
        <div className="relative w-full max-w-xl h-full mx-auto bg-gradient-to-b from-pink-950 to-stone-900 overflow-hidden">
          <main className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
            <div className="w-20 h-20 mb-6 rounded-full bg-rose-300/20 flex items-center justify-center">
              <i className="fas fa-check text-3xl text-rose-300" />
            </div>

            <h2 className="text-white text-2xl font-bold leading-8">
              {t.feedback.successTitle}
            </h2>

            <p className="mt-2 text-white/50 text-sm font-normal leading-5 break-keep">
              {t.feedback.successDescription}
            </p>

            <button
              type="button"
              onClick={onBack}
              className="
                absolute
                left-5
                right-5
                bottom-8
                h-14
                rounded-full
                bg-gradient-to-b
                from-white
                to-white/70
                outline
                outline-[3px]
                outline-offset-[-3px]
                outline-white/40
                flex
                items-center
                justify-center
                text-rose-900
                text-lg
                font-bold
                leading-6
                active:scale-95
                transition-transform
              "
            >
              {t.feedback.goHome}
            </button>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-stone-900 overflow-hidden">
      <div className="relative w-full max-w-xl h-full mx-auto bg-gradient-to-b from-pink-950 to-stone-900 overflow-hidden">
        {/* Header */}
        <header className="absolute left-0 top-0 z-50 w-full h-16 px-2 pt-4 pb-2 border-b border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="
              w-10
              h-10
              p-2.5
              flex
              items-center
              justify-center
              text-white
              active:scale-90
              transition-transform
            "
          >
            <i className="fas fa-chevron-left text-xl" />
          </button>

          <div className="text-center text-white text-base font-semibold leading-6">
            {t.feedback.title}
          </div>

          <div className="w-10 h-10" />
        </header>

        {/* Scroll Area */}
        <main className="absolute left-0 right-0 top-0 bottom-0 overflow-y-auto overflow-x-hidden overscroll-contain">
          <div className="w-full px-4 pt-24 pb-40">
            <form onSubmit={handleSubmit}>
              <div className="w-full flex flex-col gap-8">
                {/* 안내 */}
                <div>
                  <h2 className="text-white text-xl font-bold leading-8">
                    {t.feedback.heading}
                  </h2>

                  <p className="mt-0.5 text-white/50 text-xs font-normal leading-4 break-keep">
                    {t.feedback.description}
                  </p>
                </div>

                {/* 성함 */}
                <div className="w-full">
                  <label
                    htmlFor="feedback-name"
                    className="block mb-2 text-white text-base font-medium leading-6"
                  >
                    {t.feedback.name}
                  </label>

                  <input
                    id="feedback-name"
                    required
                    type="text"
                    placeholder={t.feedback.namePlaceholder}
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="
                      appearance-none
                      w-full
                      h-16
                      px-5
                      rounded-[20px]
                      border-0
                      outline
                      outline-[1.5px]
                      outline-offset-[-1.5px]
                      outline-white/5
                      bg-gradient-to-b
                      from-white/10
                      to-white/5
                      bg-transparent
                      text-white
                      text-base
                      font-medium
                      leading-6
                      placeholder:text-white/30
                      focus:outline-white/20
                    "
                  />
                </div>

                {/* 이메일 */}
                <div className="w-full">
                  <label
                    htmlFor="feedback-email"
                    className="block mb-2 text-white text-base font-medium leading-6"
                  >
                    {t.feedback.email}
                  </label>

                  <input
                    id="feedback-email"
                    required
                    type="email"
                    placeholder={t.feedback.emailPlaceholder}
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="
                      appearance-none
                      w-full
                      h-16
                      px-5
                      rounded-[20px]
                      border-0
                      outline
                      outline-[1.5px]
                      outline-offset-[-1.5px]
                      outline-white/5
                      bg-gradient-to-b
                      from-white/10
                      to-white/5
                      bg-transparent
                      text-white
                      text-base
                      font-medium
                      leading-6
                      placeholder:text-white/30
                      focus:outline-white/20
                    "
                  />
                </div>

                {/* 문의 내용 */}
                <div className="w-full">
                  <label
                    htmlFor="feedback-message"
                    className="block mb-2 text-white text-base font-medium leading-6"
                  >
                    {t.feedback.message}
                  </label>

                  <textarea
                    id="feedback-message"
                    required
                    rows={6}
                    placeholder={t.feedback.messagePlaceholder}
                    value={form.message}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                    className="
                      appearance-none
                      w-full
                      min-h-40
                      px-5
                      py-5
                      rounded-[20px]
                      border-0
                      outline
                      outline-[1.5px]
                      outline-offset-[-1.5px]
                      outline-white/5
                      bg-gradient-to-b
                      from-white/10
                      to-white/5
                      bg-transparent
                      text-white
                      text-base
                      font-medium
                      leading-6
                      placeholder:text-white/30
                      resize-none
                      focus:outline-white/20
                    "
                  />
                </div>
              </div>
            </form>
          </div>
        </main>

        {/* Bottom Navigation */}
        <div className="absolute left-0 right-0 bottom-0 z-50 pointer-events-none">
          <div className="h-12 bg-gradient-to-b from-stone-900/0 to-stone-900" />

          <div className="w-full px-5 pt-2 pb-8 bg-stone-900 pointer-events-auto">
            <button
              type="button"
              disabled={status === 'SENDING'}
              onClick={() => {
                const formElement = document.querySelector(
                  'form',
                ) as HTMLFormElement | null;

                formElement?.requestSubmit();
              }}
              className="
                w-full
                h-14
                rounded-full
                bg-gradient-to-b
                from-white
                to-white/70
                outline
                outline-[3px]
                outline-offset-[-3px]
                outline-white/40
                flex
                items-center
                justify-center
                text-rose-900
                text-lg
                font-bold
                leading-6
                active:scale-95
                transition-transform
                disabled:opacity-50
                disabled:active:scale-100
              "
            >
              {status === 'SENDING' ? t.feedback.sending : t.feedback.submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackView;
