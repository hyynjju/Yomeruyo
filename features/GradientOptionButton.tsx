import React from 'react';

interface GradientOptionButtonProps {
  label: string;
  gradient: string;
  selected: boolean;
  onClick: () => void;
}

const GradientOptionButton: React.FC<GradientOptionButtonProps> = ({
  label,
  gradient,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        min-w-0
        h-48
        relative
        rounded-2xl
        overflow-hidden
        transition-all
        ${gradient}
        ${selected ? '' : 'opacity-30'}
      `}
    >
      <div className="absolute left-0 bottom-5 w-full text-center text-white text-lg font-bold leading-7">
        {label}
      </div>
    </button>
  );
};

export default GradientOptionButton;
