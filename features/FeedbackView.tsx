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
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          소중한 의견 감사합니다!
        </h2>
        <p className="text-gray-500 mb-10">
          보내주신 내용은 서비스 개선에 적극 반영하겠습니다.
        </p>
        <button
          onClick={onBack}
          className="w-full py-5 bg-[#ff4500] text-white rounded-2xl font-bold text-xl active:scale-95 transition-all"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-8 p-6 pb-32">
      {/* 컨피그 헤더 스타일 1:1 적용 */}
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 text-[#ff4500]">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">문의하기 / 피드백</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
            성함
          </label>
          <input
            required
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 outline-none focus:border-[#ff4500] transition-all"
            placeholder="성함을 입력해주세요"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
            이메일 주소
          </label>
          <input
            required
            type="email"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 outline-none focus:border-[#ff4500] transition-all"
            placeholder="답변받으실 이메일을 입력해주세요"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
            문의 내용
          </label>
          <textarea
            required
            rows={5}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 outline-none focus:border-[#ff4500] resize-none transition-all"
            placeholder="기능 제안, 버그 제보 등 자유롭게 작성해주세요"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        {/* 하단 고정 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 max-w-xl p-6 mx-auto py-6 bg-white z-[9999]">
          <button
            type="submit"
            disabled={status === 'SENDING'}
            className="w-full py-5 rounded-2xl bg-[#ff4500] text-white font-bold text-xl active:scale-95 transition-all disabled:opacity-50"
          >
            {status === 'SENDING' ? '전송 중...' : '의견 보내기'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackView;
