import React, { useState } from 'react';
import { sendFeedback } from '../utils/googleFormSubmit';

interface FeedbackViewProps {
  onBack: () => void;
}

const FeedbackView: React.FC<FeedbackViewProps> = ({ onBack }) => {
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SENDING');
    const success = await sendFeedback(form);
    if (success) setStatus('SUCCESS');
    else {
      alert('전송에 실패했습니다. 다시 시도해주세요.');
      setStatus('IDLE');
    }
  };

  if (status === 'SUCCESS') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 text-3xl">
          <i className="fas fa-check"></i>
        </div>
        <h2 className="text-2xl font-bold mb-2">소중한 의견 감사합니다!</h2>
        <p className="text-gray-500 mb-10">
          보내주신 내용은 서비스 개선에 적극 반영하겠습니다.
        </p>
        <button
          onClick={onBack}
          className="w-full py-4 bg-[#ff4500] text-white rounded-2xl font-bold"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="flex items-center mb-8">
        <button onClick={onBack} className="text-2xl mr-4">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-xl font-bold">문의하기 / 피드백</h2>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">
            성함
          </label>
          <input
            required
            className="w-full p-4 bg-[#f8f8f8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4500]/20"
            placeholder="성함을 입력해주세요"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">
            이메일 주소
          </label>
          <input
            required
            type="email"
            className="w-full p-4 bg-[#f8f8f8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4500]/20"
            placeholder="답변받으실 이메일을 입력해주세요"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">
            문의 내용
          </label>
          <textarea
            required
            rows={5}
            className="w-full p-4 bg-[#f8f8f8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4500]/20 resize-none"
            placeholder="기능 제안, 버그 제보 등 자유롭게 작성해주세요"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>
        <button
          disabled={status === 'SENDING'}
          className="w-full py-5 bg-[#ff4500] text-white rounded-2xl font-bold text-lg active:scale-95 transition-transform disabled:opacity-50"
        >
          {status === 'SENDING' ? '전송 중...' : '의견 보내기'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackView;
